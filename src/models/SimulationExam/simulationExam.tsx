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
  duration: number;
  questionCount: number;
  feedbackCount: number;
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
      permission: string;
    }
  ];
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
  duration: number;
  questionCount: number;
  feedbackCount: number;
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
      permission: string;
    }
  ];
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
  duration: number;
  questionCount: number;
  feedbackCount: number;
  listQuestions: [
    {
      questionId: number;
      questionName: string;
      answers: [
        {
          answerId: number;
          answerText: string;
          isCorrect: boolean;
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
      permission: string;
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
  passingScore: number;
  voucherIds: number[];
  examImage: string;
  duration: number;
  questionCount: number;
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
  duration: number;
  questionCount: number;
}
