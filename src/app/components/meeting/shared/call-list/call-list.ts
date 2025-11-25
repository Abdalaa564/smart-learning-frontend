import { Call } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from "../meeting-room/loader/loader";
import { CallDetail, CallService } from '../../../../Services/call-service';
import { MeetingCard } from "../meeting-card/meeting-card";

@Component({
  selector: 'app-call-list',
  imports: [Loader, MeetingCard],
  templateUrl: './call-list.html',
  styleUrl: './call-list.css',
})
export class CallList implements OnInit {
  @Input() type!: 'ended' | 'upcoming' | 'recordings';
  calls: CallDetail[] = [];
  isLoading = true;

  constructor(private callService: CallService, private router: Router) {}

  ngOnInit() {
    this.loadCalls();
  }

  loadCalls() {
    let observable;
    if (this.type === 'ended') observable = this.callService.getEndedCalls();
    else if (this.type === 'upcoming') observable = this.callService.getUpcomingCalls();
    else observable = this.callService.getRecordings();

    observable.subscribe({
      next: (res) => { this.calls = res; this.isLoading = false; },
      error: () => { this.calls = []; this.isLoading = false; }
    });
  }

  handleClick(meeting: CallDetail) {
    if (this.type === 'recordings') window.open(meeting.url, '_blank');
    else this.router.navigate([`/meeting/${meeting.id}`]);
  }

  getNoCallsMessage() {
    switch(this.type){
      case 'ended': return 'No Previous Calls';
      case 'upcoming': return 'No Upcoming Calls';
      case 'recordings': return 'No Recordings';
    }
  }
}
