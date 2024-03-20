import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { TournamentService } from "../services/TournamentService";
import { TournamentSchema, validator } from "../validator/JoiSchemas";
import { ITournament } from "../../types/tournamentTypes";

const getAllTournaments = asyncHandler(async (_req: Request, res: Response) => {
    const tournaments = await TournamentService.getAllTournaments();
    res.status(200).json(tournaments);
});

const getOneTournament = asyncHandler(async (req: Request, res: Response) => {
    const tournamentId = req.params.id;
    const tournament = await TournamentService.getTournamentById(tournamentId);
    if (!tournament) {
        res.status(404).json({ message: "Tournament not found" });
    } else {
        res.status(200).json(tournament);
    }
});

const getMyTournaments = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;
    const tournaments = await TournamentService.getTournamentsByUserId(userId!);
    res.status(200).json(tournaments);
});

const createTournament = asyncHandler(async (req: Request, res: Response) => {
    const { name, location, startDate, endDate, description, image } = req.body;
    const newTournamentData: ITournament = {
        name,
        location,
        startDate,
        endDate,
        description,
        image
    };

    const validationErrors = validator(TournamentSchema, newTournamentData);

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const newTournament = await TournamentService.createNewTournament({
        ...newTournamentData,
        // @ts-ignore
        user: req.userId
    });

    res.status(201).json({
        message: "Tournament created successfully.",
        newTournament
    });
});

const updateTournament = asyncHandler(async (req: Request, res: Response) => {
    const tournamentId = req.params.id;
    const { name, location, startDate, endDate, description, image } = req.body;
    const updatedTournamentData: ITournament = {
        name,
        location,
        startDate,
        endDate,
        description,
        image
    };

    const validationErrors = validator(TournamentSchema, updatedTournamentData);

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const updatedTournament = await TournamentService.updateTournamentById(
        tournamentId,
        updatedTournamentData
    );
    if (!updatedTournament) {
        res.status(404).json({ message: "Tournament not found" });
        return;
    }

    res.status(200).json({
        message: "Tournament updated successfully.",
        updatedTournament
    });
});

const deleteTournament = asyncHandler(async (req: Request, res: Response) => {
    const tournamentId = req.params.id;
    const deletedTournament = await TournamentService.deleteTournamentById(
        tournamentId
    );
    if (!deletedTournament) {
        res.status(404).json({ message: "Tournament not found" });
        return;
    }
    res.status(200).json({ message: "Tournament deleted successfully." });
});

export {
    getAllTournaments,
    getOneTournament,
    createTournament,
    updateTournament,
    deleteTournament,
    getMyTournaments
};
