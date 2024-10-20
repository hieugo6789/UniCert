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
  certificationDetails: [
    {
      certId: number;
      certName: string;
      certCode: string;
      certDescription: string;
      certImage: string;
      typeName: string;
    }
  ];
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
  certificationDetails: [
    {
      certId: number;
      certName: string;
      certCode: string;
      certDescription: string;
      certImage: string;
      typeName: string;
    }
  ];
}

export interface updateCourse {
  courseName: string;
  courseCode: string;
  courseTime: string;
  courseDescription: string;
  courseFee: number;
  voucherIds: number[];
  courseImage: string;
  certId: number;
}

export interface deleteCourse {
  courseId: string;
}
