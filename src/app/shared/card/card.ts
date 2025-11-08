import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
   standalone: true, 
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
 @Input() img!: string;
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() clickable = false;
}
