import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Alert } from "../alert/alert";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StreamClient } from '../../../../Services/meeting/stream-client';
@Component({
  selector: 'app-meeting-setup',
  imports: [Alert, CommonModule, FormsModule],
  templateUrl: './meeting-setup.html',
  styleUrl: './meeting-setup.css',
})
export class MeetingSetup implements OnInit, OnDestroy {
  @Output() isSetupComplete = new EventEmitter<boolean>();
  @ViewChild('preview') previewRef!: ElementRef<HTMLVideoElement>;

  meetingId?: string;
  userName: string = '';
  micOff = false;
  camOff = false;
  localStream?: MediaStream;

  isMicCamToggled = false;

  // هنا هتحط الحالة بتاعة Call من Stream Video JS SDK
  call: any;

  callStartsAt?: Date;
  callEndedAt?: Date;

  callTimeNotArrived = false;
  callHasEnded = false;

  constructor(private router: Router, private route: ActivatedRoute, private StreamClient: StreamClient) {}
  
  async ngOnInit() {
    this.meetingId = this.route.snapshot.paramMap.get('id')!;
    console.log('Meeting ID:', this.meetingId);

    const userId = 'user-' + Date.now();
    this.userName = this.userName || userId;

    await this.StreamClient.initFromServer(
      'jycwbvhufdkx',
      userId,
      this.meetingId!
    );

    this.StreamClient.call('default', this.meetingId!);

    await this.StreamClient.getCurrentCall().getOrCreate();

    try {
      const r = await this.StreamClient.attachPreview(this.previewRef.nativeElement);
      this.localStream = r.stream;
    } catch (err) {
      console.error(err);
    }
    // مثال: افترضنا اننا عندنا Call Object
    // this.call = streamClient.getCall(...);
    // this.callStartsAt = new Date(this.call.startsAt);
    // this.callEndedAt = new Date(this.call.endedAt);
    this.updateCallStatus();
  }

  ngOnDestroy() {
    // stop local preview tracks
    this.localStream?.getTracks().forEach(t => t.stop());
  }


  async toggleMicCam() {
    if (!this.localStream) return;
    this.micOff = !this.micOff;
    this.localStream.getAudioTracks().forEach(t => {
      t.enabled = !this.micOff;
    });

    this.camOff = !this.camOff;
    this.localStream.getVideoTracks().forEach(t => {
      t.enabled = !this.camOff;
    });

    if (!this.camOff) {
      const r = await this.StreamClient.attachPreview(this.previewRef.nativeElement);
      this.localStream = r.stream;
    }

    // this.isMicCamToggled = !this.isMicCamToggled;

    // if (this.isMicCamToggled) {
    //   this.call?.camera?.disable();
    //   this.call?.microphone?.disable();
    // } else {
    //   this.call?.camera?.enable();
    //   this.call?.microphone?.enable();
    // }
  }

  async joinMeeting() {
    if (!this.userName) {
      alert('Please enter your name before joining the meeting');
      return;
    }
    alert('Joining Meeting...');
    // this.router.navigate(['/meeting']);

    await this.StreamClient.join('default', this.meetingId!, !this.micOff, !this.camOff);

    this.router.navigate(['/meeting'], { 
      queryParams: { 
        id: this.meetingId, 
        name: this.userName,
        micOff: this.micOff,
        camOff: this.camOff
      } 
    });

    // this.call?.join();
    // this.isSetupComplete.emit(true);
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
