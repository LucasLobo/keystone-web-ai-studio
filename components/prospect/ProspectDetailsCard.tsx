import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { useTranslation } from 'react-i18next';
import { Home, Edit2 } from 'lucide-react';
import { Prospect } from '../../types';
import { PropertyDetailsModal } from './PropertyDetailsModal';

interface ProspectDetailsCardProps {
  prospect: Prospect;
  onUpdate: (updatedFields: Record<string, any>) => void;
  openModal?: boolean;
  onCloseModal?: () => void;
}

export const ProspectDetailsCard: React.FC<ProspectDetailsCardProps> = ({ prospect, onUpdate, openModal, onCloseModal }) => {
  const { t } = useTranslation();
  const [isInternalModalOpen, setInternalModalOpen] = useState(false);

  // Allow parent to control modal state or handle it internally
  const isModalOpen = openModal !== undefined ? openModal : isInternalModalOpen;
  const handleClose = onCloseModal || (() => setInternalModalOpen(false));
  const handleOpen = () => {
      if (onCloseModal) {
          // If parent controls it, we can't just set internal state, but we don't have an onOpen prop.
          // Ideally the parent passes openModal=true when it wants it open.
          // But for the edit button *inside* the card, we need a way to trigger it.
          // For now, let's assume if openModal is passed, parent handles everything.
          // If not, we use internal state.
      } else {
          setInternalModalOpen(true);
      }
  };

  // Actually, simpler: The card always has an edit button. The parent might ALSO want to open the modal (via banner).
  // So we should expose the Modal as a separate component (done) and just use it here.
  // The parent (ProspectDetail) will render the modal for the banner action.
  // This card will render its OWN modal for the edit button action.

  return (
    <>
        <Card>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-sans font-semibold text-lg text-slate-900 flex items-center gap-2">
            <Home size={20} className="text-brand-500" /> {t('prospect.details.title', 'Property Details')}
            </h3>
            <button onClick={() => setInternalModalOpen(true)} className="text-slate-400 hover:text-brand-600 transition-colors">
                <Edit2 size={16} />
            </button>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
            <div>
                <p className="text-slate-500 text-xs uppercase">{t('prospect.details.rooms', 'Rooms')}</p>
                <p className="font-medium text-slate-900">{prospect.details?.rooms ?? '-'}</p>
            </div>
            <div>
                <p className="text-slate-500 text-xs uppercase">{t('prospect.details.bathrooms', 'Bathrooms')}</p>
                <p className="font-medium text-slate-900">{prospect.details?.bathrooms ?? '-'}</p>
            </div>
            <div>
                <p className="text-slate-500 text-xs uppercase">{t('prospect.details.grossArea', 'Gross Area')}</p>
                <p className="font-medium text-slate-900">{prospect.details?.grossArea ? `${prospect.details.grossArea} m²` : '-'}</p>
            </div>
            <div>
                <p className="text-slate-500 text-xs uppercase">{t('prospect.details.netArea', 'Net Area')}</p>
                <p className="font-medium text-slate-900">{prospect.details?.netArea ? `${prospect.details.netArea} m²` : '-'}</p>
            </div>
            <div className="col-span-2">
                <p className="text-slate-500 text-xs uppercase">{t('prospect.details.floor', 'Floor')}</p>
                <p className="font-medium text-slate-900">{prospect.details?.floor || '-'}</p>
            </div>
        </div>
        </Card>

        <PropertyDetailsModal 
            isOpen={isModalOpen} 
            onClose={handleClose} 
            prospect={prospect} 
            onUpdate={onUpdate} 
        />
    </>
  );
};
