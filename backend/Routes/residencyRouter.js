import express from "express";
import { createResidency, getAllResidencies, getResidencies } from "../Controller/resdCtrl.js";

const router = express.Router();

router.post("/create", createResidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidencies);

export { router as residencyRouter };

