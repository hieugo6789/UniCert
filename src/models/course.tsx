export interface allCoursePaginationData {
  courseId: string;
  courseName: string;
  courseCode: string;
  courseTime: string;
  courseDescription: string;
  courseFee: number;
  courseDiscountFee: number;
  courseImage: string;
  certId: string;
}

export interface currentCourse {
  courseId: string;
  courseName: string;
  courseCode: string;
  courseTime: string;
  courseDescription: string;
  courseFee: number;
  courseDiscountFee: number;
  courseImage: string;
  certId: string;
}

export interface deleteCourse {
  courseId: string;
}
