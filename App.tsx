import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { AddProspect } from './pages/AddProspect';
import { ProspectDetail } from './pages/ProspectDetail';
import { VisitEditor } from './pages/VisitEditor';
import { VisitDetail } from './pages/VisitDetail';
import { Profile } from './pages/Profile';
import { Compare } from './pages/Compare';
import { CentralizedFeature } from './pages/features/Centralized';
import { RationalFeature } from './pages/features/Rational';
import { StructuredFeature } from './pages/features/Structured';
import { Pricing } from './pages/Pricing';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/features/centralized" element={<CentralizedFeature />} />
          <Route path="/features/rational" element={<RationalFeature />} />
          <Route path="/features/structured" element={<StructuredFeature />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/compare" element={<ProtectedRoute><Compare /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddProspect /></ProtectedRoute>} />
          <Route path="/prospect/:id" element={<ProtectedRoute><ProspectDetail /></ProtectedRoute>} />
          <Route path="/prospect/:id/visit/new" element={<ProtectedRoute><VisitEditor /></ProtectedRoute>} />
          <Route path="/prospect/:id/visit/:visitId" element={<ProtectedRoute><VisitDetail /></ProtectedRoute>} />
          <Route path="/prospect/:id/visit/:visitId/edit" element={<ProtectedRoute><VisitEditor /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;