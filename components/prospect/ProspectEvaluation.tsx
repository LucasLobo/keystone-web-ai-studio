import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThumbsUp, ThumbsDown, X, Plus } from 'lucide-react';
import { Card } from '../ui/Card';
import { Heading, Text } from '../design/Typography';
import { Button } from '../design/Button';
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
            <Heading level="h3" font="sans" className="mb-6 text-center">{t('prospect.evaluation.title')}</Heading>

            <div className="grid grid-cols-2 gap-4 h-full content-start">
                {/* Pros Column */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
                        <ThumbsUp size={14} className="text-emerald-700" />
                        <Text size="xs" weight="bold" className="text-emerald-700 uppercase tracking-wide">
                            {t('prospect.evaluation.pros')}
                        </Text>
                    </div>

                    <div className="space-y-2 flex-1">
                        {prospect.traits.filter(t => t.sentiment === 'Positive').map(trait => (
                            <div key={trait.id} className="group flex justify-between items-start text-sm text-slate-700 bg-emerald-50/50 p-2 rounded border border-emerald-100/50">
                                <span className="break-words w-full pr-1">{trait.text}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDeleteTrait(trait.id)}
                                    className="h-5 w-5 text-emerald-300 hover:text-emerald-700 opacity-0 group-hover:opacity-100 shrink-0"
                                    icon={X}
                                />
                            </div>
                        ))}
                        {prospect.traits.filter(t => t.sentiment === 'Positive').length === 0 && (
                            <Text size="xs" color="muted" className="italic">{t('prospect.evaluation.emptyPros')}</Text>
                        )}
                    </div>

                    {/* Add Pro Form */}
                    <form onSubmit={handleAddPro} className="relative mt-2">
                        <input
                            type="text"
                            value={newPro}
                            onChange={e => setNewPro(e.target.value)}
                            placeholder={t('prospect.evaluation.addPro')}
                            className="w-full pl-2 pr-8 py-1.5 text-xs border border-slate-200 rounded bg-white text-slate-900 focus:border-brand-500 outline-none transition-colors"
                        />
                        <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0.5 top-0.5 h-6 w-6 text-slate-400 hover:text-emerald-600"
                            icon={Plus}
                        />
                    </form>
                </div>

                {/* Cons Column */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 border-b border-red-100 pb-2">
                        <ThumbsDown size={14} className="text-red-700" />
                        <Text size="xs" weight="bold" className="text-red-700 uppercase tracking-wide">
                            {t('prospect.evaluation.cons')}
                        </Text>
                    </div>

                    <div className="space-y-2 flex-1">
                        {prospect.traits.filter(t => t.sentiment === 'Negative').map(trait => (
                            <div key={trait.id} className="group flex justify-between items-start text-sm text-slate-700 bg-red-50/50 p-2 rounded border border-red-100/50">
                                <span className="break-words w-full pr-1">{trait.text}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDeleteTrait(trait.id)}
                                    className="h-5 w-5 text-red-300 hover:text-red-700 opacity-0 group-hover:opacity-100 shrink-0"
                                    icon={X}
                                />
                            </div>
                        ))}
                        {prospect.traits.filter(t => t.sentiment === 'Negative').length === 0 && (
                            <Text size="xs" color="muted" className="italic">{t('prospect.evaluation.emptyCons')}</Text>
                        )}
                    </div>

                    {/* Add Con Form */}
                    <form onSubmit={handleAddCon} className="relative mt-2">
                        <input
                            type="text"
                            value={newCon}
                            onChange={e => setNewCon(e.target.value)}
                            placeholder={t('prospect.evaluation.addCon')}
                            className="w-full pl-2 pr-8 py-1.5 text-xs border border-slate-200 rounded bg-white text-slate-900 focus:border-brand-500 outline-none transition-colors"
                        />
                        <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0.5 top-0.5 h-6 w-6 text-slate-400 hover:text-red-600"
                            icon={Plus}
                        />
                    </form>
                </div>
            </div>
        </Card>
    );
};
