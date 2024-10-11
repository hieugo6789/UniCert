export interface PagingParamWithoutID {
  page: number;
  limit: number;
  search: string;
}

export interface allTotalPaginationData {
  id: string;
  totalAccount: number;
}

export interface DetailParam {
  id: string | undefined;
}
