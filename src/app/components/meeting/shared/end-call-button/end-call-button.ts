import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-call-button',
  imports: [],
  templateUrl: './end-call-button.html',
  styleUrl: './end-call-button.css',
})
export class EndCallButton {

  constructor( private router: Router) {}
  // constructor(private videoCallService: VideoCallService, private router: Router) {}

  // get isMeetingOwner(): boolean {
    // const call = this.videoCallService.currentCall;
    // const localParticipant = this.videoCallService.localParticipant;
    // return localParticipant?.userId === call?.state.createdBy?.id;
  // }

  // async endCall() {
  //   if (!this.videoCallService.currentCall) return;
  //   await this.videoCallService.endCall();
  //   this.router.navigate(['/']);
  // }
}
