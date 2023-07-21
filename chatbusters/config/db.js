import mongoose from "mongoose";

const db = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/chatbusters";

const connect = mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((error) => {
    console.log("DB connection Fail" + error.message);
    process.exit(1);
  });

export default connect;
