import { Component, Input } from '@angular/core';
import { Stats } from '../../../models/Admin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  imports: [CommonModule],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css',
})
export class AdminProfileComponent {
  @Input() adminName: string = 'Admin';
  @Input() stats!: Stats;

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
