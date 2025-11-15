import { Component } from '@angular/core';
import { Card } from "../../../shared/card/card";

@Component({
  selector: 'app-lessons',
  imports: [Card],
  templateUrl: './lessons.html',
  styleUrl: './lessons.css',
})
export class Lessons {
video = {
    title: "Physics Chapter 1",
    subtitle: "Introduction Video",
    thumbnail: "assets/video-thumbnail.jpg",
    videoUrl: "https://example.com/video.mp4"   // من الداتابيز
  };

  // PDF data coming from database
  pdf = {
    title: "Chapter Notes",
    subtitle: "PDF File",
    thumbnail: "assets/pdf-thumbnail.png",
    pdfUrl: "https://example.com/file.pdf"     // من الداتابيز
  };
  openVideo(url: string) {
  window.open(url, "_blank");
}

openPdf(url: string) {
  window.open(url, "_blank");
}

}
