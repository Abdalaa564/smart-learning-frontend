export interface Instructor {
  // بيرجع من السيرفر، مش بنبعتُه في الـ POST
  id?: number;

  // الحقول اللي انت بتبعتها في الـ POST طبقاً للـ Swagger
  userId: string;
  fullName: string;
  jobTitle: string;
  numberOfStudents: number;
  rating: number;
  phoneNumber: string;
  youtubeChannelUrl: string;
  email?: string;
  photoUrl?: string;
  certificateUrl?: string
}
