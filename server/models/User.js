import { Schema, model } from "mongoose";
const userSchema = Schema(
  {
    userName: {
      type: String,
      minlength: 6,
      maxlength: 20,

      required: true,
    },
    email: {
      type: String,
      minlength: 10,
      maxlength: 50,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = model("User", userSchema);
export default User;
