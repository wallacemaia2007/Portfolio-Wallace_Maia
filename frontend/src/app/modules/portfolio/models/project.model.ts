export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  category: ProjectCategory;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string;
  status: ProjectStatus;
  tags: string[];
  challenges?: string[];
  learnings?: string[];
  clientType?: ClientType;
}

export type ProjectCategory =
  | 'web'
  | 'mobile'
  | 'desktop'
  | 'backend'
  | 'frontend'
  | 'other';

export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'paused';

export type ClientType = 'freelance' | 'empresa' | 'pessoal' | 'open-source';

export const PROJECT_CATEGORY_NAMES: Record<ProjectCategory, string> = {
  web: 'Web',
  mobile: 'Mobile',
  desktop: 'Desktop',
  backend: 'Backend',
  frontend: 'Frontend',
  other: 'Outros',
};

export const PROJECT_STATUS_NAMES: Record<ProjectStatus, string> = {
  completed: 'Concluído',
  'in-progress': 'Em Andamento',
  planned: 'Planejado',
  paused: 'Pausado',
};

export const CLIENT_TYPE_NAMES: Record<ClientType, string> = {
  freelance: 'Freelance',
  empresa: 'Empresa',
  pessoal: 'Pessoal',
  'open-source': 'Open Source',
};

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  featured: boolean;
}

export interface Statistics {
  totalProjects: number;
  completedProjects: number;
  happyClients: number;
  yearsExperience: number;
  technologies: number;
  coffeesCups?: number;
}

export interface CategoryInfo {
  value: ProjectCategory | 'all';
  label: string;
  icon: string;
  count: number;
}
