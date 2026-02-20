import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { useTranslation } from 'react-i18next';
import { Calendar, Play, Plus, Eye } from 'lucide-react';
import { Prospect } from '../../types';

interface ProspectVisitsProps {
  prospect: Prospect;
}

export const ProspectVisits: React.FC<ProspectVisitsProps> = ({ prospect }) => {
  const { t, i18n } = useTranslation();

  return (
    <Card>
        <div className="flex justify-between items-center mb-4">
             {/* Updated Header Style */}
             <h3 className="font-sans font-semibold text-lg text-slate-900 flex items-center gap-2">
                <Calendar size={20} className="text-brand-500" /> {t('prospect.visits.title')}
             </h3>
        </div>

        {/* Relocated Action Buttons for better spacing */}
        <div className="flex gap-3 mb-6">
            <Link to={`/prospect/${prospect.id}/visit/new?type=now`} className="flex-1 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
                <Play size={16} fill="currentColor" /> {t('prospect.visits.startNow')}
            </Link>
            <Link to={`/prospect/${prospect.id}/visit/new?type=schedule`} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-slate-200">
                <Plus size={16} /> {t('prospect.visits.schedule')}
            </Link>
        </div>
        
        <div className="space-y-3">
            {prospect.visits.map(visit => {
                const isFuture = new Date(visit.date) > new Date();
                return (
                    <div key={visit.id} className="block group relative">
                        <Link to={`/prospect/${prospect.id}/visit/${visit.id}`} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                            <div className={`w-12 h-12 rounded flex flex-col items-center justify-center shrink-0 border ${isFuture ? 'bg-orange-50 text-orange-700 border-orange-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                                <span className="text-xs font-bold uppercase">{new Date(visit.date).toLocaleString(i18n.language, { month: 'short' })}</span>
                                <span className="text-lg font-bold leading-none">{new Date(visit.date).getDate()}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <p className="font-semibold text-slate-900 text-sm truncate">
                                        {new Date(visit.date).toLocaleString(i18n.language, { hour: 'numeric', minute: '2-digit' })} {t('prospect.visits.visitLabel', 'Visit')}
                                    </p>
                                    {/* Action Icon depends on date */}
                                    {isFuture ? (
                                        <div className="flex items-center gap-1 text-brand-600 text-xs font-bold bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100">
                                            <Play size={10} fill="currentColor" /> {t('prospect.visits.startAction')}
                                        </div>
                                    ) : (
                                        <Eye size={16} className="text-slate-300 group-hover:text-slate-500" />
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 mt-1 truncate">
                                    {/* Show General note if available, else standard observation check */}
                                    {visit.generalNote || (Object.values(visit.notes).some(n => n) ? t('prospect.visits.notesRecorded') : t('prospect.visits.noNotes'))}
                                </p>
                            </div>
                        </Link>
                    </div>
                );
            })}
            {prospect.visits.length === 0 && (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    <p className="text-sm text-slate-400 mb-2">{t('prospect.visits.empty')}</p>
                    <Link to={`/prospect/${prospect.id}/visit/new?type=schedule`} className="text-brand-600 text-sm font-medium hover:underline">
                        {t('prospect.visits.cta')}
                    </Link>
                </div>
            )}
        </div>
    </Card>
  );
};
