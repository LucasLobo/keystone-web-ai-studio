import React, { useState, useEffect } from 'react';
import { Layout } from '../components/ui/Layout';
import { Card } from '../components/ui/Card';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Link as LinkIcon, AlertCircle, ChevronRight, ChevronLeft, Check, SkipForward } from 'lucide-react';
import { checkDuplicateLink, checkDuplicateNickname } from '../services/storage';
import { useCreateProspect } from '../hooks/useProspects';
import { useTranslation } from 'react-i18next';
import { Heading, Text } from '../components/design/Typography';
import { Button } from '../components/design/Button';
import { Input, TextArea } from '../components/design/Input';

// --- CONFIGURATION ---

type InputType = 'text' | 'number' | 'textarea' | 'url';

interface ProspectStepConfig {
    id: keyof FormState;
    type: InputType;
    titleKey: string;
    descriptionKey: string;
    placeholderKey: string;
    required?: boolean;
    icon?: React.ElementType;
}

// Defines the shape of our form data
interface FormState {
    nickname: string;
    location: string;
    link: string;
    price: string;
    note: string;
}

const PROSPECT_WIZARD_STEPS: ProspectStepConfig[] = [
    { 
        id: 'nickname', 
        type: 'text', 
        titleKey: 'addProspect.steps.step1', 
        descriptionKey: 'addProspect.steps.step1Desc', 
        placeholderKey: 'addProspect.form.nicknamePlaceholder',
        required: true 
    },
    { 
        id: 'price', 
        type: 'number', 
        titleKey: 'addProspect.steps.step4', 
        descriptionKey: 'addProspect.steps.step4Desc', 
        placeholderKey: 'addProspect.form.pricePlaceholder' 
    },
    { 
        id: 'location', 
        type: 'text', 
        titleKey: 'addProspect.steps.step2', 
        descriptionKey: 'addProspect.steps.step2Desc', 
        placeholderKey: 'addProspect.form.locationPlaceholder' 
    },
    { 
        id: 'link', 
        type: 'url', 
        titleKey: 'addProspect.steps.step3', 
        descriptionKey: 'addProspect.steps.step3Desc', 
        placeholderKey: 'addProspect.form.linkPlaceholder',
        icon: LinkIcon
    },
    { 
        id: 'note', 
        type: 'textarea', 
        titleKey: 'addProspect.steps.step5', 
        descriptionKey: 'addProspect.steps.step5Desc', 
        placeholderKey: 'addProspect.form.notePlaceholder' 
    }
];

