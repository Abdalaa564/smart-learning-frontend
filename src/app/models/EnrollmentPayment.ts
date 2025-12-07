export interface EnrollmentPayment {
  enrollId: number;
  userId: number;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: number;
  courseName: string;
  coursePrice: number;
  enrollDate: string;
  paidAmount: number;
  paymentStatus: string;
  transactionId: string;
  paymentDate: string;
}
