import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { JitsiService } from '../../Services/meeting/jitsi.service';

@Component({
    selector: 'app-jitsi',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './jitsi.component.html',
    styleUrls: ['./jitsi.component.css'],
})
export class JitsiComponent implements OnInit, OnDestroy {
    get isAudioMuted(): boolean {
        return this.jitsiService.isAudioMuted;
    }

    get isVideoMuted(): boolean {
        return this.jitsiService.isVideoMuted;
    }

    constructor(private router: Router, private jitsiService: JitsiService) { }

    ngOnInit(): void {
        // Get meeting configuration from router state
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras?.state || history.state;

        const roomName = state?.['roomName'] || this.jitsiService.namePrincipalRoom;
        const isModerator = state?.['isModerator'] || false;
        const password = state?.['password'] || undefined;

        this.jitsiService.moveRoom(roomName, isModerator, password);
    }

    ngOnDestroy(): void {
        this.jitsiService.dispose();
    }

    async executeCommand(data: any) {
        const participants: any = await this.jitsiService.getParticipants();
        console.log('this.jitsiService.getParticipants():', participants);

        for (const participant of participants) {
            this.jitsiService.api.executeCommand(
                'sendEndpointTextMessage',
                participant.id,
                'mover a principal'
            );
        }
    }
}
