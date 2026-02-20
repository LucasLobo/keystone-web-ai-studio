import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading, Text } from '../design/Typography';

export const LandingFooter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-50 text-slate-600 py-20 px-6 border-t border-slate-200 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-brand-500 rounded-tr-lg rounded-bl-lg"></div>
              <Heading level="h4" font="serif" className="text-xl font-bold text-slate-900">
                {t('layout.brand')}
              </Heading>
          </div>
          <Text color="muted" className="leading-relaxed mb-6">
            {t('landing.footer.mission')}
          </Text>
          <div className="flex gap-4">
            {/* Social Placeholders */}
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors cursor-pointer">
              <span className="text-xs font-bold">in</span>
            </div>
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors cursor-pointer">
              <span className="text-xs font-bold">tw</span>
            </div>
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors cursor-pointer">
              <span className="text-xs font-bold">ig</span>
            </div>
          </div>
        </div>
        
        <div>
          <Heading level="h6" font="sans" className="mb-6">
            {t('landing.footer.product')}
          </Heading>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-brand-600 transition-colors">{t('landing.footer.links.features')}</a></li>
            <li><a href="#" className="hover:text-brand-600 transition-colors">{t('landing.footer.links.pricing')}</a></li>
            <li><a href="#" className="hover:text-brand-600 transition-colors">{t('landing.footer.links.faq')}</a></li>
          </ul>
        </div>

        <div>
          <Heading level="h6" font="sans" className="mb-6">
            {t('landing.footer.company')}
          </Heading>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-brand-600 transition-colors">{t('landing.footer.links.about')}</a></li>
            <li><a href="#" className="hover:text-brand-600 transition-colors">{t('landing.footer.links.careers')}</a></li>
            <li><a href="#" className="hover:text-brand-600 transition-colors">{t('landing.footer.links.contact')}</a></li>
          </ul>
        </div>

        <div>
          <Heading level="h6" font="sans" className="mb-6">
            {t('landing.footer.legal')}
          </Heading>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-brand-600 transition-colors">{t('landing.footer.links.privacy')}</a></li>
            <li><a href="#" className="hover:text-brand-600 transition-colors">{t('landing.footer.links.terms')}</a></li>
            <li><a href="#" className="hover:text-brand-600 transition-colors">{t('landing.footer.links.cookies')}</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
        <Text size="sm" color="subtle">{t('landing.footer.copyright')}</Text>
        <div className="flex gap-6 mt-4 md:mt-0">
           <Text size="sm" color="subtle">{t('landing.footer.madeWith')}</Text>
        </div>
      </div>
    </footer>
  );
};
