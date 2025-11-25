import { Component, Input } from '@angular/core';
import { Sidebar } from "../../shared/sidebar/sidebar";
import { MeetingHome } from "../meetingHome/meetingHome";

@Component({
  selector: 'app-layout',
  imports: [Sidebar, MeetingHome],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  sidebarLinks = [
  { label: 'meeting', route: '/meeting', imgURL: 'assets/icons/share.svg' },
  { label: 'meetingHome', route: '/meetingHome', imgURL: 'assets/icons/share.svg' },
  { label: 'Meetings', route: '/meetings', imgURL: 'assets/icons/share.svg' },
  ];

  @Input() title: string = 'YOOM';
  @Input() description: string = 'A workspace for your team, powered by Stream Chat and Clerk.';
}
