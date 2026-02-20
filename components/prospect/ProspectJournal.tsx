import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { useTranslation } from 'react-i18next';
import { Edit2, Clock } from 'lucide-react';
import { Prospect } from '../../types';

interface ProspectJournalProps {
  prospect: Prospect;
  onUpdate: (note: string) => void;
}

export const ProspectJournal: React.FC<ProspectJournalProps> = ({ prospect, onUpdate }) => {
  const { t } = useTranslation();
  const [note, setNote] = useState(prospect.note || '');
  const [isNoteDirty, setIsNoteDirty] = useState(false);

  const handleNoteBlur = () => {
      if (isNoteDirty) {
          onUpdate(note);
          setIsNoteDirty(false);
      }
  };

  return (
    <Card className="flex flex-col h-80">
        <div className="flex items-center gap-2 mb-4 text-slate-900">
            <Edit2 size={20} className="text-brand-500" />
            {/* Updated Header Style */}
            <h3 className="font-sans font-semibold text-lg">{t('prospect.journal.title')}</h3>
        </div>
        <textarea
            value={note}
            onChange={(e) => {
                setNote(e.target.value);
                setIsNoteDirty(true);
            }}
            onBlur={handleNoteBlur}
            placeholder={t('prospect.journal.placeholder')}
            className="flex-1 w-full resize-none outline-none text-slate-600 leading-relaxed bg-transparent border-0 focus:ring-0 p-0 text-sm"
        />
        <div className="pt-2 text-xs text-slate-400 border-t border-slate-100 flex justify-between items-center">
            <span>{isNoteDirty ? t('prospect.journal.unsaved') : t('prospect.journal.saved')}</span>
            <Clock size={12} />
        </div>
    </Card>
  );
};
