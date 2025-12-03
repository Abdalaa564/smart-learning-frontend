export interface EnrollmentDetails {
  enrollId: number;
  userId: number;
  studentEmail: string;
  studentPhone?: string;
  courseId: number;
  courseName: string;
  coursePrice: number;
  enrollDate: string;
  paidAmount: number;
  paymentStatus?: string;
  transactionId?: string;
  paymentDate?: string;
}