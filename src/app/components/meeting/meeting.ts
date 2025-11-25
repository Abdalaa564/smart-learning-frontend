import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingRoomService } from '../../Services/meeting-room-service';
import { Loader } from "./shared/meeting-room/loader/loader";
import { EndCallButton } from "./shared/end-call-button/end-call-button";
import { CallControls } from "./AngSDK/call-controls/call-controls";
import { CallStatsButton } from "./AngSDK/call-stats-button/call-stats-button";
import { CallParticipantsList } from "./AngSDK/call-participants-list/call-participants-list";
import { SpeakerLayout } from "./AngSDK/speaker-layout/speaker-layout";
import { PaginatedGridLayout } from "./AngSDK/paginated-grid-layout/paginated-grid-layout";
import { StreamClient } from '../../Services/meeting/stream-client';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

@Component({
  selector: 'app-meeting',
  imports: [ CommonModule, Loader, EndCallButton, CallControls, CallStatsButton, CallParticipantsList, SpeakerLayout, PaginatedGridLayout],
  templateUrl: './meeting.html',
  styleUrl: './meeting.css',
})
export class Meeting implements OnInit {
  @ViewChild('local') localRef!: ElementRef;
  @ViewChild('remote') remoteRef!: ElementRef;

  meetingId?: string;
  userName?: string;

  layout: CallLayoutType = 'speaker-left';
  showParticipants = false;
  callingState: 'loading' | 'joined' | 'error' = 'loading';

  call: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingRoomService, 
    private StreamClient: StreamClient
  ) {}

  ngOnInit(): void {
    // this.initializeCall();
    this.route.queryParams.subscribe(async params => {
      this.meetingId = params['id'];
      this.userName = params['name'];

      this.call = this.StreamClient.getCurrentCall();

      if (!this.call) {
        console.error('Call not found. User did not come from setup page.');
        this.callingState = 'error';
        return;
      }

      this.call.on('call.session_started', () => {
        this.callingState = 'joined';
      });

      if (this.call.state.sessionId) {
        this.callingState = 'joined';
      }
      // assume streamService already created/joined the call in setup
      // if not, create and join here:
      // await this.streamService.createAndJoin('default', this.meetingId, {}, true, true);
      // For now, just show placeholder or attach local stream if available
    });
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