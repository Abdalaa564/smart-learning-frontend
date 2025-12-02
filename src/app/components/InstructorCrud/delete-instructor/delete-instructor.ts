import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Instructor } from '../../../models/iinstructor';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from '../../../Services/instructor-srevices';

@Component({
  selector: 'app-delete-instructor',
  imports: [CommonModule],
  templateUrl: './delete-instructor.html',
  styleUrl: './delete-instructor.css',
})
export class ConfirmDeleteInstructorComponent implements OnInit {

  instructor?: Instructor;
  id!: number;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InstructorService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(this.id).subscribe({
      next: res => {
        this.instructor = res;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  cancel() {
    // رجوع لقائمة الإنستراكتورز
    this.router.navigate(['/instructors']);
  }

  confirmDelete() {
    if (!this.id) return;

    this.service.delete(this.id).subscribe({
      next: () => {
        // بعد الحذف ارجع للقائمة
        this.router.navigate(['/instructors']);
      },
      error: err => console.error(err)
    });
  }
}