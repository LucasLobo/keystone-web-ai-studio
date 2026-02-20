import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Heading, Text } from '../design/Typography';
import { Button } from '../design/Button';

export const LandingHero: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();

  return (
    <section className="flex-1 flex flex-col justify-center items-center px-6 text-center max-w-4xl mx-auto relative z-10 pb-20 pt-32">
      <Heading level="h1" font="serif" className="mb-6 leading-tight">
        {t('landing.hero.title')}<br />
        <span className="text-brand-500">{t('landing.hero.subtitle')}</span>
      </Heading>
      <Text size="xl" color="muted" className="mb-10 max-w-2xl mx-auto leading-relaxed">
        {t('landing.hero.desc')}
      </Text>
      <Button
        onClick={login}
        size="lg"
        icon={ArrowRight}
        className="px-8 py-4 rounded-xl text-lg shadow-xl shadow-brand-200"
      >
        {t('landing.hero.cta')}
      </Button>

      <div className="mt-20 pt-8 border-t border-slate-200 w-full max-w-4xl">
        <Text size="sm" className="font-semibold text-slate-400 uppercase tracking-widest mb-6">
          {t('landing.trustedBy')}
        </Text>
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <Heading level="h2" font="serif" className="text-3xl font-bold text-slate-900">10k+</Heading>
            <Text size="sm" className="text-slate-500 uppercase tracking-wider mt-1">{t('landing.stats.users')}</Text>
          </div>
          <div>
            <Heading level="h2" font="serif" className="text-3xl font-bold text-slate-900">50k+</Heading>
            <Text size="sm" className="text-slate-500 uppercase tracking-wider mt-1">{t('landing.stats.properties')}</Text>
          </div>
          <div>
            <Heading level="h2" font="serif" className="text-3xl font-bold text-slate-900">€500M+</Heading>
            <Text size="sm" className="text-slate-500 uppercase tracking-wider mt-1">{t('landing.stats.value')}</Text>
          </div>
        </div>
      </div>
    </section>
  );
};
