export interface currentCart {
  cartId: number;
  totalPrice: number;
  userId: number;
  examId: number[];
  courseId: number[];
  examDetails: [
    {
      examId: number;
      examName: string;
      examCode: string;
      examDiscountFee: number;
      examImage: string;
    }
  ];
  courseDetails: [
    {
      courseId: number;
      courseName: string;
      courseCode: string;
      courseDiscountFee: number;
      courseImage: string;
    }
  ];
}
