export interface examEnrollment {
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
    }
  ];
}

export interface courseEnrollment {
  courseEnrollmentId: number;
  courseEnrollmentDate: Date;
  courseEnrollmentStatus: string;
  totalPrice: number;
  userId: string;
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
