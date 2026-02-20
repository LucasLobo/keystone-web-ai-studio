import { Prospect, ProspectStatus } from '../types';

export interface GuidanceRule {
  id: string;
  priority: number;
  check: (prospect: Prospect) => boolean;
  messageKey: string;
  actionKey?: string;
  actionPath?: (prospect: Prospect) => string;
  actionType?: 'navigate' | 'update';
  updatePayload?: Partial<Prospect>;
}

export const GUIDANCE_RULES: GuidanceRule[] = [
  {
    id: 'missing_details',
    priority: 100, // Highest priority
    check: (p) => {
      const d = p.details;
      // Check if all key details are missing/empty
      return !d?.rooms && !d?.bathrooms && !d?.grossArea && !d?.floor;
    },
    messageKey: 'prospect.guidance.missingDetails',
    actionKey: 'prospect.guidance.addDetails',
    actionType: 'navigate', // In reality, we might just want to scroll or focus, but for now let's just show the message
    actionPath: (p) => `/prospect/${p.id}#details` // We can handle hash scrolling later or just assume user sees it
  },
  {
    id: 'schedule_visit',
    priority: 50,
    check: (p) => p.status === ProspectStatus.UnderReview && p.visits.length === 0,
    messageKey: 'prospect.guidance.scheduleVisit',
    actionKey: 'prospect.guidance.doIt',
    actionType: 'navigate',
    actionPath: (p) => `/prospect/${p.id}/visit/new?type=schedule`
  },
  {
    id: 'add_traits',
    priority: 40,
    check: (p) => p.status === ProspectStatus.Visited && p.traits.length === 0,
    messageKey: 'prospect.guidance.addTraits',
    actionKey: 'prospect.guidance.doIt',
    actionType: 'navigate',
    actionPath: (p) => `/prospect/${p.id}#evaluation`
  },
  {
    id: 'decision_pending',
    priority: 30,
    check: (p) => p.status === ProspectStatus.Interesting,
    messageKey: 'prospect.guidance.decisionPending',
    actionKey: 'prospect.guidance.doIt',
    actionType: 'update',
    updatePayload: { status: ProspectStatus.DecisionPending }
  }
];

export const getActiveGuidance = (prospect: Prospect): GuidanceRule | null => {
  // Sort by priority desc
  const sorted = [...GUIDANCE_RULES].sort((a, b) => b.priority - a.priority);
  return sorted.find(rule => rule.check(prospect)) || null;
};
