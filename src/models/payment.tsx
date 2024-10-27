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
}

export interface createPayment {
  userId: string;
  examEnrollmentId: number;
  courseEnrollmentId: number;
}
