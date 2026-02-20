import React, { useState } from 'react';
import { Layout } from '../components/ui/Layout';
import { useProspects, useUpdateProspect } from '../hooks/useProspects';
import { Prospect, ProspectStatus } from '../types';
import { Link } from 'react-router-dom';
import { Plus, Building2, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProspectCard } from '../components/dashboard/ProspectCard';
import { Heading, Text } from '../components/design/Typography';

import { Button } from '../components/design/Button';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { data: prospects = [], isLoading } = useProspects();
  const updateProspectMutation = useUpdateProspect();
  const [filter, setFilter] = useState<'Active' | 'Archived'>('Active');

  const handleQuickAction = (e: React.MouseEvent, prospect: Prospect, action: 'Shortlist' | 'Archive' | 'Restore') => {
    e.stopPropagation();
    e.preventDefault();

    let newStatus = prospect.status;
    if (action === 'Shortlist') newStatus = ProspectStatus.Interesting;
    if (action === 'Archive') newStatus = ProspectStatus.Archived;
    if (action === 'Restore') newStatus = ProspectStatus.UnderReview;

    const updated = { ...prospect, status: newStatus };
    updateProspectMutation.mutate(updated);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="animate-spin text-brand-500" size={48} />
        </div>
      </Layout>
    );
  }

  const filteredProspects = prospects.filter(p => {
    const isArchived = p.status === ProspectStatus.Archived || p.status === ProspectStatus.Withdrawn;
    return filter === 'Active' ? !isArchived : isArchived;
  });

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <Heading level="h1" font="serif" className="mb-2">{t('dashboard.title')}</Heading>
          <div className="flex gap-4 text-sm font-medium">
            <button
              onClick={() => setFilter('Active')}
              className={`${filter === 'Active' ? 'text-brand-600 border-b-2 border-brand-500' : 'text-slate-500 hover:text-slate-800'} py-2 transition-all`}
            >
              {t('dashboard.filter.active')} ({prospects.filter(p => p.status !== ProspectStatus.Archived && p.status !== ProspectStatus.Withdrawn).length})
            </button>
            <button
              onClick={() => setFilter('Archived')}
              className={`${filter === 'Archived' ? 'text-brand-600 border-b-2 border-brand-500' : 'text-slate-500 hover:text-slate-800'} py-2 transition-all`}
            >
              {t('dashboard.filter.archived')} ({prospects.filter(p => p.status === ProspectStatus.Archived || p.status === ProspectStatus.Withdrawn).length})
            </button>
          </div>
        </div>
        <Button
          as={Link}
          to="/add"
          variant="secondary"
          icon={Plus}
          className="shadow-lg shadow-slate-200"
        >
          {t('dashboard.addNew')}
        </Button>
      </div>

      {filteredProspects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Building2 size={32} />
          </div>
          <Heading level="h3" font="sans" className="text-lg font-medium text-slate-900 mb-2">
            {filter === 'Active' ? t('dashboard.empty.activeTitle') : t('dashboard.empty.archivedTitle')}
          </Heading>
          <Text color="muted" className="mb-6 max-w-md mx-auto">
            {filter === 'Active'
              ? t('dashboard.empty.activeDesc')
              : t('dashboard.empty.archivedDesc')}
          </Text>
          {filter === 'Active' && (
            <Link to="/add" className="text-brand-600 font-medium hover:text-brand-700">{t('dashboard.empty.activeCta')} &rarr;</Link>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProspects.map((prospect) => (
            <ProspectCard
              key={prospect.id}
              prospect={prospect}
              filter={filter}
              onQuickAction={handleQuickAction}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};