import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-home-card',
  imports: [],
  templateUrl: './home-card.html',
  styleUrl: './home-card.css',
})
export class HomeCard {
  @Input() className?: string;
  @Input() img!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Output() handleClick = new EventEmitter<void>();
}
