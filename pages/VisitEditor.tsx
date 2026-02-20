import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/ui/Layout';
import { Card } from '../components/ui/Card';
import { useProspect, useAddVisit, useDeleteVisit } from '../hooks/useProspects';
import { Prospect, Visit } from '../types';
import { ArrowLeft, Save, Trash2, MapPin, FileText, ChevronRight, ChevronLeft, Check, CheckCircle2, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading, Text } from '../components/design/Typography';
import { Button } from '../components/design/Button';

// --- CONFIGURATION ---

type QuestionType = 'text' | 'boolean';
type CategoryType = 'environment' | 'building' | 'unit' | 'amenities';

interface QuestionConfig {
    id: string;
    category: CategoryType;
    type: QuestionType;
    translationKey: string;
}

const VISIT_QUESTIONS: QuestionConfig[] = [
    { id: 'env_vibe', category: 'environment', type: 'text', translationKey: 'visit.wizard.q_env_vibe' },
    { id: 'bld_condition', category: 'building', type: 'text', translationKey: 'visit.wizard.q_bld_condition' },
    { id: 'bld_elevator', category: 'building', type: 'boolean', translationKey: 'visit.wizard.q_bld_elevator' },
    { id: 'unit_condition', category: 'unit', type: 'text', translationKey: 'visit.wizard.q_unit_condition' },
    { id: 'unit_light', category: 'unit', type: 'boolean', translationKey: 'visit.wizard.q_unit_light' },
    { id: 'amenities_parking', category: 'amenities', type: 'boolean', translationKey: 'visit.wizard.q_amenities_parking' },
    { id: 'amenities_other', category: 'amenities', type: 'text', translationKey: 'visit.wizard.q_amenities_other' },
];

// --- WIZARD COMPONENT ---

interface WizardProps {
    onSave: (answers: Record<string, any>) => void;
    onCancel: () => void;
}

