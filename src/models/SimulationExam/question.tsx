export interface currentQuestion {
  questionId: number;
  questionName: string;
  examId: number;
  questionType: number;
  answers: [
    {
      answerId: number;
      text: string;
      isCorrect: boolean;
    }
  ];
}

export interface createQuestion {
  questionName: string;
  examId: number;
  questionType: number;
  answers: {
    text: string;
    isCorrect: boolean;
  }[];
}
export interface deleteQuestion {
  questionId: number;
}

export interface updateQuestion {
  questionName: string;
  examId: number;
  answers: {
    text: string;
    isCorrect: boolean;
  }[];
}
