export interface feedbackPagination {
  feedbackId: number;
  feedbackDescription: string;
  userId: number;
  examId: number;
  feedbackCreatedAt: Date;
  feedbackImage?: string;
  feedbackPermission: boolean;
  examPermission: string;
  feedbackRatingvalue: number;
  userDetails: {
    userId: number;
    username: string;
    userImage?: string;
  };
}
export interface currentFeedback {
  feedbackId: number;
  feedbackDescription: string;
  userId: number;
  examId: number;
  feedbackCreatedAt: Date;
  feedbackImage: string;
  feedbackPermission: boolean;
  examPermission: string;
  feedbackRatingvalue: number;
  userDetails: {
    userId: number;
    username: string;
    userImage: string;
  };
}
export interface createFeedback {
  userId: string;
  examId: number;
  feedbackRatingvalue: number;
  feedbackDescription: string;
  feedbackImage: string;
  feedbackCreatedAt: Date;
}
export interface updateFeedback {
  feedbackDescription: string;
  feedbackRatingvalue: number;
  feedbackImage: string;
}


export interface deleteFeedback {
  feedbackId: number;
}
