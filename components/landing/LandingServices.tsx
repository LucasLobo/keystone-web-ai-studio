import React from 'react';
import { Scale, FileSignature, Camera, UserCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading, Text } from '../design/Typography';

export const LandingServices: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-slate-50 py-24 px-6 relative z-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <Heading level="h2" font="sans" className="mb-4">
          {t('landing.services.title')}
        </Heading>
        <Text color="muted" className="max-w-2xl mx-auto">
          {t('landing.services.subtitle')}
        </Text>
      </div>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-700">
            <Scale size={24} />
          </div>
          <Heading level="h4" font="sans" className="mb-2">
            {t('landing.services.lawyer')}
          </Heading>
          <Text size="sm" color="muted">
            {t('landing.services.lawyerDesc')}
          </Text>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-700">
            <FileSignature size={24} />
          </div>
          <Heading level="h4" font="sans" className="mb-2">
            {t('landing.services.notary')}
          </Heading>
          <Text size="sm" color="muted">
            {t('landing.services.notaryDesc')}
          </Text>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-700">
            <Camera size={24} />
          </div>
          <Heading level="h4" font="sans" className="mb-2">
            {t('landing.services.photographer')}
          </Heading>
          <Text size="sm" color="muted">
            {t('landing.services.photographerDesc')}
          </Text>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-700">
            <UserCheck size={24} />
          </div>
          <Heading level="h4" font="sans" className="mb-2">
            {t('landing.services.agent')}
          </Heading>
          <Text size="sm" color="muted">
            {t('landing.services.agentDesc')}
          </Text>
        </div>
      </div>
      
      <div className="text-center mt-12">
         <Text size="sm" color="muted" className="bg-slate-100 inline-block px-4 py-2 rounded-full">
           {t('landing.services.desc')}
         </Text>
      </div>
    </section>
  );
};
