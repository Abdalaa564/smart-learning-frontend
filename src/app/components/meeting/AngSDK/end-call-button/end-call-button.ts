import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-end-call-button',
  imports: [],
  templateUrl: './end-call-button.html',
  styleUrl: './end-call-button.css',
})
export class EndCallButton {
  @Output() endCall = new EventEmitter<void>();
}
