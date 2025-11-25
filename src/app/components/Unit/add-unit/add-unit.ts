import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddUnitRequest, UnitService } from '../../../Services/unit.service';

@Component({
  selector: 'app-add-unit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-unit.html',
  styleUrl: './add-unit.css',
})
export class AddUnit implements OnInit {

   courseId!: number;

  model: AddUnitRequest = {
    crs_Id: 0,
    unit_Name: '',
    unit_Description: '',
    orderIndex: 1,
    imageUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.model.crs_Id = this.courseId;
  }

  save(): void {
    this.unitService.addUnit(this.model).subscribe({
      next: () => {
        this.router.navigate(['/Courses', this.courseId, 'units']);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/Courses', this.courseId, 'units']);
  }
}