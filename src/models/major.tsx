export interface allMajorPaginationData {
  majorId: string;
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionId: string[];
}
export interface currentMajor {
  majorId: string;
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionId: string[];
}

export interface MajorInput {
  majorCode: string;
  majorName: string;
  majorDescription: string;
  jobPositionId: string[];
}

export interface deleteMajor {
  majorId: string;
}
