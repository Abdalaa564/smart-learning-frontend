export interface EnrollmentResponse{

  success: boolean;
  message: string;
  enrollmentId?: number;
  enrollmentDate?: string;
  transactionId?: string;
  paidAmount?: number;

}