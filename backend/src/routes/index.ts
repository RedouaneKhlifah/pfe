import express from "express";
import tournamentRoute from "./tournamentRoutes";
import userRoute from "./userRoutes";
import playerRoute from "./playerRoutes";
import teamRoute from "./teamRoutes";

const router = express.Router();

router.use("/tournament", tournamentRoute);
router.use("/auth", userRoute);
router.use("/player", playerRoute);
router.use("/team", teamRoute);

export default router;
