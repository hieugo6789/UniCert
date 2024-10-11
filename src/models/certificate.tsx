export interface allCertificationData {
  certId: string;
  certName: string;
  certCode: string;
  certDescription: string;
  certCost: number;
  certPointSystem: string;
  certImage: string;
  expiryDate: Date;
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
  expiryDate: Date;
  certPrerequisite: [];
  certCodePrerequisite: [];
  certDescriptionPrerequisite: [];
}

export interface deleteCertificate {
  certId: string;
}
