const Job = require("../model/jobModel");

const createJob = async (req, res) => {
  const {
    title,
    description,
    location,
    category,
    company,
    jobType,
    salary,
    skills,
  } = req.body;

  if (
    !title ||
    !description ||
    !location ||
    !category ||
    !company ||
    !jobType ||
    !salary ||
    !skills
  )
    return res.status(400).json({ error: "All fields are required" });

  try {
    const job = await Job.create({
      title,
      description,
      location,
      category,
      company,
      jobType,
      salary,
      skills,
    });

    res.status(201).json({ job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    if (!jobs) throw new Error("Something went wrong, please try again later");
    res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
};

const getJob = async (req, res) => {
  try {
    const { job_id } = req.params;
    const job = await Job.findById(job_id);
    if (!job) throw new Error("Job not found");
    res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const updateJob = async (req, res) => {
  try {
    const { job_id } = req.params;
    const job = await Job.findByIdAndUpdate(job_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({ job });
  } catch (error) {}
};

const deleteJob = (req, res) => {
  try {
    const { job_id } = req.params;
    const job = Job.findByIdAndRemove(job_id);
    if (!job) throw new Error("Job not found");
    res.status(200).json({ msg: "Job deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
module.exports = { createJob, getAllJobs, getJob, updateJob, deleteJob };
