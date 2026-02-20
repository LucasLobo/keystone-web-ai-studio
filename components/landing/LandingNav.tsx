import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Check, ChevronDown, Layout, ShieldCheck, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Heading, Text } from '../design/Typography';
import { Button } from '../design/Button';

export const LandingNav: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { login, devLogin } = useAuth();
  const [isLangOpen, setLangOpen] = useState(false);
  const [isFeaturesOpen, setFeaturesOpen] = useState(false);

  const currentLang = i18n.language || 'en';

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' }
  ];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setLangOpen(false);
  };

  return (
    <nav className="flex justify-between items-center p-6 md:px-12 max-w-7xl mx-auto w-full relative z-50">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-500 rounded-tr-lg rounded-bl-lg"></div>
          <Heading level="h4" font="serif" className="text-xl font-bold text-slate-900">
            {t('layout.brand')}
          </Heading>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <div
            className="relative group"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-1 py-2">
              {t('landing.footer.links.features')} <ChevronDown size={16} />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-2 transform transition-all duration-200 origin-top-left ${isFeaturesOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
              <Link to="/features/centralized" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 mb-1">
                  <Layout size={18} className="text-brand-500 shrink-0" />
                  <span className="font-semibold text-slate-900 text-sm">{t('landing.features.centralized.title')}</span>
                </div>
                <Text size="xs" color="muted" className="leading-relaxed">
                  {t('landing.features.centralized.desc')}
                </Text>
              </Link>
              <Link to="/features/rational" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 mb-1">
                  <ShieldCheck size={18} className="text-blue-500 shrink-0" />
                  <span className="font-semibold text-slate-900 text-sm">{t('landing.features.rational.title')}</span>
                </div>
                <Text size="xs" color="muted" className="leading-relaxed">
                  {t('landing.features.rational.desc')}
                </Text>
              </Link>
              <Link to="/features/structured" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 mb-1">
                  <Search size={18} className="text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-900 text-sm">{t('landing.features.structured.title')}</span>
                </div>
                <Text size="xs" color="muted" className="leading-relaxed">
                  {t('landing.features.structured.desc')}
                </Text>
              </Link>
            </div>
          </div>
          <Link to="/pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">{t('landing.footer.links.pricing')}</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!isLangOpen)}
            className="text-slate-600 hover:text-brand-600 font-medium px-2 py-2 flex items-center gap-1.5 transition-colors focus:outline-none"
          >
            <Globe size={18} />
            <span className="text-sm uppercase">{currentLang.startsWith('pt') ? 'PT' : 'EN'}</span>
          </button>

          {isLangOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)}></div>
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-xl border border-slate-100 py-1 text-slate-900 z-50 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${currentLang.startsWith(lang.code) ? 'text-brand-600 font-bold bg-brand-50' : 'text-slate-600'}`}
                  >
                    <span>{lang.label}</span>
                    {currentLang.startsWith(lang.code) && <Check size={14} />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <Button variant="ghost" onClick={login} className="hidden sm:block text-slate-600 hover:text-slate-900 font-medium">
          {t('landing.nav.signIn')}
        </Button>
        <Button onClick={login} className="font-medium">
          {t('landing.nav.getStarted')}
        </Button>
        <Button variant="destructive" onClick={devLogin} className="font-medium ml-2">
          Test Login
        </Button>
      </div>
    </nav>
  );
};
