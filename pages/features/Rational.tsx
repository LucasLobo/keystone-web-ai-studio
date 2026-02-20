import React from 'react';
import { ShieldCheck, Scale, BarChart3, ListChecks } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LandingLayout } from '../../components/landing/LandingLayout';
import { Heading, Text } from '../../components/design/Typography';

export const RationalFeature: React.FC = () => {
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-slate-50 py-20 px-6 border-b border-slate-200">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <ShieldCheck size={32} />
            </div>
            <Heading level="h1" font="sans" className="mb-8">
              {t('landing.features.rational.title')}
            </Heading>
            <Text size="xl" color="muted" className="max-w-3xl mx-auto leading-normal font-light">
              {t('landing.features.rational.desc')}
            </Text>
          </div>
        </div>

        {/* Feature 1: Side-by-Side View */}
        <div className="py-24 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Scale size={24} />
              </div>
              <Heading level="h2" font="serif">
                {t('featurePages.rational.section1.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('featurePages.rational.section1.desc')}
              </Text>
            </div>
            <div className="flex-1">
              <img 
                src="https://picsum.photos/seed/compare/800/600" 
                alt="Side-by-Side Comparison Interface" 
                className="rounded-2xl shadow-2xl border border-slate-100 w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Feature 2: Weighted Scoring */}
        <div className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 size={24} />
              </div>
              <Heading level="h2" font="serif">
                {t('featurePages.rational.section2.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('featurePages.rational.section2.desc')}
              </Text>
            </div>
            <div className="flex-1">
              <img 
                src="https://picsum.photos/seed/scoring/800/600" 
                alt="Weighted Scoring Interface" 
                className="rounded-2xl shadow-2xl border border-slate-100 w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Feature 3: Pros & Cons Lists */}
        <div className="py-24 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                <ListChecks size={24} />
              </div>
              <Heading level="h2" font="serif">
                {t('featurePages.rational.section3.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('featurePages.rational.section3.desc')}
              </Text>
            </div>
            <div className="flex-1">
              <img 
                src="https://picsum.photos/seed/proscons/800/600" 
                alt="Pros and Cons Interface" 
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
