import { Component } from '@angular/core';
import { MeetingTypeList } from "../../shared/meeting-type-list/meeting-type-list";

@Component({
  selector: 'app-meetingHome',
  imports: [MeetingTypeList],
  templateUrl: './meetingHome.html',
  styleUrl: './meetingHome.css',
})
export class MeetingHome {
  now = new Date();

  get time(): string {
    return this.now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  get date(): string {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(this.now);
  }
}
