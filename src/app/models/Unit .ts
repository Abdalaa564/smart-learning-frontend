export interface Unit {
 unit_Id: number;       // ✅ زي اللي راجع من الـ API
  crs_Id: number;
  unit_Name: string;
  unit_Description: string;
  orderIndex: number;
  imageUrl?: string;
  instructorName?: string;
}
       