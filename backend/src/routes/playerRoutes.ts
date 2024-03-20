import { Router } from "express";
import {
    createPlayer,
    deletePlayer,
    getAllPlayers,
    getOnePlayer,
    updatePlayer
} from "../controllers/playerController";

const router = Router();

/**
 * @GET
 * @desc Get all players
 * @access Public
 */
router.get("/", getAllPlayers);

/**
 * @GET
 * @desc Get one player by ID
 * @access Public
 */
router.get("/:id", getOnePlayer);

/**
 * @POST
 * @desc Create a new player
 * @access Public
 */
router.post("/:userId", createPlayer);

/**
 * @PATCH
 * @desc Update a player by ID
 * @access Private
 */
router.patch("/:playerId", updatePlayer);

/**
 * @DELETE
 * @desc Delete a player by ID
 * @access Private
 */
router.delete("/:id", deletePlayer);

export default router;
