import express from "express";
import { addrelations, deleterelations, getrelations } from "../Controllers/relation.js";

const router = express.Router()

router.get("/", getrelations)
router.post("/add", addrelations)
router.delete("/delete", deleterelations)


export default router