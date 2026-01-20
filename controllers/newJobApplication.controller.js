import NewJobApplication from "../models/jobApplication.models.js";
import fs from "fs";
import path from "path";

// CREATE JOB APPLICATION
export const createJobApplication = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, coverLetter } = req.body;

    // Validation
    if (!fullName || !email || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Email, and Phone Number are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Phone validation
    if (phoneNumber.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be at least 10 digits",
      });
    }

    // Resume required
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume/CV is required",
      });
    }

    // Create resume URL
    const resumeUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;

    const jobApplication = await NewJobApplication.create({
      fullName,
      email,
      phoneNumber,
      resume: {
        filename: req.file.filename,
        path: resumeUrl,
      },
      coverLetter: coverLetter || "",
    });

    res.status(201).json({
      success: true,
      message: "Job application submitted successfully",
      data: jobApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL JOB APPLICATIONS
export const getAllJobApplications = async (req, res) => {
  try {
    const applications = await NewJobApplication.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE JOB APPLICATION
export const getJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await NewJobApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE JOB APPLICATION
export const updateJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phoneNumber, coverLetter } = req.body;

    const application = await NewJobApplication.findById(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    // Update fields
    if (fullName) application.fullName = fullName;
    if (email) application.email = email;
    if (phoneNumber) application.phoneNumber = phoneNumber;
    if (coverLetter !== undefined) application.coverLetter = coverLetter;

    // Update resume if new file uploaded
    if (req.file) {
      // Delete old resume file
      if (application.resume?.filename) {
        const oldPath = path.join("uploads", application.resume.filename);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      const resumeUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
      application.resume = {
        filename: req.file.filename,
        path: resumeUrl,
      };
    }

    await application.save();

    res.status(200).json({
      success: true,
      message: "Job application updated successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE JOB APPLICATION
export const deleteJobApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await NewJobApplication.findById(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    // Delete resume file
    if (application.resume?.filename) {
      const filePath = path.join("uploads", application.resume.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await NewJobApplication.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Job application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};