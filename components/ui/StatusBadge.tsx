import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProspectStatus } from '../../types';

interface StatusBadgeProps {
  status: ProspectStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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
