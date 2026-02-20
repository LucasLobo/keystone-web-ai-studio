import { Prospect, CreateProspectDTO, Visit } from '../types';
import * as storage from './storage';

// Simulate network latency
const DELAY = 500;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
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
