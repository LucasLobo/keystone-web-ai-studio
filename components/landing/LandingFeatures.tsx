import React from 'react';
import { Layout, ShieldCheck, Search, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading, Text } from '../design/Typography';

export const LandingFeatures: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="features" className="bg-white py-32 px-6 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <Heading level="h1" font="serif" className="mb-6">
            {t('landing.features.mainTitle')}
          </Heading>
          <Text size="xl" color="muted" className="max-w-2xl mx-auto">
            {t('landing.features.mainDesc')}
          </Text>
        </div>

        <div className="space-y-32">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mb-6">
                <Layout size={32} />
              </div>
              <Heading level="h2" font="sans">
                {t('landing.features.centralized.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('landing.features.centralized.desc')}
              </Text>
              <ul className="space-y-3 mt-4">
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={20} className="text-brand-500" />
                  <Text>{t('landing.features.centralized.list1')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={20} className="text-brand-500" />
                  <Text>{t('landing.features.centralized.list2')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={20} className="text-brand-500" />
                  <Text>{t('landing.features.centralized.list3')}</Text>
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-slate-100 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 aspect-[4/3] flex items-center justify-center overflow-hidden">
                 {/* Abstract UI Representation */}
                 <div className="w-full space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-slate-200"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-slate-50 rounded-xl border border-slate-100"></div>
                      <div className="h-24 bg-slate-50 rounded-xl border border-slate-100"></div>
                    </div>
                    <div className="h-8 bg-brand-500 rounded-lg w-1/3 mt-4"></div>
                 </div>
              </div>
            </div>
          </div>

          {/* Feature 2 (Reversed) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <Heading level="h2" font="sans">
                {t('landing.features.rational.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('landing.features.rational.desc')}
              </Text>
              <ul className="space-y-3 mt-4">
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={20} className="text-blue-500" />
                  <Text>{t('landing.features.rational.list1')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={20} className="text-blue-500" />
                  <Text>{t('landing.features.rational.list2')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={20} className="text-blue-500" />
                  <Text>{t('landing.features.rational.list3')}</Text>
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-50 to-slate-100 rounded-3xl transform -rotate-2 scale-105 -z-10"></div>
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 aspect-[4/3] flex items-center justify-center">
                 {/* Abstract UI Representation */}
                 <div className="w-full space-y-3">
                    <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                      <div className="h-20 w-12 bg-blue-500 rounded-t-lg"></div>
                      <div className="h-32 w-12 bg-slate-300 rounded-t-lg"></div>
                      <div className="h-16 w-12 bg-slate-200 rounded-t-lg"></div>
                      <div className="h-24 w-12 bg-slate-200 rounded-t-lg"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Prop A</span>
                      <span>Prop B</span>
                      <span>Prop C</span>
                      <span>Prop D</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Search size={32} />
              </div>
              <Heading level="h2" font="sans">
                {t('landing.features.structured.title')}
              </Heading>
              <Text size="lg" color="muted" className="leading-relaxed">
                {t('landing.features.structured.desc')}
              </Text>
              <ul className="space-y-3 mt-4">
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={20} className="text-emerald-500" />
                  <Text>{t('landing.features.structured.list1')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={20} className="text-emerald-500" />
                  <Text>{t('landing.features.structured.list2')}</Text>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check size={20} className="text-emerald-500" />
                  <Text>{t('landing.features.structured.list3')}</Text>
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-slate-100 rounded-3xl transform rotate-2 scale-105 -z-10"></div>
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 aspect-[4/3] flex flex-col justify-center">
                 {/* Abstract UI Representation */}
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500">✓</div>
                      <div className="h-3 bg-slate-800 rounded w-2/3"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500">✓</div>
                      <div className="h-3 bg-slate-800 rounded w-1/2"></div>
                    </div>
                    <div className="flex items-center gap-3 opacity-50">
                      <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>
                      <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                    </div>
                    <div className="flex items-center gap-3 opacity-50">
                      <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>
                      <div className="h-3 bg-slate-300 rounded w-1/3"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
