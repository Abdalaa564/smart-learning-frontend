import { IReview } from "./ireview";

export interface Iinstructor {
     id: string;
  name: string;
  title: string;            
  avatarUrl: string;         
  verified?: boolean;
  credentials: string[];     
  rating: number;           
  reviewsCount: number;      
  studentsTotal?: number;    
  coursesActive?: number;     
  completionRate?: number;    
  yearsTeaching?: number;    
  socials?: Partial<Record<'linkedin'|'twitter'|'youtube'|'github'|'dribbble'|'behance'|'instagram'|'facebook'|'website', string>>;
  bio?: string[];
  expertise?: string[];       
  experience?: Array<{
    year: number | string;
    role: string;
    institution: string;
    description?: string;
  }>;
//   courses?: Course[];
  reviews?:IReview[];
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
    officeHours?: string;
  };
  heroImageUrl?: string;   
}

