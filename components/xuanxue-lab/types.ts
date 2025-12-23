export interface FiveElement {
  subject: string;
  A: number;
  fullMark: number;
  note: string;
}

export interface SentimentCompareData {
  time: string;
  quant: number;
  cultural: number;
}

export interface IndustryMapping {
  name: string;
  element: string;
  style: string;
}

export interface HexagramData {
  name: string;
  symbol: boolean[]; // Yang is true, Yin is false
  tags: string[];
  energyLevel: number; // 0-100
  status: string;
}

export interface CulturalDate {
  year: string;
  month: string;
  day: string;
  season: string;
}
