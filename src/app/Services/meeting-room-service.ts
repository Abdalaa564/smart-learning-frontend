import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MeetingRoomService {
  
  async connectToCall() {
    // Connect to Stream Video SDK here
    console.log("Connecting to call...");
    return new Promise(resolve => setTimeout(resolve, 1500));
  }

  disconnect() {
    console.log("Leaving call...");
  }
}
