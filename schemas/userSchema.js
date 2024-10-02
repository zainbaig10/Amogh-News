import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const reqString = {
  type: String,
  required: true,
};

const locationSchema = mongoose.Schema({
  latitude: { type: Number },
  longitude: { type: Number },
});

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: reqString,

  phone: { type: Number, unique: true },
  location: locationSchema,
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default:"USER",
  },
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  this.dateModified = new Date();
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("users", userSchema);

export default User;
