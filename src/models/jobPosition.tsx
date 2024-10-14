export interface allJobPaginationData {
  jobPositionId: string;
  jobPositionCode: string;
  jobPositionName: string;
  jobPositionDescription: string;
  majorId: string[];
  majorName?: string[];
  certId: string[];
}

export interface currentJob {
  jobPositionId: string;
  jobPositionCode: string;
  jobPositionName: string;
  jobPositionDescription: string;
  majorId: string[];
  certId: string[];
}

export interface deleteJob {
  jobPositionId: string;
}
