import React from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LandingLayout } from '../components/landing/LandingLayout';
import { Heading, Text } from '../components/design/Typography';

export const Pricing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <div className="bg-slate-50 min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <Heading level="h1" font="serif" className="mb-6">
              {t('pricingPage.title')}
            </Heading>
            <Text size="xl" color="muted" className="max-w-2xl mx-auto">
              {t('pricingPage.subtitle')}
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 flex flex-col">
              <Heading level="h3" font="sans" className="mb-2">
                {t('pricingPage.starter.title')}
              </Heading>
              <div className="text-4xl font-serif font-bold text-slate-900 mb-6">
                {t('pricingPage.starter.price')}
                <span className="text-base font-sans font-normal text-slate-500">{t('pricingPage.starter.period')}</span>
              </div>
              <Text color="muted" className="mb-8">
                {t('pricingPage.starter.desc')}
              </Text>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={18} className="text-brand-500 flex-shrink-0" /> 
                  <Text>{t('pricingPage.starter.features.1')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={18} className="text-brand-500 flex-shrink-0" /> 
                  <Text>{t('pricingPage.starter.features.2')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={18} className="text-brand-500 flex-shrink-0" /> 
                  <Text>{t('pricingPage.starter.features.3')}</Text>
                </li>
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-slate-200 font-semibold text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-colors">
                {t('pricingPage.starter.cta')}
              </button>
            </div>

            {/* Pro Tier */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-900 text-white relative transform md:-translate-y-4 shadow-2xl flex flex-col">
              <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                {t('pricingPage.pro.popular')}
              </div>
              <Heading level="h3" font="sans" color="white" className="mb-2">
                {t('pricingPage.pro.title')}
              </Heading>
              <div className="text-4xl font-serif font-bold text-white mb-6">
                {t('pricingPage.pro.price')}
                <span className="text-base font-sans font-normal text-slate-400">{t('pricingPage.pro.period')}</span>
              </div>
              <Text className="text-slate-400 mb-8">
                {t('pricingPage.pro.desc')}
              </Text>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-300">
                  <Check size={18} className="text-brand-500 flex-shrink-0" /> 
                  <Text className="text-slate-300">{t('pricingPage.pro.features.1')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check size={18} className="text-brand-500 flex-shrink-0" /> 
                  <Text className="text-slate-300">{t('pricingPage.pro.features.2')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check size={18} className="text-brand-500 flex-shrink-0" /> 
                  <Text className="text-slate-300">{t('pricingPage.pro.features.3')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check size={18} className="text-brand-500 flex-shrink-0" /> 
                  <Text className="text-slate-300">{t('pricingPage.pro.features.4')}</Text>
                </li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-brand-500 font-semibold text-white hover:bg-brand-600 transition-colors">
                {t('pricingPage.pro.cta')}
              </button>
            </div>

            {/* Lifetime Tier */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 flex flex-col">
              <Heading level="h3" font="sans" className="mb-2">
                {t('pricingPage.lifetime.title')}
              </Heading>
              <div className="text-4xl font-serif font-bold text-slate-900 mb-6">
                {t('pricingPage.lifetime.price')}
                <span className="text-base font-sans font-normal text-slate-500">{t('pricingPage.lifetime.period')}</span>
              </div>
              <Text color="muted" className="mb-8">
                {t('pricingPage.lifetime.desc')}
              </Text>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={18} className="text-brand-500 flex-shrink-0" /> 
                  <Text>{t('pricingPage.lifetime.features.1')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={18} className="text-brand-500 flex-shrink-0" /> 
                  <Text>{t('pricingPage.lifetime.features.2')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={18} className="text-brand-500 flex-shrink-0" /> 
                  <Text>{t('pricingPage.lifetime.features.3')}</Text>
                </li>
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-slate-200 font-semibold text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-colors">
                {t('pricingPage.lifetime.cta')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};
