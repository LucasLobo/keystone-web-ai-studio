import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/ui/Layout';
import { 
  normalizeUrl,
  extractDomain
} from '../utils/url';
import { useProspect, useUpdateProspect, useDeleteProspect } from '../hooks/useProspects';
import { getActiveGuidance } from '../services/guidance';
import { Prospect, PriceEntry } from '../types';
import { ArrowLeft, Trash2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProspectVisits } from '../components/prospect/ProspectVisits';
import { ProspectJournal } from '../components/prospect/ProspectJournal';
import { ProspectLinks } from '../components/prospect/ProspectLinks';
import { ProspectEvaluation } from '../components/prospect/ProspectEvaluation';
import { ProspectHeader } from '../components/prospect/ProspectHeader';
import { ProspectHistory } from '../components/prospect/ProspectHistory';
import { ProspectDetailsCard } from '../components/prospect/ProspectDetailsCard';
import { Modal } from '../components/ui/Modal';
import { PropertyDetailsModal } from '../components/prospect/PropertyDetailsModal';
import { Heading, Text } from '../components/design/Typography';
import { Button } from '../components/design/Button';

export const ProspectDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: prospect, isLoading } = useProspect(id || '');
  const updateProspectMutation = useUpdateProspect();
  const deleteProspectMutation = useDeleteProspect();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  if (isLoading) return (
    <Layout>
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-brand-500" size={48} />
      </div>
    </Layout>
  );

  if (!prospect) return (
    <Layout>
        <div className="text-center py-20">
            <Heading level="h2" font="serif" className="mb-4">{t('prospect.notFound')}</Heading>
            <Link to="/dashboard">
              <Button variant="link">{t('prospect.returnDashboard')}</Button>
            </Link>
        </div>
    </Layout>
  );

  const handleUpdateProspect = (updated: Prospect) => {
    updateProspectMutation.mutate(updated);
  };

  const handlePartialUpdate = (updatedFields: Partial<Prospect>) => {
      const updated = { ...prospect, ...updatedFields };
      handleUpdateProspect(updated);
  };

  // S03: Deletion
  const handleDeleteProspect = () => {
    if (prospect && prospect.id) {
      deleteProspectMutation.mutate(prospect.id, {
        onSuccess: () => {
          navigate('/dashboard', { replace: true });
        }
      });
    }
  };

  // S06: Price History with Date Selection
  const handleAddPrice = (price: number, date: string) => {
    let newHistory = [...prospect.priceHistory];
    const existingIndex = newHistory.findIndex(p => p.effectiveAt.split('T')[0] === date);

    if (existingIndex > -1) {
      newHistory[existingIndex] = { ...newHistory[existingIndex], value: price };
    } else {
      const entry: PriceEntry = {
        id: crypto.randomUUID(),
        value: price,
        effectiveAt: new Date(date).toISOString(),
        createdAt: new Date().toISOString()
      };
      newHistory.push(entry);
    }
    newHistory.sort((a, b) => new Date(a.effectiveAt).getTime() - new Date(b.effectiveAt).getTime());
    
    handlePartialUpdate({ priceHistory: newHistory });
  };

  // S04: Add Link with robust normalization
  const handleAddLink = (link: string) => {
    const normalized = normalizeUrl(link);
    const domain = extractDomain(normalized);

    const updated = {
        ...prospect,
        links: [...prospect.links, {
            id: crypto.randomUUID(),
            url: normalized,
            domain,
            createdAt: new Date().toISOString()
        }]
    };
    handleUpdateProspect(updated);
  };

  const handleDeleteLink = (linkId: string) => {
      const updated = {
          ...prospect,
          links: prospect.links.filter(l => l.id !== linkId)
      };
      handleUpdateProspect(updated);
  };

  const handleAddTrait = (text: string, sentiment: 'Positive' | 'Negative') => {
      const updated = {
          ...prospect,
          traits: [...prospect.traits, {
              id: crypto.randomUUID(),
              label: text, 
              text: text,
              sentiment,
              createdAt: new Date().toISOString()
          }]
      };
      handleUpdateProspect(updated);
  };

  const handleDeleteTrait = (traitId: string) => {
      const updated = {
          ...prospect,
          traits: prospect.traits.filter(t => t.id !== traitId)
      };
      handleUpdateProspect(updated);
  };

  const handleUpdateNote = (note: string) => {
      handlePartialUpdate({ note });
  };

  // S14: Configurable Guidance
  const activeGuidance = getActiveGuidance(prospect);

  const handleGuidanceAction = () => {
    if (!activeGuidance) return;
    
    if (activeGuidance.id === 'missing_details') {
        setShowDetailsModal(true);
    } else if (activeGuidance.actionType === 'navigate' && activeGuidance.actionPath) {
      navigate(activeGuidance.actionPath(prospect));
    } else if (activeGuidance.actionType === 'update' && activeGuidance.updatePayload) {
      handlePartialUpdate(activeGuidance.updatePayload);
    }
  };

  return (
    <Layout>
      {/* Breadcrumb & Actions */}
      <div className="mb-6 flex items-center justify-between">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
          <ArrowLeft size={16} /> {t('addProspect.backToDashboard')}
        </Link>
        <button 
            onClick={() => setShowDeleteModal(true)}
            className="text-slate-400 hover:text-red-600 text-sm font-sans flex items-center gap-1 transition-colors"
        >
            <Trash2 size={14} /> {t('prospect.delete')}
        </button>
      </div>

      {/* Guidance Banner (S14) - Moved Below Breadcrumb */}
      {activeGuidance && (
          <div className={`border px-6 py-4 rounded-lg mb-6 flex justify-between items-center shadow-sm animate-in slide-in-from-top-2 ${activeGuidance.priority >= 100 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-brand-50 border-brand-200 text-brand-900'}`}>
              <div className="flex items-center gap-3 font-medium">
                  {activeGuidance.priority >= 100 ? <AlertCircle size={20} className="text-amber-600" /> : <CheckCircle2 size={20} className="text-brand-600" />}
                  <Text size="lg" className="font-medium">{t(activeGuidance.messageKey)}</Text>
              </div>
              {activeGuidance.actionKey && (
                  <button onClick={handleGuidanceAction} className={`text-sm px-4 py-2 rounded font-medium transition-colors shadow-sm ${activeGuidance.priority >= 100 ? 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50' : 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50'}`}>
                      {t(activeGuidance.actionKey)} &rarr;
                  </button>
              )}
          </div>
      )}

      {/* Header Area */}
      <ProspectHeader 
        prospect={prospect} 
        onUpdate={handlePartialUpdate} 
        onAddPrice={handleAddPrice} 
      />

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Intelligence (Journal & Links & Visits) */}
        <div className="space-y-8">
            
            {/* S03: Property Details (Moved to Top) */}
            <div id="details">
              <ProspectDetailsCard prospect={prospect} onUpdate={handlePartialUpdate} />
            </div>

            {/* J03: Visits Section */}
            <ProspectVisits prospect={prospect} />

            {/* S04: Listing Link Management */}
            <ProspectLinks prospect={prospect} onAddLink={handleAddLink} onDeleteLink={handleDeleteLink} />
        </div>

        {/* Middle Column: Evaluation (Pros / Cons) - S07 */}
        <div className="lg:col-span-1 h-fit" id="evaluation">
             <ProspectEvaluation prospect={prospect} onAddTrait={handleAddTrait} onDeleteTrait={handleDeleteTrait} />
        </div>

        {/* Right Column: Notes & Financial History */}
        <div className="space-y-6">
            {/* S03: Note Editing (Journal) - Moved here */}
            <ProspectJournal prospect={prospect} onUpdate={handleUpdateNote} />
            
            <ProspectHistory prospect={prospect} />
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteProspect}
        title={t('prospect.delete')}
        description={t('prospect.deleteConfirm')}
        confirmText={t('common.delete')}
        isDestructive={true}
      />

      {/* Property Details Wizard Modal */}
      <PropertyDetailsModal 
        isOpen={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)} 
        prospect={prospect} 
        onUpdate={handlePartialUpdate} 
      />
    </Layout>
  );
};
