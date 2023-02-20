import mongoose from "mongoose";

// TODO : Add telephone number and country, and address fields

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  allProperties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  }],
});

export default mongoose.model("User", UserSchema);