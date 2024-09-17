import mongoose from "mongoose";

export const DBconnect = async () => {
  await mongoose
    .connect(
      "mongodb+srv://hakheem67:Hakheem5674@trendify.kjoklnn.mongodb.net/trendify"
    )
    .then(() => {
      console.log("Database connected");
    });
};
