import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface AdminPaymentRow {
  studentName: string;
  courseName: string;
  paidAmount: number;
  paymentDate: string;
  paymentStatus: string;
}

@Component({
  selector: 'app-admin-payments',
  imports: [CommonModule],
  templateUrl: './admin-payments.html',
  styleUrl: './admin-payments.css',
})
export class AdminPaymentsComponent {
  @Input() payments: AdminPaymentRow[] = [];
  @Input() isLoading = false;
}