const ObservationWizard: React.FC<WizardProps> = ({ onSave, onCancel }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    
    // Derived state for the current question
    const currentQ = VISIT_QUESTIONS[step];
    const isLastStep = step === VISIT_QUESTIONS.length - 1;
    const currentAnswer = answers[currentQ.id];

    const handleNext = () => {
        if (isLastStep) {
            onSave(answers);
        } else {
            setStep(s => s + 1);
        }
    };

    const handleSkip = () => {
        // Save empty answer for this question
        setAnswers(prev => ({ ...prev, [currentQ.id]: '' }));
        handleNext();
    };

    const handleBack = () => {
        if (step > 0) setStep(s => s - 1);
    };

    const handleAnswer = (val: any) => {
        setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && currentQ.type !== 'text') {
            e.preventDefault();
            handleNext();
        }
    };

    // Calculate progress percentage
    const progress = ((step + 1) / VISIT_QUESTIONS.length) * 100;

    return (
        <div className="max-w-xl mx-auto py-8">
            {/* Header / Progress */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2 text-sm font-medium text-slate-500">
                    <span>{t('visit.wizard.step', { current: step + 1, total: VISIT_QUESTIONS.length })}</span>
                    <span className="text-brand-600 font-bold uppercase tracking-wider text-xs">{currentQ.category}</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-brand-500 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Question Card */}
            <Card className="min-h-[300px] flex flex-col justify-center relative overflow-hidden">
                <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-300" key={currentQ.id}>
                    <Heading level="h2" font="serif" className="mb-8 leading-tight">
                        {t(currentQ.translationKey)}
                    </Heading>

                    {/* Input Area */}
                    <div className="w-full">
                        {currentQ.type === 'text' && (
                            <textarea
                                value={currentAnswer || ''}
                                onChange={e => handleAnswer(e.target.value)}
                                className="w-full border-b-2 border-slate-300 focus:border-brand-500 bg-transparent py-2 text-xl outline-none resize-none placeholder:text-slate-300 transition-colors"
                                placeholder="..."
                                rows={2}
                                autoFocus
                            />
                        )}

                        {currentQ.type === 'boolean' && (
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleAnswer(true)}
                                    className={`flex-1 py-4 px-6 rounded-lg border-2 font-medium transition-all ${currentAnswer === true ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                                >
                                    {t('common.yes')}
                                </button>
                                <button
                                    onClick={() => handleAnswer(false)}
                                    className={`flex-1 py-4 px-6 rounded-lg border-2 font-medium transition-all ${currentAnswer === false ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                                >
                                    {t('common.no')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="pt-8 mt-auto flex justify-between items-center border-t border-slate-50">
                    <Button 
                        variant="ghost"
                        onClick={step === 0 ? onCancel : handleBack}
                    >
                        {step === 0 ? t('common.cancel') : t('common.back')}
                    </Button>
                    
                    <Button
                        variant={!currentAnswer && currentAnswer !== false ? 'secondary' : 'primary'}
                        onClick={!currentAnswer && currentAnswer !== false ? handleSkip : handleNext}
                        size="lg"
                        className="rounded-full shadow-lg"
                        icon={isLastStep ? CheckCircle2 : ChevronRight}
                    >
                        {isLastStep 
                            ? t('common.finish') 
                            : (!currentAnswer && currentAnswer !== false ? t('addProspect.buttons.skip') : t('common.next'))
                        }
                    </Button>
                </div>
            </Card>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---

export const VisitEditor: React.FC = () => {
    const { t } = useTranslation();
    const { id, visitId } = useParams<{ id: string, visitId: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const { data: prospect, isLoading } = useProspect(id || '');
    const addVisitMutation = useAddVisit();
    const deleteVisitMutation = useDeleteVisit();
    
    // Mode Logic
    const mode = searchParams.get('type') === 'schedule' ? 'schedule' : 'record';
    const isNew = visitId === 'new';

    // Schedule State
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [generalNote, setGeneralNote] = useState('');

    useEffect(() => {
        if (prospect) {
            // Pre-fill logic for edit mode or "Start Now"
            if (visitId && !isNew) {
                const v = prospect.visits.find(v => v.id === visitId);
                if (v) {
                    const d = new Date(v.date);
                    setDate(v.date.split('T')[0]); 
                    setTime(d.toTimeString().slice(0, 5));
                    setGeneralNote(v.generalNote || '');
                }
            } else {
                const now = new Date();
                now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
                setDate(now.toISOString().split('T')[0]);
                
                if (searchParams.get('type') === 'now') {
                    setTime(now.toTimeString().slice(0, 5));
                } else {
                    setTime('10:00');
                }
            }
        }
    }, [prospect, visitId, isNew, searchParams]);

    const handleScheduleSave = (e: React.FormEvent) => {
        e.preventDefault();
        saveAndNavigate({}); // Empty notes for schedule only
    };

    const handleWizardSave = (answers: Record<string, any>) => {
        // Transform wizard answers back into the 4 main categories
        const categorizedNotes: Record<CategoryType, string> = {
            environment: '',
            building: '',
            unit: '',
            amenities: ''
        };

        VISIT_QUESTIONS.forEach(q => {
            const answer = answers[q.id];
            if (answer !== undefined && answer !== '') {
                // Formatting the answer line
                let answerText = answer;
                if (typeof answer === 'boolean') {
                    answerText = answer ? t('common.yes') : t('common.no');
                }
                
                // Append to the category string
                const qText = t(q.translationKey);
                categorizedNotes[q.category] += `${qText}: ${answerText}\n`;
            }
        });

        // Trim trailing newlines
        (Object.keys(categorizedNotes) as CategoryType[]).forEach(key => {
            categorizedNotes[key] = categorizedNotes[key].trim();
        });

        saveAndNavigate(categorizedNotes);
    };

    const saveAndNavigate = (notes: any) => {
        if (!prospect || !date || !time) return;

        const visitDateTime = new Date(`${date}T${time}`);
        
        const visitPayload: Visit = {
            id: (visitId && !isNew) ? visitId : crypto.randomUUID(),
            date: visitDateTime.toISOString(),
            generalNote: generalNote || undefined,
            notes: notes,
            observations: [], // Initialize observations
            createdAt: new Date().toISOString()
        };

        addVisitMutation.mutate({ prospectId: prospect.id, visit: visitPayload }, {
            onSuccess: () => {
                navigate(`/prospect/${prospect.id}`);
            }
        });
    };

    const handleDelete = () => {
        if (visitId && !isNew && prospect && confirm(t('visit.deleteConfirm'))) {
            deleteVisitMutation.mutate({ prospectId: prospect.id, visitId }, {
                onSuccess: () => {
                    navigate(`/prospect/${prospect.id}`);
                }
            });
        }
    };

    if (isLoading) return (
        <Layout>
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="animate-spin text-brand-500" size={48} />
          </div>
        </Layout>
    );

    if (!prospect) return <Layout><div>{t('common.loading')}</div></Layout>;

    // RENDER LOGIC

    // 1. Observation Wizard Mode
    if (mode === 'record') {
        return (
            <Layout>
                <div className="mb-6 flex items-center justify-between max-w-xl mx-auto">
                    <Link to={`/prospect/${id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
                        <ArrowLeft size={16} /> {t('visit.back')}
                    </Link>
                </div>
                <ObservationWizard 
                    onSave={handleWizardSave} 
                    onCancel={() => navigate(`/prospect/${id}`)} 
                />
            </Layout>
        );
    }

    // 2. Simple Schedule Mode
    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <Link to={`/prospect/${id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
                        <ArrowLeft size={16} /> {t('visit.back')}
                    </Link>
                    {!isNew && (
                        <button onClick={handleDelete} className="text-red-500 hover:text-red-700 p-2">
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Heading level="h1" font="serif" className="mb-1">
                            {t('visit.titleNew')}
                        </Heading>
                        <Text color="muted" className="flex items-center gap-2">
                            <MapPin size={14} /> {prospect.nickname}
                        </Text>
                    </div>
                </div>

                <form onSubmit={handleScheduleSave} className="space-y-6">
                    <Card>
                        <Heading level="h3" font="sans" className="mb-4">{t('visit.schedule.title')}</Heading>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <Text size="xs" weight="bold" color="muted" className="uppercase mb-1">{t('visit.schedule.date')}</Text>
                                <input 
                                    type="date" 
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-slate-900 focus:border-brand-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <Text size="xs" weight="bold" color="muted" className="uppercase mb-1">{t('visit.schedule.time')}</Text>
                                <input 
                                    type="time" 
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-slate-900 focus:border-brand-500 outline-none"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <Text size="xs" weight="bold" color="muted" className="uppercase mb-1">{t('visit.schedule.generalNote')}</Text>
                            <div className="relative">
                                <FileText className="absolute top-3 left-3 text-slate-400" size={16} />
                                <input 
                                    type="text" 
                                    value={generalNote}
                                    onChange={e => setGeneralNote(e.target.value)}
                                    placeholder={t('visit.schedule.generalNotePlaceholder')}
                                    className="w-full border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 bg-white text-slate-900 focus:border-brand-500 outline-none"
                                />
                            </div>
                        </div>
                    </Card>

                    <div className="flex gap-4 pt-4 pb-20">
                         <Link to={`/prospect/${id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                                {t('common.cancel')}
                            </Button>
                         </Link>
                         <Button 
                            type="submit" 
                            disabled={addVisitMutation.isPending}
                            className="flex-1 shadow-lg"
                            icon={addVisitMutation.isPending ? Loader2 : Save}
                         >
                            {t('visit.save')}
                         </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};
