export interface allMajorPaginationData {
  majorId: string;
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionDetails: [
    {
      jobPositionId: number;
      jobPositionCode: string;
      jobPositionName: string;
      jobPositionDescription: string;
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
    }
  ];
}
export interface currentMajor {
  majorId: string;
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionDetails: [
    {
      jobPositionId: number;
      jobPositionCode: string;
      jobPositionName: string;
      jobPositionDescription: string;
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
    }
  ];
}

export interface MajorInput {
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionId: number[];
  certId: number[];
}

export interface UpdateMajor {
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionId: number[];
  certId: number[];
}

export interface deleteMajor {
  majorId: string;
}
