import { Studentprofile } from "./studentprofile";
import { Tokenresponse } from "./tokenresponse";

export interface Authresponse {
  success: boolean;
  message: string;
  data: Studentprofile;
  token: Tokenresponse;
}
