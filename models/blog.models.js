import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: {
      filename: { type: String, required: true },
      path: { type: String, required: true },
    },
    author: { type: String, default: "Admin" },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
