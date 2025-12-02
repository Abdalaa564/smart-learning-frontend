import { Injectable, OnInit } from '@angular/core';
import { User } from './user';
declare var JitsiMeetExternalAPI: any;
import { Router } from '@angular/router'; // import router from angular router

@Injectable({
  providedIn: 'root',
})
export class JitsiService {
  api: any;
  user: User;
  namePrincipalRoom: String;
  options: any;
  domain: string = '172.27.91.251:11443';
  // domain: string = 'meet.jit.si';

  // For Custom Controls
  isAudioMuted = true;
  isVideoMuted = true;

  constructor(private route: Router) {
    this.user = new User();
    this.namePrincipalRoom = 'PrincipalRoom';
  }

  moveRoom(nameRoom: String, isAdmin: Boolean, password?: string): void {
    const myNode = document.getElementById('jitsi-iframe');
    if (myNode) {
      myNode.innerHTML = '';
    }

    console.log('nameRoom' + nameRoom);
    console.log('prejoinPageEnabled:' + (this.user.name != '' ? true : false));

    this.options = {
      roomName: nameRoom,

      configOverwrite: {
        prejoinPageEnabled: this.user.name != '' ? false : true,
        startWithAudioMuted: !isAdmin,
        startWithVideoMuted: !isAdmin,
      },
      interfaceConfigOverwrite: {
        startAudioMuted: !isAdmin,
        startVideoMuted: !isAdmin,
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
        email: 'john.doe@company.com',
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // Set password if provided
    if (password && isAdmin) {
      this.api.addEventListener('videoConferenceJoined', () => {
        this.api.executeCommand('password', password);
      });
    }

    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
      participantRoleChanged: this.participantRoleChanged,
      passwordRequired: this.passwordRequired,
      endpointTextMessageReceived: this.endpointTextMessageReceived,
    });
  }

  changeRouterLink(value: any) {
    console.log(value);
    this.namePrincipalRoom = value;

    const myNode = document.getElementById('jitsi-iframe');
    if (myNode) {
      myNode.innerHTML = '';
    }

    this.options = {
      roomName: this.namePrincipalRoom,
      configOverwrite: {
        prejoinPageEnabled: false,
        openBridgeChannel: 'datachannel',
      },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }

  handleClose = () => {
    console.log('handleClose');
  };

  endpointTextMessageReceived = async (event: any) => {
    console.log('mensaje recibido');
    console.log(event);
    console.log(event.data.eventData.text);
    if (event.data.eventData.text == 'mover a principal') {
      this.moveRoom('grupo 1', true);
    }
  };

  passwordRequired = async () => {
    console.log('passwordRequired'); // { id: "2baa184e" }
    this.api.executeCommand('password', 'The Password');
  };

  handleParticipantLeft = async (participant: any) => {
    console.log('handleParticipantLeft', participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  };

  participantRoleChanged = async (participant: any) => {
    console.log('participantRoleChanged', participant);
    //if (participant.role === "moderator")
    {
      console.log('participantRoleChanged:', participant.role);
      this.api.executeCommand('password', 'The Password');
    }
  };

  handleParticipantJoined = async (participant: any) => {
    console.log('OJOJOJOJ  handleParticipantJoined', participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }

    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant: any) => {
    console.log('handleVideoConferenceJoined', participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    /*
    displayName: "userNameTest"
formattedDisplayName: "userNameTest (me)"
id: "19563d97"
roomName: "PrincipalRoom"
*/

    this.user.setName(participant.userNameTest);
    this.namePrincipalRoom = participant.roomName;

    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    console.log('handleVideoConferenceLeft');
    this.route.navigate(['/thank-you']);
  };

  handleMuteStatus = (audio: any) => {
    console.log('handleMuteStatus', audio); // { muted: true }
  };

  handleVideoStatus = (video: any) => {
    console.log('handleVideoStatus', video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  // custom events
  executeCommand(command: string) {
    this.api.executeCommand(command);
    if (command == 'hangup') {
      this.route.navigate(['/thank-you']);
      return;
    }

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }

    if (command == 'toggleShareScreen') {
      // Logic for screen sharing toggle if needed locally, 
      // usually handled by Jitsi API directly but we might want to track state
    }
  }
  dispose() {
    if (this.api) {
      this.api.dispose();
      this.api = null;
    }
  }
}
