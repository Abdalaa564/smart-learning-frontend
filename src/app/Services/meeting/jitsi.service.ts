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
    console.log('isAdmin:' + isAdmin);
    console.log('password provided:' + (password ? 'yes' : 'no'));

    this.options = {
      roomName: nameRoom,

      configOverwrite: {
        prejoinPageEnabled: this.user.name != '' ? false : true,
        startWithAudioMuted: !isAdmin,
        startWithVideoMuted: !isAdmin,
        // Connection stability settings
        enableNoAudioDetection: false,
        enableNoisyMicDetection: false,
        p2p: {
          enabled: true,
          stunServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
          ]
        },
        // Disable features that might cause issues
        disableDeepLinking: true,
      },
      interfaceConfigOverwrite: {
        startAudioMuted: !isAdmin,
        startVideoMuted: !isAdmin,
        DISABLE_VIDEO_BACKGROUND: true,
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
        email: 'john.doe@company.com',
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // Set password ONLY if provided and user is admin/moderator
    if (password && password.trim() !== '' && isAdmin) {
      console.log('Setting password for room as moderator');
      this.api.addEventListener('videoConferenceJoined', () => {
        console.log('Room joined, setting password now');
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
      endpointTextMessageReceived: this.endpointTextMessageReceived,
      // Error and connection monitoring
      connectionFailed: this.handleConnectionFailed,
      connectionInterrupted: this.handleConnectionInterrupted,
      connectionRestored: this.handleConnectionRestored,
      errorOccurred: this.handleError,
      p2pStatusChanged: this.handleP2PStatusChanged,
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

  handleParticipantLeft = async (participant: any) => {
    console.log('handleParticipantLeft', participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
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
    this.route.navigate(['/Home']);
  };

  // Connection error handlers
  handleConnectionFailed = (error: any) => {
    console.error('❌ CONNECTION FAILED:', error);
    console.error('Connection failed details:', JSON.stringify(error, null, 2));
    alert('فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت أو إعدادات الخادم.');
  };

  handleConnectionInterrupted = () => {
    console.warn('⚠️ CONNECTION INTERRUPTED - Attempting to reconnect...');
  };

  handleConnectionRestored = () => {
    console.log('✅ CONNECTION RESTORED');
  };

  handleError = (error: any) => {
    console.error('❌ JITSI ERROR OCCURRED:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));

    // Log specific error types
    if (error.error) {
      console.error('Error type:', error.error.name);
      console.error('Error message:', error.error.message);
    }
  };

  handleP2PStatusChanged = (status: any) => {
    console.log('P2P Status Changed:', status);
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
