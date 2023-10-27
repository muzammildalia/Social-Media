import express from "express";
import { getPosts, addPost, deletePost, searchPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/search", searchPosts);
router.post("/add", addPost);
router.delete("/delete/:id", deletePost);

export default router;