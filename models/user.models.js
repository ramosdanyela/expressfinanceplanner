import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  name: { type: String, required: true, trim: true },
  profileImage: { type: String, default: "https://res.cloudinary.com/dcj6uxtqe/image/upload/v1729036082/profpic_htzaix.jpg" },
});

const User = model("User", userSchema);

export default User;
