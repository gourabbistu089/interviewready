

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  // field for dashboard
  stats: {
    questionsCompleted: { type: Number, default: 0 },
    mockInterviews: { type: Number, default: 0 },
    blogsWritten: { type: Number, default: 0 },
    modulesCompleted: { type: Number, default: 0 },
  },
  
  // recent activity
  activity: {
    latestBlog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      default: null,
    },
    latestSubtopic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtopic",
      default: null,
    },
    latestInterviewSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewSession",
      default: null,
    },
    latestQuestion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      default: null,
    },
  },
  revisionQuestions: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  
  isActive: {
    type: Boolean,
    default: true,
  },
    isVerified: {
    type: Boolean,
    default:false
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate profile picture URL from initials
userSchema.methods.generateProfilePicture = function() {
  const initials = `${this.firstName.charAt(0).toUpperCase()}${this.lastName.charAt(0).toUpperCase()}`;
  
  // Option 1: Using UI Avatars service (free)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.firstName + ' ' + this.lastName)}&background=random&color=fff&size=200&bold=true`;
  
  // Option 2: Using DiceBear Avatars (alternative)
  // return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(this.firstName + ' ' + this.lastName)}&backgroundColor=random`;
  
  // Option 3: Simple colored background with initials
  // const colors = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FECA57', 'FF9FF3', 'F38BA8', '6BCF7F'];
  // const colorIndex = (initials.charCodeAt(0) + initials.charCodeAt(1)) % colors.length;
  // return `https://ui-avatars.com/api/?name=${initials}&background=${colors[colorIndex]}&color=fff&size=200&bold=true`;
};

// Auto-generate profile picture before saving (only if not manually set)
userSchema.pre("save", function (next) {
  // Generate profile picture if it's not already set or if name has changed
  if (!this.profilePicture || this.isModified("firstName") || this.isModified("lastName")) {
    this.profilePicture = this.generateProfilePicture();
  }
  next();
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update updatedAt field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60, partialFilterExpression: { isVerified: false } }
);

module.exports = mongoose.model("User", userSchema);