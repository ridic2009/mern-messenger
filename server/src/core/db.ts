import mongoose from "mongoose";

function connectDb() {
  try {
    mongoose.connect(
      `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
    );
    console.log(
      `Connected with database: ${process.env.DATABASE_NAME}, port: ${process.env.DATABASE_PORT}`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

connectDb()
