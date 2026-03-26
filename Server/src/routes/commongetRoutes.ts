import { getEventById } from "../controllers/getEventById.js";
import { getEventsByYear } from "../controllers/getEventController.js";
import { getMemberById } from "../controllers/getMemberbyId.js";
import { getMembersByYear } from "../controllers/getMemberController.js";
import { getAllYears } from "../controllers/getYear.js";
import express from "express";

const commonGetRouter = express.Router();



commonGetRouter.get("/years", getAllYears);
commonGetRouter.get("/events/:yearId", getEventsByYear);
commonGetRouter.get("/members/:yearId", getMembersByYear);
commonGetRouter.get("/event/:eventId",getEventById);
commonGetRouter.get("/member/:memberId",getMemberById);


export default commonGetRouter;