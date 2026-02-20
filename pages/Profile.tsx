import React, { useState } from 'react';
import { Layout } from '../components/ui/Layout';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { User, Mail, Shield, Globe, Bell, Check } from 'lucide-react';
import { Heading, Text, Label } from '../components/design/Typography';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [emailNotifications, setEmailNotifications] = useState(true);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' }
  ];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-3xl font-bold text-slate-400">
              {user?.picture ? (
                <img src={user.picture} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                user?.name?.charAt(0) || 'U'
              )}
            </div>
            <div>
              <Heading level="h2" font="sans" className="mb-1">{user?.name}</Heading>
              <Text color="muted">{t('common.proPlan', 'Pro Plan')}</Text>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label>{t('profile.email', 'Email Address')}</Label>
              <div className="flex items-center gap-3 text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <Mail size={18} className="text-slate-400" />
                <Text>{user?.email}</Text>
              </div>
            </div>

            <div>
              <Label>{t('profile.language', 'Language')}</Label>
              <div className="grid grid-cols-2 gap-3">
                  {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => i18n.changeLanguage(lang.code)}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                            i18n.language.startsWith(lang.code) 
                            ? 'bg-brand-50 border-brand-200 text-brand-700 shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                          <span className="font-medium">{lang.label}</span>
                          {i18n.language.startsWith(lang.code) && <Check size={16} />}
                      </button>
                  ))}
              </div>
            </div>

            <div>
                <Label>{t('profile.notifications', 'Notifications')}</Label>
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <Bell size={18} className="text-slate-400" />
                        <Text size="sm">{t('profile.emailUpdates', 'Email Updates')}</Text>
                    </div>
                    <button 
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`w-11 h-6 rounded-full transition-colors relative ${emailNotifications ? 'bg-brand-500' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${emailNotifications ? 'left-6' : 'left-1'}`}></div>
                    </button>
                </div>
            </div>

            <div>
              <Label>{t('profile.security', 'Security')}</Label>
              <div className="flex items-center gap-3 text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <Shield size={18} className="text-slate-400" />
                <Text>{t('profile.passwordManaged', 'Password managed by Google Auth')}</Text>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
