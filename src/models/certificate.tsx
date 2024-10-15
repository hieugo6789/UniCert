export interface allCertificationData {
  certId: string;
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
  certPrerequisiteId: [];
  certPrerequisite: [];
  certCodePrerequisite: [];
  certDescriptionPrerequisite: [];
}
export interface currentCertificate {
  certId: string;
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
  certPrerequisiteId: [];
  certPrerequisite: [];
  certCodePrerequisite: [];
  certDescriptionPrerequisite: [];
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
}

export interface deleteCertificate {
  certId: string;
}
