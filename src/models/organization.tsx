export interface allOrganizationPaginationData {
  organizeId: string;
  organizeName: string;
  organizeAddress: string;
  organizeContact: string;
}

export interface currentOrganization {
  organizeId: string;
  organizeName: string;
  organizeAddress: string;
  organizeContact: string;
}
export interface createOrganizationModel {
  organizeName: string;
  organizeAddress: string;
  organizeContact: string;
}

export interface updateOrganize {
  organizeName: string;
  organizeAddress: string;
  organizeContact: string;
}

export interface deleteOrganize {
  organizeId: string;
}
