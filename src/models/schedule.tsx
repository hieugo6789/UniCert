export interface allSchedulePaginationData {
  sessionId: number;
  sessionName: string;
  sessionCode: string;
  sessionDate: Date;
  sessionAddress: string;
  certId: string;
  sessionTime: string;
  sessionCreatedAt: Date;
}

export interface currentSchedule {
  sessionId: number;
  sessionName: string;
  sessionCode: string;
  sessionDate: Date;
  sessionAddress: string;
  certId: string;
  sessionTime: string;
  sessionCreatedAt: Date;
}
export interface scheduleInput {
  sessionName: number;
  sessionCode: string;
  sessionDate: Date;
  sessionAddress: string;
  certId: string;
  sessionTime: string;
  sessionCreatedAt: Date;
}

export interface deleteSchedule {
  sessionId: number;
}
