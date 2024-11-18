export interface allCoursePaginationData {
  courseId: string;
  courseName: string;
  courseCode: string;
  courseTime: string;
  courseDescription: string;
  courseFee: number;
  courseDiscountFee: number;
  courseImage: string;
  coursePermission: string;
  certId: string;
  certificationDetails: [
    {
      certId: number;
      certName: string;
      certCode: string;
      certDescription: string;
      certImage: string;
      typeName: string;
      permission: string;
    }
  ];
  voucherDetails: [
    {
      voucherId: number;
      voucherName: string;
      voucherDescription: string;
      percentage: number;
      creationDate: Date;
      expiryDate: Date;
      voucherStatus: boolean;
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
  coursePermission: string;
  certId: string;
  certificationDetails: [
    {
      certId: number;
      certName: string;
      certCode: string;
      certDescription: string;
      certImage: string;
      typeName: string;
      permission: string;
    }
  ];
  voucherDetails: [
    {
      voucherId: number;
      voucherName: string;
      voucherDescription: string;
      percentage: number;
      creationDate: Date;
      expiryDate: Date;
      voucherStatus: boolean;
    }
  ];
}

export interface createCourse {
  courseName: string;
  courseCode: string;
  courseTime: string;
  courseDescription: string;
  courseFee: number;
  voucherIds: number[];
  courseImage: string;
  certId: number;
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

export interface Students {
  userId: number;
  username: string;
  userImage: string;
  email: string;
  fullname: string;
  dob: string;
  address: string;
  phoneNumber: number;
}