export const AddProspect: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const createProspectMutation = useCreateProspect();
  
  // Wizard State
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormState>({
      nickname: '',
      location: '',
      link: '',
      price: '',
      note: ''
  });

  // Validation State
  const [errors, setErrors] = useState<{nickname?: string}>({});
  const [warnings, setWarnings] = useState<{link?: {id: string, name: string}, nickname?: boolean}>({});

  const currentStep = PROSPECT_WIZARD_STEPS[stepIndex];
  const totalSteps = PROSPECT_WIZARD_STEPS.length;
  const isLastStep = stepIndex === totalSteps - 1;

  // --- DUPLICATE DETECTION LOGIC ---
  
  // Watch Link for duplicates
  useEffect(() => {
    if (formData.link) {
        const existing = checkDuplicateLink(formData.link);
        if (existing) {
            setWarnings(prev => ({ ...prev, link: { id: existing.id, name: existing.nickname } }));
        } else {
            setWarnings(prev => {
                const { link, ...rest } = prev;
                return rest;
            });
        }
    } else {
        setWarnings(prev => {
            const { link, ...rest } = prev;
            return rest;
        });
    }
  }, [formData.link]);

  // Watch Nickname for duplicates
  useEffect(() => {
    if (formData.nickname && checkDuplicateNickname(formData.nickname)) {
        setWarnings(prev => ({...prev, nickname: true}));
    } else {
        setWarnings(prev => ({...prev, nickname: false}));
    }
  }, [formData.nickname]);

  // --- HANDLERS ---

  const handleInputChange = (value: string) => {
      setFormData(prev => ({ ...prev, [currentStep.id]: value }));
      // Clear specific error if typing in that field
      if (currentStep.id === 'nickname') setErrors({ nickname: undefined });
  };

  const handleSubmit = async () => {
    const newProspect = await createProspectMutation.mutateAsync({
        nickname: formData.nickname.trim(),
        initialLink: formData.link.trim() || undefined,
        initialPrice: formData.price ? parseFloat(formData.price) : undefined,
        location: formData.location.trim() || undefined,
        initialNote: formData.note.trim() || undefined
    });
    navigate(`/prospect/${newProspect.id}`);
  };

  const handleNext = () => {
      // 1. Validation Logic
      if (currentStep.required && !formData[currentStep.id]?.trim()) {
          // Generic required check, specific error message for nickname as it's the only required one currently
          if (currentStep.id === 'nickname') {
            setErrors({ nickname: t('addProspect.form.nicknameRequired') });
          }
          return;
      }

      // 2. Blocker Logic (Duplicate Link)
      if (currentStep.id === 'link' && warnings.link) {
          return;
      }

      // 3. Navigation
      if (stepIndex < totalSteps - 1) {
          setStepIndex(s => s + 1);
      } else {
          handleSubmit();
      }
  };

  const handleBack = () => {
      if (stepIndex > 0) setStepIndex(s => s - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && currentStep.type !== 'textarea') {
          e.preventDefault();
          handleNext();
      }
  };

  const isCurrentStepEmpty = () => {
      return !formData[currentStep.id]?.trim();
  };

  // --- RENDERERS ---

  const renderInput = () => {
      const value = formData[currentStep.id];
      const hasError = !!errors.nickname && currentStep.id === 'nickname';
      const isUrlStep = currentStep.id === 'link';
      const hasWarning = isUrlStep && !!warnings.link;

      if (currentStep.type === 'textarea') {
          return (
            <TextArea
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={t(currentStep.placeholderKey)}
                rows={4}
                autoFocus
                className="text-lg"
            />
          );
      }

      return (
          <Input
            type={currentStep.type === 'number' ? 'number' : 'text'}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t(currentStep.placeholderKey)}
            autoFocus
            icon={currentStep.icon}
            error={hasError ? errors.nickname : undefined}
            state={hasWarning ? 'error' : 'default'}
            size="lg"
            className="text-lg"
          />
      );
  };

  const renderWarnings = () => {
      if (currentStep.id === 'nickname' && warnings.nickname) {
          return (
            <div className="flex items-center gap-2 mt-4 text-amber-700 bg-amber-50 p-3 rounded-md text-sm animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={18} />
                <Text as="span" size="sm" className="text-amber-700">{t('addProspect.warnings.duplicateNickname')}</Text>
            </div>
          );
      }

      if (currentStep.id === 'link' && warnings.link) {
          return (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2">
                <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={20} />
                <div>
                    <Text weight="semibold" className="text-red-900">{t('addProspect.warnings.duplicateLinkTitle')}</Text>
                    <Text size="sm" className="text-red-700 mt-1">
                        {t('addProspect.warnings.duplicateLinkDesc', { name: warnings.link.name })}
                    </Text>
                </div>
            </div>
          );
      }

      return null;
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb & Progress */}
        <div className="mb-8">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-4 text-sm font-medium">
                <ArrowLeft size={16} /> {t('addProspect.backToDashboard')}
            </Link>
            
            <div className="flex items-center gap-2 mb-2">
                {PROSPECT_WIZARD_STEPS.map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= stepIndex ? 'bg-brand-500' : 'bg-slate-200'}`}></div>
                ))}
            </div>
            <div className="flex justify-between items-center text-xs font-medium uppercase tracking-wider text-slate-500">
                <span className="text-brand-600">{t(currentStep.titleKey)}</span>
                <span>{stepIndex + 1} / {totalSteps}</span>
            </div>
        </div>
        
        <Card className="min-h-[320px] flex flex-col justify-center py-10">
            <div className="flex-1 flex flex-col justify-center">
                
                {/* Step Content */}
                <div key={currentStep.id} className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <Heading level="h1" className="mb-2">{t(currentStep.titleKey)}</Heading>
                    <Text color="muted" size="lg" className="mb-8">{t(currentStep.descriptionKey)}</Text>
                    
                    {renderInput()}
                    {renderWarnings()}
                </div>

            </div>

            {/* Navigation Buttons */}
            <div className="pt-10 flex justify-between items-center">
                {stepIndex > 0 ? (
                    <Button 
                        variant="ghost"
                        onClick={handleBack}
                        icon={ChevronLeft}
                    >
                        {t('addProspect.buttons.back')}
                    </Button>
                ) : (
                    <div></div>
                )}
                
                <Button
                    variant={isLastStep ? 'secondary' : 'primary'}
                    size="lg"
                    onClick={handleNext}
                    disabled={currentStep.id === 'link' && !!warnings.link}
                    isLoading={createProspectMutation.isPending}
                    className="rounded-full shadow-lg"
                >
                    {isLastStep 
                        ? t('addProspect.buttons.finish') 
                        : (isCurrentStepEmpty() && !currentStep.required ? t('addProspect.buttons.skip') : t('addProspect.buttons.next'))
                    }
                    {isLastStep 
                        ? <Check size={18} className="ml-2" /> 
                        : (isCurrentStepEmpty() && !currentStep.required ? <SkipForward size={18} className="ml-2" /> : <ChevronRight size={18} className="ml-2" />)
                    }
                </Button>
            </div>
        </Card>
      </div>
    </Layout>
  );
};