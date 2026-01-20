import express from "express";
import { upload } from "../middleware/multerPdf.js";
import {
  createJobApplication,
  getAllJobApplications,
  getJobApplication,
  updateJobApplication,
  deleteJobApplication,
} from "../controllers/jobApplication.controller.js";

const jobApplicationRouter = express.Router();

// POST - Create new job application
jobApplicationRouter.post("/create", upload.single("resume"), createJobApplication);

// GET - Get all job applications
jobApplicationRouter.get("/get", getAllJobApplications);

// GET - Get single job application by ID
jobApplicationRouter.get("/get/:id", getJobApplication);

// PUT - Update job application
jobApplicationRouter.put("/update/:id", upload.single("resume"), updateJobApplication);

// DELETE - Delete job application
jobApplicationRouter.delete("/delete/:id", deleteJobApplication);

export default jobApplicationRouter;