export interface allVoucherPaginationData {
  voucherId: number;
  voucherName: string;
  voucherDescription: string;
  percentage: number;
  creationDate: Date;
  expiryDate: Date;
  voucherStatus: true;
  examId: number[];
  courseId: number[];
  examDetails: [
    {
      examId: number;
      examName: string;
      examCode: string;
      examFee: number;
    }
  ];
  courseDetails: [
    {
      courseId: number;
      courseName: string;
      courseCode: string;
      courseFee: number;
    }
  ];
}

export interface currentVoucher {
  voucherId: number;
  voucherName: string;
  voucherDescription: string;
  percentage: number;
  creationDate: Date;
  expiryDate: Date;
  voucherStatus: true;
  examId: number[];
  courseId: number[];
  examDetails: [
    {
      examId: number;
      examName: string;
      examCode: string;
      examFee: number;
    }
  ];
  courseDetails: [
    {
      courseId: number;
      courseName: string;
      courseCode: string;
      courseFee: number;
    }
  ];
}

export interface deleteVoucher {
  voucherId: number;
}
