import { Router } from "express";
import {
    createTeam,
    deleteTeam,
    getAllTeams,
    getOneTeam,
    updateTeam
} from "../controllers/teamController";

const router = Router();

/**
 * @GET
 * @desc Get all teams
 * @access Public
 */
router.get("/", getAllTeams);

/**
 * @GET
 * @desc Get one team by ID
 * @access Public
 */
router.get("/:id", getOneTeam);

/**
 * @POST
 * @desc Create a new team
 * @access Public
 */
router.post("/", createTeam);

/**
 * @PATCH
 * @desc Update a team by ID
 * @access Private
 */
router.patch("/:id", updateTeam);

/**
 * @DELETE
 * @desc Delete a team by ID
 * @access Private
 */
router.delete("/:id", deleteTeam);

export default router;
