import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingRoomService } from '../../Services/meeting-room-service';
import { Loader } from "./shared/meeting-room/loader/loader";
import { EndCallButton } from "./shared/end-call-button/end-call-button";
import { CallControls } from "./AngSDK/call-controls/call-controls";
import { CallStatsButton } from "./AngSDK/call-stats-button/call-stats-button";
import { CallParticipantsList } from "./AngSDK/call-participants-list/call-participants-list";
import { SpeakerLayout } from "./AngSDK/speaker-layout/speaker-layout";
import { PaginatedGridLayout } from "./AngSDK/paginated-grid-layout/paginated-grid-layout";

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

@Component({
  selector: 'app-meeting',
  imports: [ CommonModule, Loader, EndCallButton, CallControls, CallStatsButton, CallParticipantsList, SpeakerLayout, PaginatedGridLayout],
  templateUrl: './meeting.html',
  styleUrl: './meeting.css',
})
export class Meeting implements OnInit {
  layout: CallLayoutType = 'speaker-left';
  showParticipants = false;
  callingState: 'loading' | 'joined' | 'error' = 'loading';

  constructor(
    private router: Router,
    private meetingService: MeetingRoomService
  ) {}

  ngOnInit(): void {
    this.initializeCall();
  }

  async initializeCall() {
    try {
      await this.meetingService.connectToCall();
      this.callingState = 'joined';
    } catch (error) {
      console.error(error);
      this.callingState = 'error';
    }
  }

  changeLayout(type: CallLayoutType) {
    this.layout = type;
  }

  leaveCall() {
    this.meetingService.disconnect();
    this.router.navigate(['/']);
  }

  toggleParticipants() {
    this.showParticipants = !this.showParticipants;
  }
}