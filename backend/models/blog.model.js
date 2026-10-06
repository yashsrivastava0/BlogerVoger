import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  blogImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minlength: [200, "Should caontain atleast 200 characters!"],
  },
  adminName: {
    type: String,
  },
  adminPhoto: {
    type: String,
  },
    likes: [{
    type: mongoose.Schema.ObjectId,
    ref: "User",
  }],
  comments: [{
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  tags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});
export const Blog = mongoose.model("Blog", blogSchema);
