const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Female", "Male", "Others"],
    },
    phone: {
      type: String, // Changed to String for phone flexibility
      required: true,
    },
    disasterType: {
      type: String,
      required: true,
      enum: ["flood", "earthquake", "fire", "hurricane", "tornado", "other"],
    },
    stakeholderName: {
      type: String,
      required: true,
    },
    stakeholderPhone: {
      type: String, // Changed to String for phone flexibility
      required: true,
    },
    stakeholderPosition: {
      type: String,
      required: true,
      enum: ["leader", "coordinator", "other"],
    },
    location: {
      type: String,
      required: true,
    },
    report: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", 'admin', 'manager'],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check if the entered password matches the hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
