import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already Connected to MongoDB");
    return;
  }
  if (connectionState === 2) {
    console.log("connecting...");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Ecommerce-shop",
      bufferCommands: false,
    });
    console.log("connected");
  } catch (error) {
    console.log("Error connecting to MongoDb",error);
    
  }

  //   const url = process.env.MONGODB_URL;
  //   mongoose
  //     .connect(url)
  //     .then(() => {
  //       console.log("connecting to MONGODB");
  //     })
  //     .catch((err) => console.log(err));
};
