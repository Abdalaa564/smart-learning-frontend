import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Instructor } from '../../../models/iinstructor';
import { InstructorService } from '../../../Services/instructor-srevices';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-instructor',
  imports:[CommonModule, FormsModule],
  templateUrl: './edit-instructor.html',
  styleUrl: './edit-instructor.css',
})
export class EditInstructorComponent implements OnInit {

  model: Partial<Instructor> = {};
  id!: number;
  loading = true;

  constructor(
    private service: InstructorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(this.id).subscribe({
      next: res => {
        this.model = res;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  save() {
  this.service.update(this.id, this.model).subscribe({
    next: (msg) => {
      console.log('Update response:', msg); // Instructor updated successfully
      this.router.navigate(['/instructors']); // ← يرجع لصفحة الإنستراكتورز
    },
    error: (err) => {
      console.error('ERROR FROM UPDATE:', err);
    }
  });
  }
}