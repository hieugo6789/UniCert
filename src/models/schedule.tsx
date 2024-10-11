export interface allSchedulePaginationData {
  sessionId: string;
  sessionName: string;
  sessionCode: string;
  sessionDate: Date;
  sessionAddress: string;
  certId: string;
  sessionCreatedAt: Date;
}

export interface currentSchedule {
  sessionId: string;
  sessionName: string;
  sessionCode: string;
  sessionDate: Date;
  sessionAddress: string;
  certId: string;
  sessionCreatedAt: Date;
}
export interface scheduleInput {
  sessionName: string;
  sessionCode: string;
  sessionDate: Date;
  sessionAddress: string;
  certId: string;
  sessionCreatedAt: Date;
}
