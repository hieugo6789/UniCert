export interface allNotificationData {
  notificationId: number;
  notificationName: string;
  notificationDescription: string;
  notificationImage: string;
  creationDate: Date;
  role: string;
  isRead: boolean;
  notificationType: string;
  notificationTypeId: number;
}
export interface currentNotification {
  notificationId: number;
  notificationName: string;
  notificationDescription: string;
  notificationImage: string;
  creationDate: Date;
  role: string;
  isRead: boolean;
  notificationType: string;
  notificationTypeId: number;
}

export interface deleteNotification {
  notificationId: number;
}
