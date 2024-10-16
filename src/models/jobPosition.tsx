export interface allJobPaginationData {
  jobPositionId: string;
  jobPositionCode: string;
  jobPositionName: string;
  jobPositionDescription: string;
  majorId: number[];
  majorName?: string[];
  certId: number[];
}

export interface currentJob {
  jobPositionId: string;
  jobPositionCode: string;
  jobPositionName: string;
  jobPositionDescription: string;
  majorId: number[];
  certId: number[];
}

export interface createJobInput {
  jobPositionCode: string;
  jobPositionName: string;
  jobPositionDescription: string;
  majorId: number[];
  certId: number[];
}

export interface deleteJob {
  jobPositionId: string;
}
