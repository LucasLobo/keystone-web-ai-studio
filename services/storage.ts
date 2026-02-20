import { Prospect, CreateProspectDTO, ProspectStatus, PriceEntry, Visit } from '../types';
import { normalizeUrl, extractDomain } from '../utils/url';

const STORAGE_KEY = 'keystone_prospects';

// --- Storage Operations ---

export const getProspects = (): Prospect[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProspect = (dto: CreateProspectDTO): Prospect => {
  const prospects = getProspects();
  
  const newProspect: Prospect = {
    id: crypto.randomUUID(),
    nickname: dto.nickname,
    location: dto.location,
    note: dto.initialNote,
    status: ProspectStatus.UnderReview,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    links: [],
    priceHistory: [],
    traits: [],
    visits: [],
    details: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };

  if (dto.initialLink) {
    const normalized = normalizeUrl(dto.initialLink);
    const domain = extractDomain(normalized);
    
    newProspect.links.push({
      id: crypto.randomUUID(),
      url: normalized,
      domain,
      createdAt: new Date().toISOString()
    });
  }

  if (dto.initialPrice) {
    newProspect.priceHistory.push({
      id: crypto.randomUUID(),
      value: dto.initialPrice,
      effectiveAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    });
  }

  const updatedProspects = [newProspect, ...prospects];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProspects));
  return newProspect;
};

export const updateProspect = (updated: Prospect): void => {
  const prospects = getProspects();
  const index = prospects.findIndex(p => p.id === updated.id);
  if (index !== -1) {
    updated.updatedAt = new Date().toISOString();
    prospects[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prospects));
  }
};

export const deleteProspect = (id: string): void => {
  const prospects = getProspects();
  const filtered = prospects.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const addPriceEntry = (prospect: Prospect, newPrice: number, dateStr: string): Prospect => {
  let newHistory = [...prospect.priceHistory];

  // Check if an entry already exists for this date (YYYY-MM-DD comparison)
  const existingIndex = newHistory.findIndex(p => p.effectiveAt.split('T')[0] === dateStr);

  if (existingIndex > -1) {
    // Update existing entry
    newHistory[existingIndex] = {
      ...newHistory[existingIndex],
      value: newPrice
    };
  } else {
    // Add new entry
    const entry: PriceEntry = {
      id: crypto.randomUUID(),
      value: newPrice,
      effectiveAt: new Date(dateStr).toISOString(),
      createdAt: new Date().toISOString()
    };
    newHistory.push(entry);
  }

  // Always sort history by date ascending
  newHistory.sort((a, b) => new Date(a.effectiveAt).getTime() - new Date(b.effectiveAt).getTime());

  const updated = {
    ...prospect,
    priceHistory: newHistory
  };
  updateProspect(updated);
  return updated;
};

export const saveVisit = (prospectId: string, visit: Visit): void => {
  const prospect = getProspectById(prospectId);
  if (!prospect) return;

  const existingIdx = prospect.visits.findIndex(v => v.id === visit.id);
  let updatedVisits = [...prospect.visits];
  
  if (existingIdx >= 0) {
    updatedVisits[existingIdx] = visit;
  } else {
    updatedVisits.push(visit);
  }

  // Sort visits by date descending
  updatedVisits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  updateProspect({
    ...prospect,
    visits: updatedVisits
  });
};

export const deleteVisit = (prospectId: string, visitId: string): void => {
  const prospect = getProspectById(prospectId);
  if (!prospect) return;
  
  updateProspect({
    ...prospect,
    visits: prospect.visits.filter(v => v.id !== visitId)
  });
};

export const checkDuplicateLink = (url: string): Prospect | undefined => {
  if (!url) return undefined;
  const targetNormalized = normalizeUrl(url);
  const prospects = getProspects();
  
  return prospects.find(p => p.links.some(l => {
     // Check if stored URL matches, or if normalized versions match
     return l.url === url || normalizeUrl(l.url) === targetNormalized;
  }));
};

export const checkDuplicateNickname = (nickname: string): boolean => {
  const prospects = getProspects();
  return prospects.some(p => p.nickname.trim().toLowerCase() === nickname.trim().toLowerCase());
};

export const getProspectById = (id: string): Prospect | undefined => {
  return getProspects().find(p => p.id === id);
};