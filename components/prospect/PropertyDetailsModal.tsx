import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Save, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Prospect } from '../../types';

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospect: Prospect;
  onUpdate: (updatedFields: Record<string, any>) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ isOpen, onClose, prospect, onUpdate }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    rooms: prospect.details?.rooms || '',
    bathrooms: prospect.details?.bathrooms || '',
    grossArea: prospect.details?.grossArea || '',
    netArea: prospect.details?.netArea || '',
    floor: prospect.details?.floor || ''
  });

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setFormData({
        rooms: prospect.details?.rooms || '',
        bathrooms: prospect.details?.bathrooms || '',
        grossArea: prospect.details?.grossArea || '',
        netArea: prospect.details?.netArea || '',
        floor: prospect.details?.floor || ''
      });
    }
  }, [isOpen, prospect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate({
      details: {
        ...prospect.details,
        rooms: formData.rooms ? Number(formData.rooms) : undefined,
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
        grossArea: formData.grossArea ? Number(formData.grossArea) : undefined,
        netArea: formData.netArea ? Number(formData.netArea) : undefined,
        floor: formData.floor || undefined,
        updatedAt: new Date().toISOString()
      }
    });
    onClose();
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  if (!isOpen) return null;

  const renderStep = () => {
      switch (step) {
          case 0: // Rooms & Bathrooms
              return (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('prospect.details.rooms', 'Rooms')}</label>
                          <input
                              type="number"
                              name="rooms"
                              value={formData.rooms}
                              onChange={handleChange}
                              className="w-full text-3xl font-sans font-light border-b-2 border-slate-200 focus:border-brand-500 outline-none py-2 bg-transparent transition-colors placeholder:text-slate-300"
                              placeholder="2"
                              autoFocus
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('prospect.details.bathrooms', 'Bathrooms')}</label>
                          <input
                              type="number"
                              step="0.5"
                              name="bathrooms"
                              value={formData.bathrooms}
                              onChange={handleChange}
                              className="w-full text-3xl font-sans font-light border-b-2 border-slate-200 focus:border-brand-500 outline-none py-2 bg-transparent transition-colors placeholder:text-slate-300"
                              placeholder="1.5"
                          />
                      </div>
                  </div>
              );
          case 1: // Areas
              return (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('prospect.details.grossArea', 'Gross Area (m²)')}</label>
                          <input
                              type="number"
                              name="grossArea"
                              value={formData.grossArea}
                              onChange={handleChange}
                              className="w-full text-3xl font-sans font-light border-b-2 border-slate-200 focus:border-brand-500 outline-none py-2 bg-transparent transition-colors placeholder:text-slate-300"
                              placeholder="85"
                              autoFocus
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('prospect.details.netArea', 'Net Area (m²)')}</label>
                          <input
                              type="number"
                              name="netArea"
                              value={formData.netArea}
                              onChange={handleChange}
                              className="w-full text-3xl font-sans font-light border-b-2 border-slate-200 focus:border-brand-500 outline-none py-2 bg-transparent transition-colors placeholder:text-slate-300"
                              placeholder="78"
                          />
                      </div>
                  </div>
              );
          case 2: // Floor
              return (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('prospect.details.floor', 'Floor')}</label>
                          <input
                              type="text"
                              name="floor"
                              value={formData.floor}
                              onChange={handleChange}
                              className="w-full text-3xl font-sans font-light border-b-2 border-slate-200 focus:border-brand-500 outline-none py-2 bg-transparent transition-colors placeholder:text-slate-300"
                              placeholder={t('prospect.details.floorPlaceholder', 'e.g. 3rd')}
                              autoFocus
                          />
                      </div>
                  </div>
              );
          default:
              return null;
      }
  };

  const totalSteps = 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col min-h-[400px]">
        <div className="flex justify-between items-center mb-8">
          <div>
              <h3 className="text-xl font-sans font-bold text-slate-900">{t('prospect.details.title', 'Property Details')}</h3>
              <div className="flex gap-1 mt-2">
                  {[0, 1, 2].map(i => (
                      <div key={i} className={`h-1 w-8 rounded-full transition-colors ${i <= step ? 'bg-brand-500' : 'bg-slate-100'}`}></div>
                  ))}
              </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1">
            {renderStep()}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-50">
            {step > 0 ? (
                <button
                    onClick={prevStep}
                    className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 px-3 py-2 rounded transition-colors"
                >
                    <ChevronLeft size={18} /> {t('common.back')}
                </button>
            ) : (
                <div></div>
            )}

            {step < totalSteps - 1 ? (
                <button
                    onClick={nextStep}
                    className="bg-slate-900 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                    {t('common.next')} <ChevronRight size={18} />
                </button>
            ) : (
                <button
                    onClick={handleSave}
                    className="bg-brand-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-brand-700 transition-all flex items-center gap-2"
                >
                    {t('common.save')} <Check size={18} />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};
