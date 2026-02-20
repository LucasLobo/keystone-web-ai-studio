import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading, Text } from '../design/Typography';

export const LandingTestimonials: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-slate-900 text-white py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <Heading level="h2" font="serif" color="white" className="mb-4">
          {t('landing.testimonials.title')}
        </Heading>
        <Text color="muted" className="max-w-2xl mx-auto text-slate-400">
          {t('landing.testimonials.subtitle')}
        </Text>
      </div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          {
            quote: t('landing.testimonials.t1.quote'),
            author: t('landing.testimonials.t1.author'),
            role: t('landing.testimonials.t1.role'),
            initials: "SJ"
          },
          {
            quote: t('landing.testimonials.t2.quote'),
            author: t('landing.testimonials.t2.author'),
            role: t('landing.testimonials.t2.role'),
            initials: "MT"
          },
          {
            quote: t('landing.testimonials.t3.quote'),
            author: t('landing.testimonials.t3.author'),
            role: t('landing.testimonials.t3.role'),
            initials: "ER"
          }
        ].map((testimonial, i) => (
          <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col">
            <div className="flex items-center gap-1 text-brand-500 mb-4">
              {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
            </div>
            <Text size="lg" className="text-slate-300 mb-6 italic flex-1">
              "{testimonial.quote}"
            </Text>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-10 h-10 rounded-full bg-brand-900 text-brand-200 flex items-center justify-center font-bold text-sm">
                {testimonial.initials}
              </div>
              <div className="text-left">
                <div className="font-bold text-white">{testimonial.author}</div>
                <Text size="xs" className="text-slate-500 uppercase tracking-wide">
                  {testimonial.role}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
