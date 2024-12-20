import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { residencyRouter } from "./Routes/residencyRouter.js";
import { userRouter } from "./Routes/userRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT, ()=> {
    console.log(`server at ${PORT}`)
})

app.use("/api/user", userRouter)
app.use("/api/residency", residencyRouter)