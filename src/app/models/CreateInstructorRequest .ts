export interface CreateInstructorRequest {
  email: string;
  password: string;
  fullName: string;
  jobTitle: string;
  rating: number;
  phoneNumber: string;
  youtubeChannelUrl: string;
  photoUrl?: string;
  certificateUrl?: string;
}
