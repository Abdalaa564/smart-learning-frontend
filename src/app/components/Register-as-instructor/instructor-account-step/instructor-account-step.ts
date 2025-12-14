// src/app/components/register-instructor/instructor-account-step.ts


import { CommonModule } from '@angular/common';
import {Component,EventEmitter, Input,Output} from '@angular/core';
import {ControlContainer,FormGroupDirective,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-instructor-account-step',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './instructor-account-step.html',
  styleUrl: './instructor-account-step.css', 
  // ده اللي بيخلي الـ child يشوف نفس الـ FormGroup بتاع الـ parent form
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InstructorAccountStepComponent {

  @Input() submitted: boolean = false;
  @Output() next = new EventEmitter<void>(); 
  showPassword: boolean = false;
showConfirmPassword: boolean = false;

  constructor(public formGroupDirective: FormGroupDirective) {}

  get f() {
    return this.formGroupDirective.form.controls;
  }

  onNextClick() {
    this.next.emit();
  }
   togglePassword() {
  this.showPassword = !this.showPassword;
}

toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}
}
