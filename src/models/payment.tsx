export interface currentPayment {
  paymentId: number;
  paymentDate: Date;
  paymentPoint: number;
  paymentMethod: string;
  paymentStatus: string;
  walletId: number;
  examEnrollmentId: number;
  courseEnrollmentId: number;
}

export interface courseEnrollmentPayment {
  paymentId: number;
  paymentDate: Date;
  paymentPoint: number;
  paymentMethod: string;
  paymentStatus: string;
  walletId: number;
  examEnrollmentId: number;
  courseEnrollmentId: number;
}
export interface examEnrollmentPayment {
  paymentId: number;
  paymentDate: Date;
  paymentPoint: number;
  paymentMethod: string;
  paymentStatus: string;
  walletId: number;
  examEnrollmentId: number;
  courseEnrollmentId: number;
}

export interface createPayment {
  userId: string;
  examEnrollmentId: number;
  courseEnrollmentId: number;
}

export interface payNow {
  userId: number;
  simulation_Exams: number[];
  courses: number[];
  voucherIds: number[];
}
