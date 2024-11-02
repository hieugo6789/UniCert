export interface allJobPaginationData {
  jobPositionId: string;
  jobPositionCode: string;
  jobPositionName: string;
  jobPositionDescription: string;
  jobPositionPermission: string;
  majorDetails: [
    {
      majorId: number;
      majorCode: string;
      majorName: string;
      majorDescription: string;
      majorPermission: string;
    }
  ];
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

export interface currentJob {
  jobPositionId: string;
  jobPositionCode: string;
  jobPositionName: string;
  jobPositionDescription: string;
  jobPositionPermission: string;
  majorDetails: [
    {
      majorId: number;
      majorCode: string;
      majorName: string;
      majorDescription: string;
      majorPermission: string;
    }
  ];
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

export interface createJobInput {
  jobPositionCode: string;
  jobPositionName: string;
  jobPositionDescription: string;
  majorId: number[];
  certId: number[];
}

export interface updateJobInput {
  jobPositionCode: string;
  jobPositionName: string;
  jobPositionDescription: string;
  majorId: number[];
  certId: number[];
}

export interface deleteJob {
  jobPositionId: string;
}
