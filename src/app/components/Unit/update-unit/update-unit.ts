import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UnitService, UpdateUnitRequest } from '../../../Services/unit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-unit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './update-unit.html',
  styleUrl: './update-unit.css',
})
export class UpdateUnit implements OnInit {

  courseId!: number;
  unitId!: number;

  model: UpdateUnitRequest = {
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
    this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));

    this.unitService.getById(this.unitId).subscribe(u => {
      this.model = {
        unit_Name: u.unit_Name,
        unit_Description: u.unit_Description,
        orderIndex: u.orderIndex,
        imageUrl: u.imageUrl
      };
    });
  }

  save(): void {
    this.unitService.updateUnit(this.unitId, this.model).subscribe(() => {
      this.router.navigate(['/Courses', this.courseId, 'units']);
    });
  }

  cancel(): void {
    this.router.navigate(['/Courses', this.courseId, 'units']);
  }
}