import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    min: 2,
    max: 100,
  },
  password: {
    required: true,
    type: String,
  },
});

const UserModel = mongoose.models.users || mongoose.model("users", UsersSchema);

export default UserModel;
