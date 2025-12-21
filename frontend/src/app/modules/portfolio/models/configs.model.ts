import { ClientType, ProjectCategory, ProjectStatus } from './project.model';

export interface ProjectFilters {
  category?: ProjectCategory | 'all';
  technology?: string;
  search?: string;
  featured?: boolean;
  status?: ProjectStatus;
  clientType?: ClientType;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
