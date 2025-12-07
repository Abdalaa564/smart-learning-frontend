import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../../models/Admin';


@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.css'],
})
export class AdminSidebarComponent {
  @Input() sidebarOpen = true;
  @Input() menuItems: MenuItem[] = [];
  @Input() activePage!: MenuItem['id'];

  @Output() pageChange = new EventEmitter<MenuItem['id']>();

  onSelect(id: MenuItem['id']) {
    this.pageChange.emit(id);
  }
}
