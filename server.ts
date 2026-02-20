import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cookieParser());
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Auth Routes
  app.get('/api/auth/google/url', (req, res) => {
    const redirectUri = req.query.redirect_uri as string;
    if (!redirectUri) {
      return res.status(400).json({ error: 'Missing redirect_uri' });
    }

    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: redirectUri,
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      state: redirectUri, // Pass redirect_uri as state to retrieve it in callback
    };

    const qs = new URLSearchParams(options);
    res.json({ url: `${rootUrl}?${qs.toString()}` });
  });

  app.get('/auth/callback', async (req, res) => {
    const code = req.query.code as string;
    // We need the redirect_uri that was used in the initial request.
    // Since we don't have session state to store it, we can infer it from the request
    // or pass it in the state parameter. But for simplicity, let's try to reconstruct it
    // or assume the client sent the correct one.
    // Actually, Google requires the exact same redirect_uri to be sent when exchanging the code.
    // A common pattern is to use the referer or just hardcode the path relative to the host.
    
    // Let's try to construct it from the request host.
    // Note: In the container, x-forwarded-proto/host might be needed.
    // But the prompt says "Do not attempt to dynamically construct the URL from request headers".
    // However, we can use the `state` parameter to pass the redirect_uri back and forth if needed.
    // Let's assume the standard path '/auth/callback' on the current origin.
    // But we don't know the origin here easily without headers.
    
    // Better approach: The client should pass the redirect_uri in the `state` param when requesting the URL.
    // Let's update the /api/auth/google/url to accept state or just encode the redirect_uri in the state.
    // Actually, let's just use the known callback path.
    // If we use the `APP_URL` env var, that works.
    // If we rely on the client passing it, we need to persist it.
    
    // Let's try to get it from the `state` parameter.
    // The client will send `redirect_uri` to `/api/auth/google/url`.
    // We will put that `redirect_uri` into the `state` param of the Google URL.
    // Google will return `state` in the callback.
    // We use that `state` as the `redirect_uri` for the token exchange.
    
    const state = req.query.state as string;
    let redirectUri = state;
    
    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID || '',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });

      const tokens = await tokenResponse.json();

      if (!tokens.access_token) {
        console.error('Token exchange failed:', tokens);
        throw new Error('Failed to exchange code for tokens');
      }

      const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      const user = await userResponse.json();

      // Set cookie
      res.cookie('session_user', JSON.stringify(user), {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        path: '/'
      });

      // Send success message
      const html = `
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', user: ${JSON.stringify(user)} }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. You can close this window.</p>
          </body>
        </html>
      `;
      res.send(html);

    } catch (error) {
      console.error('Auth error:', error);
      res.status(500).send('Authentication failed');
    }
  });

  app.get('/api/auth/me', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    const userCookie = req.cookies.session_user;
    if (!userCookie) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    try {
      const user = JSON.parse(userCookie);
      res.json({ user });
    } catch (e) {
      res.status(401).json({ error: 'Invalid session' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('session_user', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/'
    });
    res.json({ success: true });
  });

  // Dev Login Route
  app.post('/api/auth/dev-login', (req, res) => {
    const user = {
      name: 'Test User',
      email: 'test@example.com',
      picture: '', // Optional: add a placeholder image
      sub: 'dev-user-123'
    };
    
    res.cookie('session_user', JSON.stringify(user), {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: '/'
    });
    
    res.json({ user });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
