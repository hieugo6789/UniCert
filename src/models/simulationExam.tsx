export interface allExamPaginationData {
  examId: number;
  examName: string;
  examCode: string;
  certId: number;
  examDescription: string;
  examFee: number;
  examDiscountFee: number;
  examImage: string;
  examPermission: string;
}
export interface currentExam {
  examId: number;
  examName: string;
  examCode: string;
  certId: number;
  examDescription: string;
  examFee: number;
  examDiscountFee: number;
  examImage: string;
  examPermission: string;
}

export interface currentExamDetail {
  examId: number;
  examName: string;
  examCode: string;
  certId: number;
  examDescription: string;
  examFee: number;
  examDiscountFee: number;
  examImage: string;
  examPermission: string;
  listQuestions: [
    {
      questionId: number;
      questionName: string;
      answers: [
        {
          answerId: number;
          answerText: string;
        }
      ];
    }
  ];
  certificationDetails: [
    {
      certId: number;
      certName: string;
      certCode: string;
      certDescription: string;
      certImage: string;
      typeName: string;
      organizeName: string;
      certValidity: string;
    }
  ];
  voucherDetails: [
    {
      voucherId: number;
      voucherName: string;
      voucherDescription: string;
      percentage: number;
      creationDate: Date;
      expiryDate: Date;
      voucherStatus: boolean;
    }
  ];
}

export interface createExam {
  examName: string;
  examCode: string;
  certId: number;
  examDescription: string;
  examFee: number;
  voucherIds: number[];
  examImage: string;
}

export interface deleteExam {
  examId: number;
}

export interface updateExam {
  examName: string;
  examCode: string;
  certId: number;
  examDescription: string;
  examFee: number;
  voucherIds: number[];
  examImage: string;
}
