import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Edit2, TrendingDown, TrendingUp } from 'lucide-react';
import { Prospect, ProspectStatus } from '../../types';
import { formatCurrency } from '../../utils/formatting';
import { Heading, Text } from '../design/Typography';
import { Button } from '../design/Button';

interface ProspectHeaderProps {
    prospect: Prospect;
    onUpdate: (updated: Partial<Prospect>) => void;
    onAddPrice: (price: number, date: string) => void;
}

export const ProspectHeader: React.FC<ProspectHeaderProps> = ({ prospect, onUpdate, onAddPrice }) => {
    const { t } = useTranslation();

    // Edit States
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [tempTitle, setTempTitle] = useState(prospect.nickname);
    const [tempLocation, setTempLocation] = useState(prospect.location || '');

    // Status
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    // Price
    const [isAddingPrice, setIsAddingPrice] = useState(false);
    const [newPrice, setNewPrice] = useState('');
    const [priceDate, setPriceDate] = useState('');

    useEffect(() => {
        // Default price date to today
        setPriceDate(new Date().toISOString().split('T')[0]);
    }, []);

    // Update local state when prospect changes
    useEffect(() => {
        setTempTitle(prospect.nickname);
        setTempLocation(prospect.location || '');
    }, [prospect]);

    const saveHeader = () => {
        onUpdate({
            nickname: tempTitle,
            location: tempLocation
        });
        setIsEditingTitle(false);
    };

    const handleStatusChange = (status: ProspectStatus) => {
        onUpdate({ status });
        setIsStatusOpen(false);
    };

    const handleAddPriceSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPrice || !priceDate) return;
        onAddPrice(parseFloat(newPrice), priceDate);
        setIsAddingPrice(false);
        setNewPrice('');
    };

    // Helper to determine if we are correcting an existing price for the selected date
    const isCorrectingPrice = () => {
        if (!prospect || !priceDate) return false;
        return prospect.priceHistory.some(p => p.effectiveAt.split('T')[0] === priceDate);
    };

    const hasPriceHistory = prospect.priceHistory.length > 0;

    // Current price is the last one in the list (sorted by date asc in storage)
    const currentPrice = hasPriceHistory
        ? prospect.priceHistory[prospect.priceHistory.length - 1].value
        : 0;

    // Change logic: Compare Current Price vs First Price recorded
    const initialPrice = hasPriceHistory ? prospect.priceHistory[0].value : currentPrice;
    const priceDiff = currentPrice - initialPrice;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 relative overflow-visible">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
                <div className="flex-1">
                    {isEditingTitle ? (
                        <div className="space-y-3 max-w-md">
                            {/* Edit Nickname */}
                            <input
                                type="text"
                                value={tempTitle}
                                onChange={e => setTempTitle(e.target.value)}
                                className="text-3xl md:text-4xl font-serif font-bold text-slate-900 w-full border-b border-brand-500 focus:outline-none bg-transparent"
                                autoFocus
                            />
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-slate-400" />
                                {/* Edit Location */}
                                <input
                                    type="text"
                                    value={tempLocation}
                                    onChange={e => setTempLocation(e.target.value)}
                                    className="text-slate-600 w-full border-b border-slate-300 focus:border-brand-500 focus:outline-none bg-transparent"
                                    placeholder={t('addProspect.form.locationPlaceholder')}
                                />
                            </div>
                            <div className="flex gap-2 mt-2">
                                <Button size="sm" onClick={saveHeader}>{t('common.save')}</Button>
                                <Button size="sm" variant="ghost" onClick={() => setIsEditingTitle(false)}>{t('common.cancel')}</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="group">
                            <div className="flex items-center gap-3">
                                <Heading level="h1" font="serif" className="leading-tight">
                                    {prospect.nickname}
                                </Heading>
                                <button onClick={() => setIsEditingTitle(true)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-brand-600 transition-opacity" title="Edit Core Details">
                                    <Edit2 size={18} />
                                </button>
                            </div>
                            {prospect.location && (
                                <div className="flex items-center gap-2 text-slate-500 mt-2">
                                    <MapPin size={18} />
                                    <Text color="muted">{prospect.location}</Text>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Status Lifecycle */}
                    <div className="mt-6 relative inline-block">
                        <Button
                            variant="ghost"
                            onClick={() => setIsStatusOpen(!isStatusOpen)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold border border-slate-200"
                        >
                            <span className={`w-2 h-2 rounded-full mr-2 ${prospect.status === ProspectStatus.Interesting ? 'bg-brand-500' : 'bg-slate-400'}`}></span>
                            {t(`status.${prospect.status}`)}
                        </Button>

                        {isStatusOpen && (
                            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50">
                                {Object.values(ProspectStatus).map(s => (
                                    <button
                                        key={s}
                                        onClick={() => handleStatusChange(s)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${s === prospect.status ? 'text-brand-600 font-semibold' : 'text-slate-600'}`}
                                    >
                                        {t(`status.${s}`)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Price Hero */}
                <div className="text-right">
                    <Text size="sm" weight="medium" color="muted" className="uppercase tracking-wider mb-1">{t('prospect.askingPrice')}</Text>
                    <Heading level="h1" font="serif" className="text-4xl md:text-5xl">
                        {currentPrice ? formatCurrency(currentPrice) : '---'}
                    </Heading>
                    {priceDiff !== 0 && (
                        <div className={`flex items-center justify-end gap-1 mt-1 font-medium ${priceDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {priceDiff < 0 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                            {formatCurrency(Math.abs(priceDiff))}
                        </div>
                    )}

                    {/* Price Updates */}
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => setIsAddingPrice(!isAddingPrice)}
                        className="mt-4 font-medium"
                    >
                        {hasPriceHistory ? t('prospect.updatePrice') : t('prospect.addPrice')}
                    </Button>

                    {isAddingPrice && (
                        <form onSubmit={handleAddPriceSubmit} className="mt-3 bg-white p-4 rounded-xl border border-slate-200 text-left animate-in fade-in slide-in-from-top-2 absolute right-0 z-20 shadow-xl min-w-[280px]">

                            {/* Date Selection */}
                            <div className="mb-4">
                                <Text weight="bold" color="muted" className="text-[10px] uppercase mb-1.5 leading-none">{t('prospect.priceForm.date')}</Text>
                                <input
                                    type="date"
                                    value={priceDate}
                                    onChange={e => setPriceDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                                />
                            </div>

                            <div className="mb-5">
                                <Text weight="bold" color="muted" className="text-[10px] uppercase mb-1.5 leading-none">{t('prospect.priceForm.newPrice')}</Text>
                                <input
                                    type="number"
                                    value={newPrice}
                                    onChange={e => setNewPrice(e.target.value)}
                                    placeholder={t('prospect.priceForm.placeholder')}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                                    autoFocus
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button size="sm" variant="ghost" type="button" onClick={() => setIsAddingPrice(false)}>{t('common.cancel')}</Button>
                                <Button size="sm" type="submit" variant="secondary">
                                    {isCorrectingPrice() ? t('prospect.priceForm.correct') : t('prospect.priceForm.save')}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
