export interface summaryDashboard {
  totalCertificates: number;
  totalMajor: number;
  totalCourses: number;
  totalJobsPosition: number;
  totalSimulationExams: number;
  totalStudents: number;
  totalPoint: number;
  totalAmountOfTopUp: number;
  totalAmoutOfRefund: number;
}
export interface PieChartModel {
  totalStudents: number;
  percentageTotalStudents: number;
  onlyEnrolledInCourse: number;
  percentageOnlyEnrolledInCourse: number;
  onlyPurchaseSimulationExams: number;
  percentageOnlyPurchaseSimulationExams: number;
  purchaseBoth: number;
  percentagePurchaseBoth: number;
  purchaseNothing: number;
  percentagePurchaseNothing: number;
}
