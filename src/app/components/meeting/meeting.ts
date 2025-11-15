import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-meeting',
  imports: [RouterLink],
  templateUrl: './meeting.html',
  styleUrl: './meeting.css',
})
export class Meeting implements OnInit {

  meeting = {
    title: 'Live Angular Session',
    instructor: 'Eng. Abdalla',
    date: new Date(),
    startTime: "7:00 PM",
    duration: 90,
    description: "A live session to explain Angular components and project structure.",
    files: [
      { name: "Session Notes.pdf", url: "#" },
      { name: "Slides.pptx", url: "#" }
    ]
  };

  countdown = "";
  messages = [];
  newMessage = "";

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    setInterval(() => {
      this.countdown = "01:25:12 (example)";
    }, 1000);
  }

  joinMeeting() {
    window.open("https://zoom.com/example", "_blank");
  }

  sendMessage() {
    // this.messages.push({ user: "You", text: this.newMessage });
    this.newMessage = "";
  }

}