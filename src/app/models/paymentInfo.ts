export interface PaymentInfo {
  amount: number;
  paymentMethod: string;
  cardNumber?: string;
  cardCVC?: string;
  cardholderName?: string;
}
