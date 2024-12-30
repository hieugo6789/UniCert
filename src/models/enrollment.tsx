export interface currentExamEnrollment {
  examEnrollmentId: number;
  examEnrollmentDate: Date;
  examEnrollmentStatus: string;
  totalPrice: number;
  userId: string;
  simulationExamDetail: [
    {
      examId: number;
      examName: string;
      examCode: string;
      examFee: number;
      examDiscountFee: number;
      examImage: string;
      examDescription: string;
      examPermission: string;
    }
  ];
}
export interface examEnrollment {
  examEnrollmentId: number;
  examEnrollmentDate: Date;
  examEnrollmentStatus: string;
  totalPrice: number;
  totalPriceVoucher:number;
  userId: string;
  simulationExamDetail: [
    {
      examId: number;
      examName: string;
      examCode: string;
      examFee: number;
      examDiscountFee: number;
      examImage: string;
      examDescription: string;
      examPermission: string;
    }
  ];
}
export interface currentCourseEnrollment {
  courseEnrollmentId: number;
  courseEnrollmentDate: Date;
  courseEnrollmentStatus: string;
  totalPrice: number;
  userId: string;
  enrollCode: string;
  courseDetails: [
    {
      courseId: number;
      courseName: string;
      courseCode: string;
      courseFee: number;
      courseDiscountFee: number;
      courseImage: string;
    }
  ];
}
export interface courseEnrollment {
  courseEnrollmentId: number;
  courseEnrollmentDate: Date;
  courseEnrollmentStatus: string;
  totalPrice: number;
  userId: string;
  enrollCode: string;
  courseDetails: [
    {
      courseId: number;
      courseName: string;
      courseCode: string;
      courseFee: number;
      courseDiscountFee: number;
      courseImage: string;
    }
  ];
}

export interface createCourseEnrollment {
  userId: string;
  courses: number[];
}
export interface createExamEnrollment {
  userId: string;
  simulation_Exams: number[];
}
export interface deleteExamEnrollment {
  examEnrollmentId: number;
}
export interface deleteCourseEnrollment {
  courseEnrollmentId: number;
}
