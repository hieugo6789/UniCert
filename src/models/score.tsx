export interface createScore {
    userId: number,
    examId: number,
    questionRequests: [
        {
            questionId: number,
            userAnswerId: [
                number
            ]
        }
    ]
}
