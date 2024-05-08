import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Aldready connected to database  ");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.DATABASE_URL || "", {});
    connection.isConnected = db.connections[0].readyState;

    console.log("DB connection succesfull");
    
  } catch (error) {
    console.log("Database connection failed: " + error);
    
    process.exit(1);
  }
}


export default dbConnect;

// the below code