import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Alert } from "../alert/alert";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-setup',
  imports: [Alert, CommonModule],
  templateUrl: './meeting-setup.html',
  styleUrl: './meeting-setup.css',
})
export class MeetingSetup implements OnInit {
  @Output() isSetupComplete = new EventEmitter<boolean>();

  isMicCamToggled = false;

  // هنا هتحط الحالة بتاعة Call من Stream Video JS SDK
  call: any;

  callStartsAt?: Date;
  callEndedAt?: Date;

  callTimeNotArrived = false;
  callHasEnded = false;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // مثال: افترضنا اننا عندنا Call Object
    // this.call = streamClient.getCall(...);
    // this.callStartsAt = new Date(this.call.startsAt);
    // this.callEndedAt = new Date(this.call.endedAt);
    this.updateCallStatus();
  }


  toggleMicCam() {
    this.isMicCamToggled = !this.isMicCamToggled;

    if (this.isMicCamToggled) {
      this.call?.camera?.disable();
      this.call?.microphone?.disable();
    } else {
      this.call?.camera?.enable();
      this.call?.microphone?.enable();
    }
  }

  joinMeeting() {
    alert('Joining Meeting...');
    this.router.navigate(['/meeting']);

    // this.call?.join();
    this.isSetupComplete.emit(true);
  }

  updateCallStatus() {
    if (this.callStartsAt && this.callStartsAt > new Date()) {
      this.callTimeNotArrived = true;
    }

    if (this.callEndedAt) {
      this.callHasEnded = true;
    }
  }
}
