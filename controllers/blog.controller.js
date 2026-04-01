import Blog from "../models/blog.models.js";
import fs from "fs";
import path from "path";

// CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const { heading, description, author, tags } = req.body;

    if (!heading || !description) {
      return res.status(400).json({ success: false, message: "Heading and Description are required" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;

    const blog = await Blog.create({
      heading,
      description,
      image: { filename: req.file.filename, path: imageUrl },
      author: author || "Admin",
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
    });

    return res.status(201).json({ success: true, message: "Blog created successfully", data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL BLOGS
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE BLOG
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const { heading, description, author, tags, isPublished } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    if (heading) blog.heading = heading;
    if (description) blog.description = description;
    if (author) blog.author = author;
    if (tags) blog.tags = tags.split(",").map((t) => t.trim());
    if (isPublished !== undefined) blog.isPublished = isPublished;

    // New image upload karo, purani delete karo
    if (req.file) {
      if (blog.image?.filename) {
        const oldPath = path.join("uploads", blog.image.filename);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      const imageUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
      blog.image = { filename: req.file.filename, path: imageUrl };
    }

    await blog.save();
    return res.status(200).json({ success: true, message: "Blog updated successfully", data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    // Image file delete karo
    if (blog.image?.filename) {
      const filePath = path.join("uploads", blog.image.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Blog.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
