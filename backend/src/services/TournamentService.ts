import { ITournament } from "../../types/tournamentTypes";
import Tournament, { TournamentDocument } from "../models/tournamentModel";

const getAllTournaments = async (): Promise<TournamentDocument[]> => {
    const tournaments = await Tournament.find({}).populate("user");
    return tournaments;
};

const createNewTournament = async (
    newTournamentData: ITournament
): Promise<TournamentDocument> => {
    console.log("Create new tournament");
    console.log(newTournamentData);
    const newTournament = new Tournament(newTournamentData);
    await newTournament.save();
    return newTournament;
};

const getTournamentById = async (
    tournamentId: string
): Promise<TournamentDocument | null> => {
    const tournament = await Tournament.findById(tournamentId);
    return tournament;
};

const getTournamentsByUserId = async (
    userId: string
): Promise<TournamentDocument[]> => {
    const tournament = await Tournament.find({ user: userId });
    return tournament;
};

const updateTournamentById = async (
    tournamentId: string,
    updatedTournamentData: ITournament
): Promise<TournamentDocument | null> => {
    const tournament = await Tournament.findByIdAndUpdate(
        tournamentId,
        updatedTournamentData,
        { new: true }
    );
    if (!tournament) {
        throw new Error("Tournament not found");
    }
    return tournament;
};

const deleteTournamentById = async (
    tournamentId: string
): Promise<TournamentDocument | null> => {
    const tournament = await Tournament.findByIdAndDelete(tournamentId);
    if (!tournament) {
        throw new Error("Tournament not found");
    }
    return tournament;
};

export const TournamentService = {
    getAllTournaments,
    createNewTournament,
    getTournamentById,
    updateTournamentById,
    deleteTournamentById,
    getTournamentsByUserId
};
