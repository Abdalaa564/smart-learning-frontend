export interface EnrollmentResponse{

  success: boolean;
  message: string;
  enrollmentId?: number;
   courseId: number;
  enrollmentDate?: string;
  transactionId: string;
  paidAmount?: number;
  paymentUrl: string;


}