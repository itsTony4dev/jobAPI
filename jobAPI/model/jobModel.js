const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "Job title must be at least 5 characters long"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [50, "Job description must be at least 50 characters long"],
    },
    category: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"],
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
      required: [true, "Job type is required"],
    },
    skills: {
      type: String,
      trim: true,
      required: [true, "Skills are required"],
      message: "At least one skill is required",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("job", jobSchema);

module.exports = Job;
