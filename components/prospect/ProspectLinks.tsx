import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { useTranslation } from 'react-i18next';
import { ExternalLink, X, Plus } from 'lucide-react';
import { Prospect } from '../../types';
import { normalizeUrl, extractDomain } from '../../services/storage';

interface ProspectLinksProps {
  prospect: Prospect;
  onAddLink: (link: string) => void;
  onDeleteLink: (linkId: string) => void;
}

export const ProspectLinks: React.FC<ProspectLinksProps> = ({ prospect, onAddLink, onDeleteLink }) => {
  const { t } = useTranslation();
  const [newLink, setNewLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink) return;
    onAddLink(newLink);
    setNewLink('');
  };

  return (
    <Card>
        {/* Updated Header Style */}
        <h3 className="font-sans font-semibold text-lg text-slate-900 mb-4">{t('prospect.links.title')}</h3>
        <div className="space-y-3 mb-4">
            {prospect.links.map(link => (
                <div key={link.id} className="group flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold uppercase shrink-0">
                            {link.domain.slice(0, 2)}
                        </div>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="truncate text-slate-600 hover:text-brand-600 font-medium text-sm flex-1">
                            {link.domain}
                        </a>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900">
                            <ExternalLink size={14} />
                        </a>
                        <button onClick={() => onDeleteLink(link.id)} className="text-slate-400 hover:text-red-600">
                            <X size={14} />
                        </button>
                    </div>
                </div>
            ))}
            {prospect.links.length === 0 && (
                <p className="text-sm text-slate-400 italic">{t('prospect.links.empty')}</p>
            )}
        </div>
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="text"
                value={newLink}
                onChange={e => setNewLink(e.target.value)}
                placeholder={t('prospect.links.placeholder')}
                className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-900 focus:border-brand-500 outline-none transition-all"
            />
            <button type="submit" className="absolute right-2 top-2 text-slate-400 hover:text-brand-600">
                <Plus size={16} />
            </button>
        </form>
    </Card>
  );
};
