import express from "express";
import { uploadImg } from "../Controllers/uploadFile.js";

const router = express.Router();

router.post("/", uploadImg);

export default router;