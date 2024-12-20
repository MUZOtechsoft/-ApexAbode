import express from "express";
import { allBookings, bookVisit, cancelBookings, creatUser, getAllfav, toFav } from "../Controller/userCntrl.js";

const router = express.Router();

router.post("/register", creatUser);
router.post("/bookVisit/:id", bookVisit);
router.get("/allBookings", allBookings);
router.post("/removeBooking/:id", cancelBookings);
router.post("/toFav/:rid", toFav);
router.post("/getAllfav", getAllfav);

export { router as userRouter };
