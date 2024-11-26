export interface allOrganizationPaginationData {
  organizeId: string;
  organizeName: string;
  organizeAddress: string;
  organizeContact: string;
  organizePermission: string;
  certificationDetails: [
    {
      certId: number;
      certName: string;
      certCode: string;
      certDescription: string;
      certImage: string;
      typeName: string;
      organizeName: string;
      certValidity: string;
      permission: string;
    }
  ];
}

export interface currentOrganization {
  organizeId: string;
  organizeName: string;
  organizeAddress: string;
  organizeContact: string;
  organizePermission: string;
  certificationDetails: [
    {
      certId: number;
      certName: string;
      certCode: string;
      certDescription: string;
      certImage: string;
      typeName: string;
      organizeName: string;
      certValidity: string;
      permission: string;
    }
  ];
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
