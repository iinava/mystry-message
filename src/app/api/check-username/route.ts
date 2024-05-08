import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { userNameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UsernameQuerSchema = z.object({
  username: userNameValidation,
});

export async function GET(request: Request) {
 
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };

    //validate with zod
    const result = UsernameQuerSchema.safeParse(queryParams);
    console.log(result);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];

      return Response.json(
        {
          success: false,
           message:
            usernameErrors?.length > 0
              ? usernameErrors.join(', ')
              : 'Invalid query parameters',
        
        },
        { status: 400 }
      );
    }

    const { username } = result.data;
    const existinguserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existinguserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "username is already taken by another user",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: false,
        message: "username is unique",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error(error, "error checking username");
    return Response.json(
      {
        success: true,
        message: "error checking username",
      },
      { status: 500 }
    );
  }
}
