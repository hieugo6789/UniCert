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
}

export interface deleteExam {
  examId: number;
}
