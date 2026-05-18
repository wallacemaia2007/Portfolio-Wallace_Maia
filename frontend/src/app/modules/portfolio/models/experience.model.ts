export interface ExperienceHighlight {
  title: string;
  impact: string;
  impactEn: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  positionEn?: string;
  description: string;
  descriptionEn: string;
  highlights: ExperienceHighlight[];
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  type: ExperienceType;
  technologies: string[];
  companyLogo?: string;
  companyUrl?: string;
}

export type ExperienceType =
  | 'full-time'
  | 'part-time'
  | 'freelance'
  | 'internship'
  | 'contract';

export const EXPERIENCE_TYPE_NAMES: Record<ExperienceType, string> = {
  'full-time': 'Tempo Integral',
  'part-time': 'Meio Período',
  freelance: 'Freelance',
  internship: 'Estágio',
  contract: 'Contrato',
};

export const EXPERIENCE_TYPE_NAMES_EN: Record<ExperienceType, string> = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  freelance: 'Freelance',
  internship: 'Internship',
  contract: 'Contract',
};
