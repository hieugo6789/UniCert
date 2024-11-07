export interface allSchedulePaginationData {
  sessionId: number;
  sessionName: string;
  sessionCode: string;
  sessionDate: Date;
  sessionAddress: string;
  certId: number;
  sessionTime: string;
  sessionCreatedAt: Date;
}

export interface currentSchedule {
  sessionId: number;
  sessionName: string;
  sessionCode: string;
  sessionDate: Date;
  sessionAddress: string;
  certId: number;
  sessionTime: string;
  sessionCreatedAt: Date;
}
export interface scheduleInput {
  sessionName: string;
  sessionCode: string;
  sessionDate: Date;
  sessionAddress: string;
  certId: number;
  sessionTime: string;
  sessionCreatedAt: Date;
}

export interface deleteSchedule {
  sessionId: number;
}

export interface updateSchedule {
  sessionName: string;
  sessionCode: string;
  sessionDate: Date;
  sessionAddress: string;
  sessionTime: string;
}
