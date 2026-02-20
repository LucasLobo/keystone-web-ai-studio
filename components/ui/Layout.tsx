import React, { useState } from 'react';
import { PlusCircle, LayoutDashboard, Menu, X, Globe, Check, Scale, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Heading, Text } from '../design/Typography';
import { Button } from '../design/Button';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileLangOpen, setMobileLangOpen] = useState(false);
  const [isDesktopLangOpen, setDesktopLangOpen] = useState(false);

  const { user, logout } = useAuth();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language || 'en';

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' }
  ];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setMobileLangOpen(false);
    setDesktopLangOpen(false);
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
          ? 'bg-brand-500 text-white shadow-md'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
      >
        <Icon size={20} />
        <Text weight="medium" className="tracking-wide" color={isActive ? 'white' : 'subtle'}>{label}</Text>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-tr-xl rounded-bl-xl"></div>
          <Heading level="h4" font="serif" color="white">{t('layout.brand')}</Heading>
        </div>
        <div className="flex items-center gap-4">
          {/* Mobile Language Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileLangOpen(!isMobileLangOpen)}
              className="text-slate-300 hover:text-white flex items-center gap-1 focus:outline-none"
              icon={Globe}
            >
              <span>{currentLang.startsWith('pt') ? 'PT' : 'EN'}</span>
            </Button>

            {isMobileLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMobileLangOpen(false)}></div>
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

          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky md:top-0 h-screen w-64 bg-slate-900 text-white p-6 flex flex-col gap-8 transition-transform duration-300 z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        <div className="hidden md:flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-brand-500 rounded-tr-xl rounded-bl-xl shadow-[0_0_15px_rgba(176,128,78,0.4)]"></div>
          <Heading level="h3" font="serif" color="white" className="tracking-tight">{t('layout.brand')}</Heading>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <NavItem to="/dashboard" icon={LayoutDashboard} label={t('layout.dashboard')} />
          <NavItem to="/compare" icon={Scale} label={t('layout.compare')} />
          <NavItem to="/add" icon={PlusCircle} label={t('layout.addProspect')} />
        </nav>

        <div className="mt-auto border-t border-slate-700 pt-6 space-y-6">
          {/* Desktop Language Switcher */}
          <div className="relative w-full hidden md:block">
            <Button
              variant="ghost"
              onClick={() => setDesktopLangOpen(!isDesktopLangOpen)}
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full px-2 py-1 rounded hover:bg-slate-800 justify-start"
              icon={Globe}
            >
              <span className="text-sm font-medium">{currentLang.startsWith('pt') ? 'Português' : 'English'}</span>
            </Button>

            {isDesktopLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDesktopLangOpen(false)}></div>
                <div className="absolute left-0 bottom-full mb-2 w-full bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-1 text-slate-200 z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-slate-700 transition-colors ${currentLang.startsWith(lang.code) ? 'text-brand-400 font-bold bg-slate-700' : 'text-slate-300'}`}
                    >
                      <span>{lang.label}</span>
                      {currentLang.startsWith(lang.code) && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link to="/profile" className="flex items-center gap-3 overflow-hidden hover:bg-slate-800 p-2 rounded-lg transition-colors flex-1 group">
              {user?.picture ? (
                <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0 group-hover:bg-slate-600 transition-colors">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
              <div className="flex flex-col overflow-hidden">
                <Text size="sm" weight="medium" className="truncate group-hover:text-white transition-colors" color="white">{user?.name}</Text>
                <Text size="xs" color="subtle" className="group-hover:text-slate-300 transition-colors">{t('common.proPlan')}</Text>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
              title="Log out"
              icon={LogOut}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
