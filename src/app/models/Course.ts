export interface Course {
  crs_Id: number;
  crs_Name: string;
  crs_Description: string;
  price: number;
  instructorId: number;
  instructorName: string;
  imageUrl: string | null;
  instructorPhoto?: string | null;
}
