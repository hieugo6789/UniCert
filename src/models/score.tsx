export type createScore = {
    userId: number;
    examId: number;
    questionRequests: Array<{ questionId: number; userAnswerId: number[]; }>;
};


export type score = {
    scoreId: number;
    userId: number;
    scoreValue:number;
    examId: number;
    createdAt: string;
}
