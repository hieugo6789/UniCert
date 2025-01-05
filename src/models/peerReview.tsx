export interface createPeerReview {
  reviewedUserId: number;
  scoreId: number;
}
export interface peerReviewByExamId {
  peerReviewId: number;
  reviewedUserId: number;
  reviewedUserName: string;
  examName: string;
  scoreId: number;
  maxQuestionScore: number;
}
export interface peerReviewByScoreId {
  peerReviewId: number;
  reviewerId: number;
  reviewedUserId: number;
  reviewerName: string;
  scoreId: number;
  examName: string;
  scorePeerReviewer: number;
  feedbackPeerReviewer: string;
  reviewDate: Date;
  maxQuestionScore: number;
}
export interface peerReviewById {
  peerReviewId: number;
  reviewerId: number;
  reviewedUserId: number;
  scoreId: number;
  scorePeerReviewer: number;
  feedbackPeerReviewer: string;
  reviewDate: Date;
  maxQuestionScore: number;
  userAnswers: [
    {
      userAnswerId: number;
      questionId: number;
      questionName: string;
      scoreValue: number;
      answerContent: string;
      feedbackForEachQuestion: string;
    }
  ];
}
export interface updatePeerReview {
  reviewerId: number;
  feedbackPeerReviewer: string;
  peerReviewQuestionScores: {
    questionId: number;
    userAnswerId: number;
    feedBackForQuestion: string;
    scoreForQuestion: number;
  }[];
}
export interface deletePeerReview {
  reviewerId: number;
}
