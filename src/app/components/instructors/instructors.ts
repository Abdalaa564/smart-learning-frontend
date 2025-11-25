import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Instructor } from '../../models/iinstructor';
import { InstructorService } from '../../Services/instructor-srevices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructors-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructors.html',
  styleUrls: ['./instructors.css']
})
export class InstructorsListComponent implements OnInit {

  instructors: Instructor[] = [];
  loading = true;

  constructor(private service: InstructorService,
            private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: res => {
        this.instructors = res;
        this.loading = false;
      },
      error: err => console.log(err)
    });
  }
  getStarsArray(rating: number): number[] {
  return [1, 2, 3, 4, 5];
}
goToProfile(id?: number) {
  if (!id) return;
  this.router.navigate(['/instructor', id]);
}

}