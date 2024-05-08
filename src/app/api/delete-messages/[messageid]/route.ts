import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageid = params.messageid;
  await dbConnect();
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }
  // console.log(_user?._id);

  // console.log(_user.id,messageid);

  try {
    const updateResult = await UserModel.updateOne(
      {
        _id: _user._id,
      },
      {
        $pull: {
          messages: {
            _id: messageid,
          },
        },
      }
    );
    console.log(updateResult);

    if (updateResult.modifiedCount == 0) {
      return Response.json(
        { success: false, message: "message not found or aldready delted" },
        { status: 404 }
      );
    }
    return Response.json(
      { success: true, message: "message deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "error in delete message route");

    return Response.json(
      { success: false, message: "error deleting message" },
      { status: 500 }
    );
  }
}
