import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class Card {
  @Input() img!: string;
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() clickable = false;
}
