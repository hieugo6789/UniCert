export type createScore = {
    userId: number;
    examId: number;
    questionRequests: Array<{ questionId: number; userAnswerId: number[]; }>;
};
