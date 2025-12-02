import { PaymentInfo } from './paymentInfo';

export interface EnrollmentRequest {
  courseId: number;
  payment: PaymentInfo;
  studentId: number;
}
