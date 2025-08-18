
import mongoose from "mongoose";

// const MONGODB_URI = `${process.env.MONGODB_URI}/swiftbuy`;

let cached = global.mongoose || { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/swiftbuy`, options).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  global.mongoose = cached; // Keep cache in the global scope

  return cached.conn; 
}
