export interface Instructor {
  id?: number;
  userId?: string;
  fullName: string;
  jobTitle: string;
  numberOfStudents: number;
  rating: number;
  phoneNumber: string;
  youtubeChannelUrl: string;
  email?: string;
  photoUrl?: string;
  certificateUrl?: string;
}
