import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-meeting-card',
  imports: [CommonModule],
  templateUrl: './meeting-card.html',
  styleUrl: './meeting-card.css',
})
export class MeetingCard {
  @Input() title!: string;
  @Input() date!: string;
  @Input() icon!: string;
  @Input() isPreviousMeeting?: boolean;
  @Input() buttonIcon1?: string;
  @Input() buttonText?: string;
  @Input() link!: string;

  @Input() avatarImages: string[] = [];

  @Output() handleClick = new EventEmitter<void>();

  copyLink() {
    navigator.clipboard.writeText(this.link);
    alert('Link Copied'); // مؤقت، يمكن استبداله بـ Angular Material Snackbar
  }
}
