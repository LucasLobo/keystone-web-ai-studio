import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { useTranslation } from 'react-i18next';
import { ThumbsUp, ThumbsDown, X, Plus } from 'lucide-react';
import { Prospect } from '../../types';

interface ProspectEvaluationProps {
  prospect: Prospect;
  onAddTrait: (text: string, sentiment: 'Positive' | 'Negative') => void;
  onDeleteTrait: (traitId: string) => void;
}

export const ProspectEvaluation: React.FC<ProspectEvaluationProps> = ({ prospect, onAddTrait, onDeleteTrait }) => {
  const { t } = useTranslation();
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');

  const handleAddPro = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newPro) return;
      onAddTrait(newPro, 'Positive');
      setNewPro('');
  };

  const handleAddCon = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newCon) return;
      onAddTrait(newCon, 'Negative');
      setNewCon('');
  };

  return (
    <Card className="h-full border-t-4 border-t-brand-500">
        {/* Updated Header Style */}
        <h3 className="font-sans font-semibold text-xl text-slate-900 mb-6 text-center">{t('prospect.evaluation.title')}</h3>
        
        <div className="grid grid-cols-2 gap-4 h-full content-start">
            {/* Pros Column */}
            <div className="flex flex-col gap-3">
                <h4 className="font-sans text-xs font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-2 border-b border-emerald-100 pb-2">
                    <ThumbsUp size={14} /> {t('prospect.evaluation.pros')}
                </h4>
                
                <div className="space-y-2 flex-1">
                    {prospect.traits.filter(t => t.sentiment === 'Positive').map(trait => (
                        <div key={trait.id} className="group flex justify-between items-start text-sm text-slate-700 bg-emerald-50/50 p-2 rounded border border-emerald-100/50">
                            <span className="break-words w-full pr-1">{trait.text}</span>
                            <button onClick={() => onDeleteTrait(trait.id)} className="text-emerald-300 hover:text-emerald-700 opacity-0 group-hover:opacity-100 shrink-0">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    {prospect.traits.filter(t => t.sentiment === 'Positive').length === 0 && (
                        <p className="text-xs text-slate-400 italic">{t('prospect.evaluation.emptyPros')}</p>
                    )}
                </div>

                {/* Add Pro Form */}
                <form onSubmit={handleAddPro} className="relative mt-2">
                     <input
                        type="text"
                        value={newPro}
                        onChange={e => setNewPro(e.target.value)}
                        placeholder={t('prospect.evaluation.addPro')}
                        className="w-full pl-2 pr-7 py-1.5 text-xs border border-slate-200 rounded bg-white text-slate-900 focus:border-brand-500 outline-none"
                    />
                    <button type="submit" className="absolute right-1 top-1.5 text-slate-400 hover:text-emerald-600">
                        <Plus size={14} />
                    </button>
                </form>
            </div>

            {/* Cons Column */}
            <div className="flex flex-col gap-3">
                <h4 className="font-sans text-xs font-bold text-red-700 uppercase tracking-wide flex items-center gap-2 border-b border-red-100 pb-2">
                    <ThumbsDown size={14} /> {t('prospect.evaluation.cons')}
                </h4>

                <div className="space-y-2 flex-1">
                    {prospect.traits.filter(t => t.sentiment === 'Negative').map(trait => (
                        <div key={trait.id} className="group flex justify-between items-start text-sm text-slate-700 bg-red-50/50 p-2 rounded border border-red-100/50">
                            <span className="break-words w-full pr-1">{trait.text}</span>
                            <button onClick={() => onDeleteTrait(trait.id)} className="text-red-300 hover:text-red-700 opacity-0 group-hover:opacity-100 shrink-0">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                     {prospect.traits.filter(t => t.sentiment === 'Negative').length === 0 && (
                        <p className="text-xs text-slate-400 italic">{t('prospect.evaluation.emptyCons')}</p>
                    )}
                </div>

                {/* Add Con Form */}
                <form onSubmit={handleAddCon} className="relative mt-2">
                     <input
                        type="text"
                        value={newCon}
                        onChange={e => setNewCon(e.target.value)}
                        placeholder={t('prospect.evaluation.addCon')}
                        className="w-full pl-2 pr-7 py-1.5 text-xs border border-slate-200 rounded bg-white text-slate-900 focus:border-brand-500 outline-none"
                    />
                    <button type="submit" className="absolute right-1 top-1.5 text-slate-400 hover:text-red-600">
                        <Plus size={14} />
                    </button>
                </form>
            </div>
        </div>
    </Card>
  );
};
