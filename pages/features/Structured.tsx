import React from 'react';
import { Search, ClipboardCheck, Camera, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LandingLayout } from '../../components/landing/LandingLayout';
import { Heading, Text } from '../../components/design/Typography';

export const StructuredFeature: React.FC = () => {
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-slate-50 py-20 px-6 border-b border-slate-200">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Search size={32} />
            </div>
            <Heading level="h1" font="sans" className="mb-8">
              {t('landing.features.structured.title')}
            </Heading>
            <Text size="xl" color="muted" className="max-w-3xl mx-auto leading-normal font-light">
              {t('landing.features.structured.desc')}
            </Text>
          </div>
        </div>

        {/* Feature 1: Expert Checklists */}
        <div className="py-24 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <ClipboardCheck size={24} />
              </div>
              <Heading level="h2" font="serif">
                {t('featurePages.structured.section1.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('featurePages.structured.section1.desc')}
              </Text>
            </div>
            <div className="flex-1">
              <img 
                src="https://picsum.photos/seed/checklist/800/600" 
                alt="Checklist Interface" 
                className="rounded-2xl shadow-2xl border border-slate-100 w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Feature 2: Defect Logging */}
        <div className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
                <Camera size={24} />
              </div>
              <Heading level="h2" font="serif">
                {t('featurePages.structured.section2.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('featurePages.structured.section2.desc')}
              </Text>
            </div>
            <div className="flex-1">
              <img 
                src="https://picsum.photos/seed/defects/800/600" 
                alt="Defect Logging Interface" 
                className="rounded-2xl shadow-2xl border border-slate-100 w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Feature 3: Agent Interrogation */}
        <div className="py-24 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare size={24} />
              </div>
              <Heading level="h2" font="serif">
                {t('featurePages.structured.section3.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('featurePages.structured.section3.desc')}
              </Text>
            </div>
            <div className="flex-1">
              <img 
                src="https://picsum.photos/seed/agent/800/600" 
                alt="Agent Questions Interface" 
                className="rounded-2xl shadow-2xl border border-slate-100 w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};
