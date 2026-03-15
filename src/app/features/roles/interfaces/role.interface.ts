export interface RolePage {
  content: Role[];
  pageable: PageableInfo;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: SortInfo;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export interface PageableInfo {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
