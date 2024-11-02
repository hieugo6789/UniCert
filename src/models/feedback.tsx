export interface feedbackPagination {
  feedbackId: number;
  feedbackDescription: string;
  userId: number;
  examId: number;
  feedbackCreatedAt: Date;
  feedbackImage: string;
}
export interface currentFeedback {
  feedbackId: number;
  feedbackDescription: string;
  userId: number;
  examId: number;
  feedbackCreatedAt: Date;
  feedbackImage: string;
}
export interface createFeedback {}
export interface updateFeedback {}
