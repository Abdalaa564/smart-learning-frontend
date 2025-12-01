import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JitsiService } from '../../Services/meeting/jitsi.service';

interface MeetingConfig {
    roomName: string;
    displayName: string;
    isModerator: boolean;
    password: string;
}

@Component({
    selector: 'app-meeting-setup',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './meeting-setup.component.html',
    styleUrls: ['./meeting-setup.component.css']
})
export class MeetingSetupComponent implements OnInit {
    meetingConfig: MeetingConfig = {
        roomName: '',
        displayName: '',
        isModerator: true, // Default to moderator for meeting creator
        password: ''
    };

    isCreatingMeeting: boolean = true;

    constructor(
        private router: Router,
        private jitsiService: JitsiService
    ) { }

    ngOnInit(): void {
        // Try to get user info if available
        const userName = this.jitsiService.user.getName();
        if (userName) {
            this.meetingConfig.displayName = userName.toString();
        }
    }

    joinMeeting(): void {
        if (!this.meetingConfig.roomName || !this.meetingConfig.displayName) {
            alert('Please fill in all required fields');
            return;
        }

        // Set user name in service
        this.jitsiService.user.setName(this.meetingConfig.displayName);

        // Navigate to meeting with configuration
        this.router.navigate(['/meeting'], {
            state: {
                roomName: this.meetingConfig.roomName,
                isModerator: this.meetingConfig.isModerator,
                password: this.meetingConfig.password
            }
        });
    }

    generateRoomName(): void {
        const randomId = Math.random().toString(36).substring(2, 10);
        this.meetingConfig.roomName = `meeting-${randomId}`;
    }
}
