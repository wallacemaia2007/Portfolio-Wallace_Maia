export interface Skill {
  id: string;
  name: string;
  category: SkillCategoryType;
  level: 1 | 2 | 3 | 4 | 5;
  yearsOfExperience?: number;
  icon?: string;
  color?: string;
}

export interface SkillGroup {
  category: SkillCategoryType;
  categoryName: string;
  icon?: string;
  skills: Skill[];
}

export type SkillCategoryType =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'tools'
  | 'soft-skills';

export const SKILL_CATEGORY_NAMES: Record<SkillCategoryType, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Banco de Dados',
  tools: 'Ferramentas',
  'soft-skills': 'Soft Skills',
};

export const SKILL_CATEGORY_ICONS: Record<SkillCategoryType, string> = {
  frontend: 'web',
  backend: 'dns',
  database: 'storage',
  tools: 'build',
  'soft-skills': 'people',
};
