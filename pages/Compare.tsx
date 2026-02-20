import React from 'react';
import { Layout } from '../components/ui/Layout';
import { formatCurrency } from '../utils/formatting';
import { useProspects } from '../hooks/useProspects';
import { ProspectStatus } from '../types';
import { Link } from 'react-router-dom';
import { Check, X, MapPin, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading, Text } from '../components/design/Typography';

// Reusing StatusBadge for consistency
const StatusBadge = ({ status }: { status: ProspectStatus }) => {
    const { t } = useTranslation();
    const colors = {
      [ProspectStatus.UnderReview]: 'bg-blue-50 text-blue-700 border-blue-200',
      [ProspectStatus.Visited]: 'bg-purple-50 text-purple-700 border-purple-200',
      [ProspectStatus.Interesting]: 'bg-brand-50 text-brand-700 border-brand-200',
      [ProspectStatus.DecisionPending]: 'bg-orange-50 text-orange-700 border-orange-200',
      [ProspectStatus.OfferPrep]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      [ProspectStatus.OfferSubmitted]: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      [ProspectStatus.OfferDeclined]: 'bg-red-50 text-red-700 border-red-200',
      [ProspectStatus.Withdrawn]: 'bg-slate-100 text-slate-600 border-slate-200',
      [ProspectStatus.Archived]: 'bg-gray-50 text-gray-400 border-gray-200',
    };
  
    return (
      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border ${colors[status] || colors[ProspectStatus.UnderReview]}`}>
        {t(`status.${status}`)}
      </span>
    );
};

export const Compare: React.FC = () => {
  const { t } = useTranslation();
  const { data: allProspects = [], isLoading } = useProspects();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="animate-spin text-brand-500" size={48} />
        </div>
      </Layout>
    );
  }

  // Only show active prospects (exclude Archived and Withdrawn)
  const prospects = allProspects.filter(p => p.status !== ProspectStatus.Archived && p.status !== ProspectStatus.Withdrawn);

  if (prospects.length === 0) {
      return (
          <Layout>
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                  <Heading level="h3" font="sans" className="text-lg font-medium text-slate-900 mb-2">
                    {t('compare.title')}
                  </Heading>
                  <Text color="muted" className="mb-6">
                    {t('compare.empty')}
                  </Text>
                  <Link to="/add" className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">
                      {t('compare.emptyCta')}
                  </Link>
              </div>
          </Layout>
      );
  }

  return (
    <Layout>
      <div className="mb-8">
          {/* Changed to font-serif based on request */}
          <Heading level="h1" font="serif" className="mb-2">
            {t('compare.title')}
          </Heading>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500 tracking-wide">
                        <th className="p-4 w-1/4 min-w-[200px]">{t('compare.rows.property')}</th>
                        <th className="p-4 w-[15%] min-w-[100px]">{t('compare.rows.price')}</th>
                        <th className="p-4 w-[15%] min-w-[150px]">{t('prospect.details.title')}</th>
                        <th className="p-4 w-[25%] min-w-[200px]">{t('compare.rows.evaluation')}</th>
                        <th className="p-4 w-[10%] min-w-[100px]">{t('compare.rows.visits')}</th>
                        <th className="p-4 w-[10%]"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {prospects.map(p => {
                        const price = p.priceHistory.length > 0 ? p.priceHistory[p.priceHistory.length - 1].value : 0;
                        const pros = p.traits.filter(t => t.sentiment === 'Positive');
                        const cons = p.traits.filter(t => t.sentiment === 'Negative');
                        const details = p.details || {};

                        return (
                            <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="p-4 align-top">
                                    <div className="font-sans font-bold text-slate-900 text-lg leading-tight mb-2">
                                        <Link to={`/prospect/${p.id}`} className="hover:text-brand-600 transition-colors">
                                            {p.nickname}
                                        </Link>
                                    </div>
                                    <StatusBadge status={p.status} />
                                    <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                                        <MapPin size={12} /> {p.location || '-'}
                                    </div>
                                </td>
                                <td className="p-4 align-top">
                                    <span className="font-medium text-slate-900 text-lg">
                                        {price ? formatCurrency(price) : <span className="text-slate-300">---</span>}
                                    </span>
                                </td>
                                <td className="p-4 align-top text-slate-600 text-sm">
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                        <div>
                                            <span className="text-xs text-slate-400 uppercase block">{t('prospect.details.rooms')}</span>
                                            <span className="font-medium">{details.rooms || '-'}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-400 uppercase block">{t('prospect.details.grossArea')}</span>
                                            <span className="font-medium">{details.grossArea ? `${details.grossArea} m²` : '-'}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-400 uppercase block">{t('prospect.details.bathrooms')}</span>
                                            <span className="font-medium">{details.bathrooms || '-'}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-400 uppercase block">{t('prospect.details.floor')}</span>
                                            <span className="font-medium">{details.floor || '-'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 align-top">
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Pros */}
                                        <div className="space-y-1 group/pros relative">
                                            {pros.length > 0 ? (
                                                <>
                                                    <ul className="space-y-1">
                                                        {pros.slice(0, 3).map(trait => (
                                                            <li key={trait.id} className="flex items-start gap-1.5 text-slate-700 text-xs">
                                                                <Check size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                                                                <span className="leading-tight truncate">{trait.text}</span>
                                                            </li>
                                                        ))}
                                                        {pros.length > 3 && <li className="text-xs text-slate-400 pl-4">+{pros.length - 3} more</li>}
                                                    </ul>
                                                    {/* Hover Popover */}
                                                    <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-100 p-3 z-50 hidden group-hover/pros:block animate-in fade-in zoom-in-95 duration-200">
                                                        <h5 className="text-xs font-bold uppercase text-emerald-600 mb-2">{t('prospect.evaluation.pros')}</h5>
                                                        <ul className="space-y-2">
                                                            {pros.map(trait => (
                                                                <li key={trait.id} className="flex items-start gap-2 text-slate-700 text-xs">
                                                                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                                                    <span className="leading-tight">{trait.text}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-slate-300 italic text-xs">-</span>
                                            )}
                                        </div>
                                        {/* Cons */}
                                        <div className="space-y-1 group/cons relative">
                                            {cons.length > 0 ? (
                                                <>
                                                    <ul className="space-y-1">
                                                        {cons.slice(0, 3).map(trait => (
                                                            <li key={trait.id} className="flex items-start gap-1.5 text-slate-700 text-xs">
                                                                <X size={12} className="text-red-500 shrink-0 mt-0.5" />
                                                                <span className="leading-tight truncate">{trait.text}</span>
                                                            </li>
                                                        ))}
                                                        {cons.length > 3 && <li className="text-xs text-slate-400 pl-4">+{cons.length - 3} more</li>}
                                                    </ul>
                                                    {/* Hover Popover */}
                                                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-100 p-3 z-50 hidden group-hover/cons:block animate-in fade-in zoom-in-95 duration-200">
                                                        <h5 className="text-xs font-bold uppercase text-red-600 mb-2">{t('prospect.evaluation.cons')}</h5>
                                                        <ul className="space-y-2">
                                                            {cons.map(trait => (
                                                                <li key={trait.id} className="flex items-start gap-2 text-slate-700 text-xs">
                                                                    <X size={14} className="text-red-500 shrink-0 mt-0.5" />
                                                                    <span className="leading-tight">{trait.text}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-slate-300 italic text-xs">-</span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 align-top text-slate-600">
                                    {p.visits.length > 0 ? (
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <Calendar size={16} className="text-slate-400" />
                                            <span>{p.visits.length}</span>
                                        </div>
                                    ) : <span className="text-slate-300 text-center block w-6">-</span>}
                                </td>
                                <td className="p-4 align-top text-right">
                                    <Link to={`/prospect/${p.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-200 text-slate-400 hover:text-brand-600 transition-colors">
                                        <ArrowRight size={18} />
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      </div>
    </Layout>
  );
};
