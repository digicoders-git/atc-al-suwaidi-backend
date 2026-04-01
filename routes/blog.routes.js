import express from "express";
import { createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog } from "../controllers/blog.controller.js";
import { uploadImage } from "../middleware/multerImage.js";

const blogRouter = express.Router();

blogRouter.post("/create", uploadImage.single("image"), createBlog);
blogRouter.get("/get", getAllBlogs);
blogRouter.get("/get/:id", getBlog);
blogRouter.put("/update/:id", uploadImage.single("image"), updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);

export default blogRouter;
