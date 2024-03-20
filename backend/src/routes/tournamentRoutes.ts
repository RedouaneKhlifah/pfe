import { Router } from "express";
import {
    createTournament,
    deleteTournament,
    getAllTournaments,
    getOneTournament,
    updateTournament,
    getMyTournaments
} from "../controllers/TournamentController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

/**
 * @GET
 * @desc // get all tournaments
 * @access public
 */

router.get("/", authMiddleware, getAllTournaments);

/**
 * @GET
 * @desc // get tournaments by userId
 * @access public
 */

router.get("/myTournaments", getMyTournaments);

/**
 * @GET
 * @desc // get one tournament
 * @access public
 */

router.get("/:id", getOneTournament);

/**
 * @POST
 * @desc // create tournament
 * @access public
 */

router.post("/", authMiddleware, createTournament);

/**
 * @PUTCH
 * @desc // update tournament
 * @access private
 */

router.patch("/:id", updateTournament);

/**
 * @DELETE
 * @desc // delete tournament
 * @access private
 */

router.delete("/:id", deleteTournament);

export default router;
