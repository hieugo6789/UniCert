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
}

export interface MajorInput {
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionId: number[];
}

export interface UpdateMajor {
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionId: number[];
}

export interface deleteMajor {
  majorId: string;
}
