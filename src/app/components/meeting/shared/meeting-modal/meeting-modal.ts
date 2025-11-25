import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-meeting-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-modal.html',
  styleUrl: './meeting-modal.css',
})
export class MeetingModal {
  @Input() isOpen = false;
  @Input() title!: string;
  @Input() className?: string;
  @Input() image?: string;
  @Input() buttonText?: string;
  @Input() buttonIcon?: string;
  @Input() instantMeeting?: boolean;

  @Output() onClose = new EventEmitter<void>();
  @Output() handleClick = new EventEmitter<void>();

  closeModal() {
    this.onClose.emit();
  }

  clickButton() {
    this.handleClick.emit();
  }
}
