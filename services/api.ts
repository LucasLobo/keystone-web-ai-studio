import { Prospect, CreateProspectDTO, Visit, User } from '../types';
import * as storage from './storage';

// Simulate network latency
const DELAY = 500;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    me: async (): Promise<User | null> => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          return data.user;
        }
        return null;
      } catch (error) {
        return null;
      }
    },
    getGoogleUrl: async (redirectUri: string): Promise<{ url: string }> => {
      const res = await fetch(`/api/auth/google/url?redirect_uri=${encodeURIComponent(redirectUri)}`);
      return res.json();
    },
    devLogin: async (): Promise<{ user: User }> => {
      const res = await fetch('/api/auth/dev-login', { method: 'POST' });
      return res.json();
    },
    logout: async (): Promise<void> => {
      await fetch('/api/auth/logout', { method: 'POST' });
    }
  },
  prospects: {
    list: async (): Promise<Prospect[]> => {
      await delay(DELAY);
      return storage.getProspects();
    },
    get: async (id: string): Promise<Prospect | undefined> => {
      await delay(DELAY);
      return storage.getProspectById(id);
    },
    create: async (dto: CreateProspectDTO): Promise<Prospect> => {
      await delay(DELAY);
      return storage.saveProspect(dto);
    },
    update: async (prospect: Prospect): Promise<Prospect> => {
      await delay(DELAY);
      storage.updateProspect(prospect);
      return prospect;
    },
    delete: async (id: string): Promise<void> => {
      await delay(DELAY);
      storage.deleteProspect(id);
    }
  },
  visits: {
    // In a real backend, visits might be a sub-resource: /prospects/:id/visits
    // For now, we update the whole prospect as per DDD aggregate rules
    add: async (prospectId: string, visit: Visit): Promise<void> => {
      await delay(DELAY);
      storage.saveVisit(prospectId, visit);
    },
    delete: async (prospectId: string, visitId: string): Promise<void> => {
      await delay(DELAY);
      storage.deleteVisit(prospectId, visitId);
    }
  }
};
