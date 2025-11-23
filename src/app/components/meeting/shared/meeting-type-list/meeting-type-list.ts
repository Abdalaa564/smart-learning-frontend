import { MeetingSetup } from './../meeting-setup/meeting-setup';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeCard } from "../home-card/home-card";
import { MeetingModal } from "../meeting-modal/meeting-modal";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CallDetail {
  id: string;
  startsAt?: string;
  description?: string;
}

interface MeetingValues {
  dateTime: Date;
  description: string;
  link: string;
}

@Component({
  selector: 'app-meeting-type-list',
  imports: [HomeCard, MeetingModal, CommonModule, FormsModule],
  templateUrl: './meeting-type-list.html',
  styleUrl: './meeting-type-list.css',
})
export class MeetingTypeList {
  meetingState: 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined;
  values: MeetingValues = { dateTime: new Date(), description: '', link: '' };
  callDetail?: CallDetail;

  sidebarLinks = [
    { label: 'Dashboard', route: '/dashboard', imgURL: 'assets/icons/dashboard.svg' }
  ];

  constructor(public router: Router) {}

  async createMeeting() {
    try {
      if (!this.values.dateTime) {
        alert('Please select a date and time');
        return;
      }

      const id = crypto.randomUUID();
      // استخدام Stream Video JS SDK هنا لإنشاء الاجتماع
      const call = { id, startsAt: this.values.dateTime.toISOString(), description: this.values.description };
      this.callDetail = call;

      
      alert('Meeting Created');
      this.router.navigate([`/meeting-setup`]);
      // this.router.navigate([`/meeting-setup/${call.id}`]);
    } catch (error) {
      console.error(error);
      alert('Failed to create Meeting');
    }
  }

  copyMeetingLink() {
    const meetingLink = `${window.location.origin}/meeting/${this.callDetail?.id}`;
    navigator.clipboard.writeText(meetingLink);
    alert('Link Copied');

    if (!this.values.description) {
        this.router.navigate(['/MeetingSetup']);
        // this.router.navigate(['/MeetingSetup', this.callDetail?.id]);
      }
  }

  joinMeeting() {
    if (this.values.link) {
      this.router.navigate([this.values.link]);
    }
  }
}