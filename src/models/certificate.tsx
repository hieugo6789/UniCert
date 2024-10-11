export interface allCertificationData {
  certId: string;
  certName: string;
  certCode: string;
  certDescription: string;
  certCost: number;
  certPointSystem: string;
  certImage: string;
  certValidity: string;
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
  certPrerequisite: [];
  certCodePrerequisite: [];
  certDescriptionPrerequisite: [];
}

export interface deleteCertificate {
  certId: string;
}
