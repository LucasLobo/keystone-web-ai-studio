export enum ProspectStatus {
  UnderReview = "Under Review",
  Visited = "Visited",
  Interesting = "Interesting",
  DecisionPending = "Decision Pending",
  OfferPrep = "Offer Prep",
  OfferSubmitted = "Offer Submitted",
  OfferDeclined = "Offer Declined",
  Withdrawn = "Withdrawn",
  Archived = "Archived"
}

export interface ListingLink {
  id: string;
  url: string;
  domain: string;
  createdAt: string;
}

export interface PriceEntry {
  id: string;
  value: number;
  effectiveAt: string;
  createdAt: string;
}

export interface Trait {
  id: string;
  label: string;
  text: string;
  sentiment: 'Positive' | 'Negative';
  createdAt: string;
}

export interface ProspectDetail {
  rooms?: number;
  bathrooms?: number;
  grossArea?: number;
  netArea?: number;
  floor?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Observation {
  id: string;
  label: string;
  type: 'FreeText' | 'Choice' | 'Rating';
  value: string | number | boolean;
  createdAt: string;
}

export interface Visit {
  id: string;
  date: string; // ISO Date String
  generalNote?: string; // New field for scheduling notes
  notes: {
    environment?: string;
    building?: string;
    unit?: string;
    amenities?: string;
  };
  observations: Observation[]; // New extensible observations
  createdAt: string;
}

export interface Prospect {
  id: string;
  nickname: string;
  location?: string;
  note?: string;
  status: ProspectStatus;
  links: ListingLink[];
  priceHistory: PriceEntry[];
  traits: Trait[];
  visits: Visit[];
  details: ProspectDetail; // Added details
  createdAt: string;
  updatedAt: string;
}

export type CreateProspectDTO = {
  nickname: string;
  location?: string;
  initialPrice?: number;
  initialLink?: string;
  initialNote?: string;
}