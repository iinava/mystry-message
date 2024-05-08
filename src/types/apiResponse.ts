import { Message } from "@/models/user.model";

export interface Apiresponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean
  //   data: any;
  messages?: Array<Message>;
}
