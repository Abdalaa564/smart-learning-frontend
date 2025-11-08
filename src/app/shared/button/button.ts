import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [CommonModule,RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
 @Input() variant: Variant = 'primary';
  @Input() size: Size = 'md';
  @Input() block = false;           
  @Input() disabled = false;
  @Input() type: 'button'|'submit'|'reset' = 'button';

  // اختيارية: لو عايز تستخدمه كرابط راوتر
  @Input() routerLink?: any[] | string;
}
