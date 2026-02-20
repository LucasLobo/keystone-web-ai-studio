import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { useTranslation } from 'react-i18next';
import { Home, Edit2 } from 'lucide-react';
import { Prospect } from '../../types';
import { PropertyDetailsModal } from './PropertyDetailsModal';

interface ProspectDetailsCardProps {
    prospect: Prospect;
    onUpdate: (updatedFields: Record<string, any>) => void;
    onEdit: () => void;
}

export const ProspectDetailsCard: React.FC<ProspectDetailsCardProps> = ({ prospect, onUpdate, onEdit }) => {
    const { t } = useTranslation();

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-sans font-semibold text-lg text-slate-900 flex items-center gap-2">
                    <Home size={20} className="text-brand-500" /> {t('prospect.details.title', 'Property Details')}
                </h3>
                <button onClick={onEdit} className="text-slate-400 hover:text-brand-600 transition-colors">
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
    );
};
