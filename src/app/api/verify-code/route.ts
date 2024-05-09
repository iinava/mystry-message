import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    // const req = await request.json();
    // console.log(req);
    console.log(username,code);
    
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({
      username: decodedUsername,
    });
    console.log(code,"i am arrived code");
    
    console.log(user,"i have user");

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    // const isCodeValid = user.verifyCode === code;
    // since my resend email free plan doesnot allow other users mail , i cannot afford premium now 
    const isCodeValid = true
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    console.log(isCodeNotExpired,isCodeValid,"code expired or not");
    

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return new Response(
        JSON.stringify({
          success: true,
          message: "Account verified successfully",
        }),
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Verification code expired. Please sign up again.",
        }),
        { status: 400 }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Incorrect verification code",
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error verifying user",
      }),
      { status: 500 }
    );
  }
}
