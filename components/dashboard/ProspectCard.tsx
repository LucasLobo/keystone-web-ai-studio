import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, TrendingDown, TrendingUp, Calendar, Heart, Archive, Plus, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { Prospect, ProspectStatus } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatting';
import { Heading, Text } from '../design/Typography';

interface ProspectCardProps {
  prospect: Prospect;
  filter: 'Active' | 'Archived';
  onQuickAction: (e: React.MouseEvent, prospect: Prospect, action: 'Shortlist' | 'Archive' | 'Restore') => void;
}

export const ProspectCard: React.FC<ProspectCardProps> = ({ prospect, filter, onQuickAction }) => {
  const { t } = useTranslation();

  const currentPrice = prospect.priceHistory.length > 0 
    ? prospect.priceHistory[prospect.priceHistory.length - 1].value 
    : null;
  
  const previousPrice = prospect.priceHistory.length > 1 
    ? prospect.priceHistory[prospect.priceHistory.length - 2].value 
    : currentPrice;
  
  const priceDiff = (currentPrice && previousPrice) ? currentPrice - previousPrice : 0;
  const nextVisit = prospect.visits.find(v => new Date(v.date) > new Date());
  const lastVisit = prospect.visits[0]; // Assuming sorted desc

  return (
    <Link to={`/prospect/${prospect.id}`} className="block h-full">
      <Card className="group hover:border-brand-300 transition-all hover:shadow-md flex flex-col h-full relative">
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            {filter === 'Active' ? (
              <>
                  <button 
                      onClick={(e) => onQuickAction(e, prospect, 'Shortlist')}
                      title={t('dashboard.card.quickActions.shortlist')}
                      className="bg-white p-2 rounded-full shadow border border-slate-100 text-slate-400 hover:text-brand-500 hover:bg-brand-50"
                  >
                      <Heart size={16} className={prospect.status === ProspectStatus.Interesting ? 'fill-current' : ''}/>
                  </button>
                  <button 
                      onClick={(e) => onQuickAction(e, prospect, 'Archive')}
                      title={t('dashboard.card.quickActions.archive')}
                      className="bg-white p-2 rounded-full shadow border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50"
                  >
                      <Archive size={16} />
                  </button>
              </>
            ) : (
              <button 
                  onClick={(e) => onQuickAction(e, prospect, 'Restore')}
                  title={t('dashboard.card.quickActions.restore')}
                  className="bg-white p-2 rounded-full shadow border border-slate-100 text-slate-400 hover:text-green-500 hover:bg-green-50"
              >
                  <Plus size={16} />
              </button>
            )}
        </div>

        <div className="mb-3">
          <StatusBadge status={prospect.status} />
        </div>
        
        <Heading level="h4" font="serif" className="mb-1 group-hover:text-brand-700 transition-colors truncate pr-16">
          {prospect.nickname}
        </Heading>
        
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
          <MapPin size={14} />
          <span className="truncate">{prospect.location || "Unknown location"}</span>
        </div>

        {/* High Density Data */}
        <div className="flex-1 space-y-4">
            {/* Price Trend */}
            <div className="flex items-baseline gap-2">
                <Text size="lg" weight="bold" color="default">
                    {currentPrice ? formatCurrency(currentPrice) : <span className="text-slate-400 text-sm italic">{t('dashboard.card.noPrice')}</span>}
                </Text>
                {priceDiff !== 0 && (
                    <span className={`text-xs font-bold flex items-center ${priceDiff < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {priceDiff < 0 ? <TrendingDown size={12} className="mr-0.5" /> : <TrendingUp size={12} className="mr-0.5" />}
                      {formatCurrency(Math.abs(priceDiff))}
                    </span>
                )}
            </div>

            {/* Visit Indicator */}
            {(nextVisit || lastVisit) && (
                <div className="text-xs flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2 py-1.5 rounded border border-slate-100">
                    <Calendar size={12} />
                    {nextVisit ? (
                        <span className="font-medium text-brand-700">{t('dashboard.card.nextVisit', { date: formatDate(nextVisit.date) })}</span>
                    ) : (
                        <span>{t('dashboard.card.visited', { date: formatDate(lastVisit!.date) })}</span>
                    )}
                </div>
            )}

            {/* Pros/Cons Summary Chips */}
            <div className="flex flex-wrap gap-1.5">
                {prospect.traits.slice(0, 3).map(trait => (
                    <span key={trait.id} className={`text-[10px] px-1.5 py-0.5 rounded border flex items-center gap-1 ${trait.sentiment === 'Positive' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                        {trait.sentiment === 'Positive' ? <ThumbsUp size={8} /> : <ThumbsDown size={8} />}
                        <span className="truncate max-w-[80px]">{trait.text}</span>
                    </span>
                ))}
            </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <span className="text-brand-600 text-sm font-medium flex items-center hover:gap-2 transition-all gap-1">
              {t('dashboard.card.details')} <ArrowRight size={16} />
          </span>
        </div>
      </Card>
    </Link>
  );
};
