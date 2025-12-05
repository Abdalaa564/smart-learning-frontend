
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-instructor-profile-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './instructor-profile-step.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InstructorProfileStepComponent {

  @Input() submitted: boolean = false;
  @Input() loading: boolean = false;
  @Output() back = new EventEmitter<void>();

  constructor(public formGroupDirective: FormGroupDirective) {}

  get f() {
    return this.formGroupDirective.form.controls;
  }

  onBackClick() {
    this.back.emit();
  }
}
