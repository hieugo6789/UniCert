export interface feedbackPagination {
  feedbackId: number;
  feedbackDescription: string;
  userId: number;
  examId: number;
  feedbackCreatedAt: Date;
  feedbackImage: string;
  userDetails: {
    userId: number;
    username: string;
    userImage: string;
  };
}
export interface currentFeedback {
  feedbackId: number;
  feedbackDescription: string;
  userId: number;
  examId: number;
  feedbackCreatedAt: Date;
  feedbackImage: string;
  userDetails: {
    userId: number;
    username: string;
    userImage: string;
  };
}
export interface createFeedback {
  userId: string;
  examId: number;
  feedbackDescription: string;
  feedbackImage: string;
  feedbackCreatedAt: Date;
}
export interface updateFeedback {
  feedbackDescription: string;
  feedbackImage: string;
}

export interface deleteFeedback {
  feedbackId: number;
}
