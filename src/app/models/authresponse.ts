import { Instructor } from "./iinstructor";
import { Studentprofile } from "./studentprofile";
import { Tokenresponse } from "./tokenresponse";

export interface Authresponse {
  success: boolean;
  message: string;
  data: Studentprofile | null;    
  instructor?: Instructor | null; 
  token: Tokenresponse;
}
