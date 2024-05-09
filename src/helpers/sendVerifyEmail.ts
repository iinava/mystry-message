import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { Apiresponse } from "@/types/apiResponse";
import { string } from "zod";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifycode: string
): Promise<Apiresponse> {
  try {
    console.log(email);
    
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verification code | mystery message",
      react: VerificationEmail({ username, otp: verifycode }),
    });
    return { success: true, message: "sending email successfully" };
  } catch (emailError) {
    console.log("error sending verification email", emailError);
    return { success: false, message: "sending email failed" };
  }
}
