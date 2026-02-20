import React from 'react';
import { Card } from '../ui/Card';
import { useTranslation } from 'react-i18next';
import { Euro } from 'lucide-react';
import { SimplePriceChart } from '../charts/SimplePriceChart';
import { formatCurrency, formatDate } from '../../utils/formatting';
import { Prospect } from '../../types';
import { Heading, Text } from '../design/Typography';

interface ProspectHistoryProps {
  prospect: Prospect;
}

export const ProspectHistory: React.FC<ProspectHistoryProps> = ({ prospect }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
        <Card>
            {/* Updated Header Style */}
            <Heading level="h3" font="sans" className="mb-4 flex items-center gap-2">
                <Euro size={20} className="text-brand-500" /> {t('prospect.history.title')}
            </Heading>
            
            {/* Improved Time Series Chart */}
            <SimplePriceChart history={prospect.priceHistory} />

            <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 py-2">
                {/* Reverse order for history */}
                {[...prospect.priceHistory].reverse().map((entry, idx) => (
                    <div key={entry.id} className="relative pl-6">
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${idx === 0 ? 'bg-brand-500' : 'bg-slate-300'}`}></div>
                        <div className="flex flex-col">
                            <Text size="lg" weight="bold" color={idx === 0 ? 'default' : 'muted'}>
                                {formatCurrency(entry.value)}
                            </Text>
                            <Text size="xs" weight="medium" color="muted">
                                {formatDate(entry.effectiveAt)}
                            </Text>
                        </div>
                    </div>
                ))}
                {prospect.priceHistory.length === 0 && (
                    <Text size="sm" color="muted" className="pl-6 italic">{t('prospect.history.empty')}</Text>
                )}
            </div>
        </Card>

        <div className="bg-slate-900 rounded-xl p-6 text-slate-300">
            <Heading level="h3" font="sans" color="white" className="mb-3 flex items-center gap-2">{t('prospect.decision.title')}</Heading>
            <Text size="sm" className="leading-relaxed mb-4 text-slate-300">
                {t('prospect.decision.text')}
            </Text>
            <div className="text-xs font-mono bg-slate-800 p-3 rounded text-slate-400">
                {t('prospect.decision.lastUpdated', { date: formatDate(prospect.updatedAt) })}
            </div>
        </div>
    </div>
  );
};
