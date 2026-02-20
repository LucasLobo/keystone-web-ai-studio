import React from 'react';
import { Layout, Link2, TrendingDown, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LandingLayout } from '../../components/landing/LandingLayout';
import { Heading, Text } from '../../components/design/Typography';

export const CentralizedFeature: React.FC = () => {
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-slate-50 py-20 px-6 border-b border-slate-200">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Layout size={32} />
            </div>
            <Heading level="h1" font="sans" className="mb-8">
              {t('landing.features.centralized.title')}
            </Heading>
            <Text size="xl" color="muted" className="max-w-3xl mx-auto leading-normal font-light">
              {t('landing.features.centralized.desc')}
            </Text>
          </div>
        </div>

        {/* Feature 1: Universal Clipper */}
        <div className="py-24 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-4">
                <Link2 size={24} />
              </div>
              <Heading level="h2" font="serif">
                {t('featurePages.centralized.section1.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('featurePages.centralized.section1.desc')}
              </Text>
            </div>
            <div className="flex-1">
              <img 
                src="https://picsum.photos/seed/clipper/800/600" 
                alt="Universal Clipper Interface" 
                className="rounded-2xl shadow-2xl border border-slate-100 w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Feature 2: Price Tracking */}
        <div className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown size={24} />
              </div>
              <Heading level="h2" font="serif">
                {t('featurePages.centralized.section2.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('featurePages.centralized.section2.desc')}
              </Text>
            </div>
            <div className="flex-1">
              <img 
                src="https://picsum.photos/seed/price/800/600" 
                alt="Price Tracking Interface" 
                className="rounded-2xl shadow-2xl border border-slate-100 w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Feature 3: Document Vault */}
        <div className="py-24 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <FileText size={24} />
              </div>
              <Heading level="h2" font="serif">
                {t('featurePages.centralized.section3.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('featurePages.centralized.section3.desc')}
              </Text>
            </div>
            <div className="flex-1">
              <img 
                src="https://picsum.photos/seed/vault/800/600" 
                alt="Document Vault Interface" 
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
