export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  type: ExperienceType;
  technologies: string[];
  achievements: string[];
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
