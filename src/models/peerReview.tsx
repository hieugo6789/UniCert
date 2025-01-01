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
  maxQuestionScore: 10;
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
