import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-header-component.html',
  styleUrls: ['./admin-header-component.css'],
})
export class AdminHeaderComponent {
  @Input() adminName: string = '';
  @Output() toggleSidebar = new EventEmitter<void>();

  getInitials(name: string): string {
    if (!name) return 'A';
    return name
      .split(' ')
      .filter((x) => !!x)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
