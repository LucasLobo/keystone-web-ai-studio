import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/ui/Layout';
import { Card } from '../components/ui/Card';
import { useProspect, useUpdateProspect } from '../hooks/useProspects';
import { Prospect, Visit } from '../types';
import { ArrowLeft, Plus, Check, X, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading, Text } from '../components/design/Typography';
import { Button } from '../components/design/Button';

export const VisitDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id, visitId } = useParams<{ id: string, visitId: string }>();
  const navigate = useNavigate();
  
  const { data: prospect, isLoading } = useProspect(id || '');
  const updateProspectMutation = useUpdateProspect();
  
  const visit = prospect?.visits.find(v => v.id === visitId);
  
  // Promote Modal State
  const [promoteModal, setPromoteModal] = useState<{
      isOpen: boolean;
      text: string;
      sentiment: 'Positive' | 'Negative';
  }>({ isOpen: false, text: '', sentiment: 'Positive' });

  const openPromoteModal = (text: string, sentiment: 'Positive' | 'Negative') => {
      setPromoteModal({ isOpen: true, text, sentiment });
  };

  const handleConfirmPromote = () => {
    if (!prospect || !promoteModal.text.trim()) return;
    
    const updated = {
        ...prospect,
        traits: [...prospect.traits, {
            id: crypto.randomUUID(),
            label: promoteModal.text, 
            text: promoteModal.text,
            sentiment: promoteModal.sentiment,
            createdAt: new Date().toISOString()
        }]
    };
    updateProspectMutation.mutate(updated);
    setPromoteModal({ ...promoteModal, isOpen: false });
  };

  if (isLoading) return (
    <Layout>
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-brand-500" size={48} />
      </div>
    </Layout>
  );

  if (!prospect || !visit) return <Layout><div>{t('common.loading')}</div></Layout>;

  // Helper to render notes
  const renderNotes = (category: string, text: string) => {
      if (!text) return null;
      return (
          <div className="mb-6 border-b border-slate-100 pb-4 last:border-0">
              <Text size="xs" weight="bold" color="muted" className="uppercase mb-2">{t(`visit.categories.${category}`, category)}</Text>
              <div className="flex justify-between items-start gap-4">
                  <Text className="whitespace-pre-wrap flex-1">{text}</Text>
                  <div className="flex flex-col gap-1 shrink-0">
                      <button 
                        onClick={() => openPromoteModal(text, 'Positive')}
                        className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100 flex items-center gap-1"
                        title={t('visit.promotePro')}
                      >
                          <Plus size={12} /> {t('prospect.evaluation.togglePro')}
                      </button>
                      <button 
                        onClick={() => openPromoteModal(text, 'Negative')}
                        className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded hover:bg-red-100 flex items-center gap-1"
                        title={t('visit.promoteCon')}
                      >
                          <Plus size={12} /> {t('prospect.evaluation.toggleCon')}
                      </button>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <Layout>
        <div className="max-w-2xl mx-auto relative">
            <div className="mb-6 flex items-center justify-between">
                <Link to={`/prospect/${id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
                    <ArrowLeft size={16} /> {t('visit.back')}
                </Link>
                <Link to={`/prospect/${id}/visit/${visitId}/edit`} className="text-brand-600 hover:text-brand-700 text-sm font-medium">
                    {t('visit.titleEdit')}
                </Link>
            </div>

            <Heading level="h1" font="serif" className="mb-2">
                {new Date(visit.date).toLocaleDateString()} - {new Date(visit.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Heading>
            <Text color="muted" className="mb-8">{prospect.nickname}</Text>

            <Card>
                {visit.generalNote && (
                    <div className="mb-8 bg-slate-50 p-4 rounded-lg">
                        <Text size="xs" weight="bold" color="muted" className="uppercase mb-1">{t('visit.schedule.generalNote')}</Text>
                        <Text color="default">{visit.generalNote}</Text>
                    </div>
                )}

                <div className="space-y-2">
                    {renderNotes('environment', visit.notes.environment || '')}
                    {renderNotes('building', visit.notes.building || '')}
                    {renderNotes('unit', visit.notes.unit || '')}
                    {renderNotes('amenities', visit.notes.amenities || '')}
                    
                    {!visit.notes.environment && !visit.notes.building && !visit.notes.unit && !visit.notes.amenities && (
                        <Text color="muted" className="italic text-center py-8">{t('prospect.visits.noNotes')}</Text>
                    )}
                </div>
            </Card>

            {/* Promote Modal */}
            {promoteModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setPromoteModal({...promoteModal, isOpen: false})}></div>
                    <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-center mb-4">
                            <Heading level="h3" font="sans">
                                {promoteModal.sentiment === 'Positive' ? t('prospect.evaluation.addPro') : t('prospect.evaluation.addCon')}
                            </Heading>
                            <button onClick={() => setPromoteModal({...promoteModal, isOpen: false})} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <textarea
                            value={promoteModal.text}
                            onChange={(e) => setPromoteModal({...promoteModal, text: e.target.value})}
                            className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-brand-500 outline-none min-h-[100px] mb-4"
                            autoFocus
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setPromoteModal({...promoteModal, isOpen: false})}>
                                {t('common.cancel')}
                            </Button>
                            <Button variant="primary" onClick={handleConfirmPromote}>
                                {t('common.save')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </Layout>
  );
};
