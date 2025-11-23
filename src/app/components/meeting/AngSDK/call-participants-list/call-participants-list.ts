import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-call-participants-list',
  imports: [],
  templateUrl: './call-participants-list.html',
  styleUrl: './call-participants-list.css',
})
export class CallParticipantsList {
  @Input() participants: any[] = [];
  @Output() close = new EventEmitter<void>();
}
