import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-speaker-layout',
  imports: [],
  templateUrl: './speaker-layout.html',
  styleUrl: './speaker-layout.css',
})
export class SpeakerLayout {
  @Input() position: 'left' | 'right' = 'right';
  @Input() participants: any[] = [];
}
