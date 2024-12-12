export type createScore = {
    userId: number;
    examId: number;
    questionRequests: Array<{
        questionId: number;
        userAnswerId: number[];
        userAnswerText: string;
    }>;
};


export type score = {
    scoreId: number;
    userId: number;
    scoreValue:number;
    examId: number;
    createdAt: string;
}
