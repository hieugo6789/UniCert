export interface allCertificationData {
  certId: number;
  certName: string;
  certCode: string;
  certDescription: string;
  certCost: number;
  certPointSystem: string;
  certImage: string;
  certValidity: string;
  organizeId: number;
  organizeName: string;
  typeId: number;
  typeName: string;
  permission: string;
  certPrerequisiteId: [];
  certPrerequisite: [];
  certCodePrerequisite: [];
  certDescriptionPrerequisite: [];
  certSubsequentIds: [];
  certSubsequentNames: [];
  jobPositionIds: [];
  jobPositionCodes: [];
  jobPositionNames: [];
  jobPositionDescriptions: [];
  majorIds: [];
  majorCodes: [];
  majorNames: [];
  majorDescriptions: [];
}
export interface currentCertificate {
  certId: number;
  certName: string;
  certCode: string;
  certDescription: string;
  certCost: number;
  certPointSystem: string;
  certImage: string;
  certValidity: string;
  organizeId: number;
  organizeName: string;
  typeId: number;
  typeName: string;
  permission: string;
  certPrerequisiteId: [];
  certPrerequisite: [];
  certCodePrerequisite: [];
  certDescriptionPrerequisite: [];
  certSubsequentIds: [];
  certSubsequentNames: [];
  jobPositionIds: [];
  jobPositionCodes: [];
  jobPositionNames: [];
  jobPositionDescriptions: [];
  majorIds: [];
  majorCodes: [];
  majorNames: [];
  majorDescriptions: [];
}
export interface allCertification {
  certId: number;
  certName: string;
}
export interface createCertificate {
  certName: string;
  certCode: string;
  certDescription: string;
  certCost: number;
  certPointSystem: string;
  certImage: string;
  certValidity: string;
  typeId: number;
  organizeId: number;
  certIdPrerequisites: number[];
  majorIds: number[];
  jobIds: number[];
}

export interface updateCert {
  certName: string;
  certCode: string;
  certDescription: string;
  certCost: number;
  certPointSystem: string;
  certImage: string;
  certValidity: string;
  typeId: number;
  organizeId: number;
  certIdPrerequisites: number[];
  majorIds: number[];
  jobIds: number[];
}

export interface deleteCertificate {
  certId: number;
}

export interface cardCertificate {
  certId: number;
  certName: string;
  certCode: string;
  certDescription: string;
  certImage: string;
  certValidity: string;
  organizeName: string;
  typeName: string;
}

export interface metaData {
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
