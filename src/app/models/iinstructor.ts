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
export interface RegisterInstructorRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  youtubeChannelUrl: string;
  photoUrl: string;
  certificateUrl: string;
  cvUrl: string;
  specialization: string;
  universityName: string;
  about: string;
}
