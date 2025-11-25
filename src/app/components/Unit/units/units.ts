import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Unit } from '../../../models/Unit ';
import { UnitService } from '../../../Services/unit.service';

@Component({
  selector: 'app-units',
  imports: [CommonModule, RouterLink],
  templateUrl: './units.html',
  styleUrl: './units.css',
})
export class Units implements OnInit {

  courseId!: number;
  units: Unit[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private unitService: UnitService
  ) {}

  ngOnInit(): void {
    // من الروت: Courses/:id/units
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUnits();
  }

  loadUnits(): void {
    this.isLoading = true;

    this.unitService.getByCourse(this.courseId).subscribe({
      next: (response) => {
        this.units = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading units:', err);
        this.isLoading = false;
      }
    });
  }

  deleteUnit(u: Unit): void {
    if (!confirm(`Are you sure to delete unit "${u.unit_Name}" ?`)) return;

    this.unitService.deleteUnit(u.unit_Id).subscribe({
      next: () => {
        // إعادة تحميل الليست بعد الحذف
        this.loadUnits();
      },
      error: (err) => {
        console.error('Error deleting unit:', err);
      }
    });
  }
}