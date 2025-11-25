import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paginated-grid-layout',
  imports: [],
  templateUrl: './paginated-grid-layout.html',
  styleUrl: './paginated-grid-layout.css',
})
export class PaginatedGridLayout {
  @Input() participants: any[] = [];
}
