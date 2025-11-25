// import { Call } from '@angular/compiler';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class VideoCall {
//   client?: StreamVideoClient;
//   currentCall?: Call;
//   localParticipant?: any;

//   init(user: any, apiKey: string) {
//     this.client = new StreamVideoClient({
//       apiKey,
//       user: {
//         id: user.id,
//         name: user.username || user.id,
//         image: user.imageUrl,
//       },
//       tokenProvider,
//     });
//   }

//   joinCall(callId: string) {
//     if (!this.client) return;
//     this.currentCall = this.client.call('default', callId);
//   }

//   async endCall() {
//     return await this.currentCall?.endCall();
//   }
// }
