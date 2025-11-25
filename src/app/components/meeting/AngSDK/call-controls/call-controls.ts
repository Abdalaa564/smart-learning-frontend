import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-call-controls',
  imports: [],
  templateUrl: './call-controls.html',
  styleUrl: './call-controls.css',
})
export class CallControls {
  @Output() leave = new EventEmitter<void>();

  toggleMic() { console.log('Mic toggled'); }
  toggleCamera() { console.log('Camera toggled'); }
}
