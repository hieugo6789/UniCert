export interface allMajorPaginationData {
  majorId: string;
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionId: number[];
}
export interface currentMajor {
  majorId: string;
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionId: number[];
}

export interface MajorInput {
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionId: number[];
}

export interface deleteMajor {
  majorId: string;
}
