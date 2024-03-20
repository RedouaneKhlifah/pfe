import { IPlayer } from "../../types/playerTypes";
import Player, { PlayerDocument } from "../models/playerModel";

const getAllPlayers = async (): Promise<PlayerDocument[]> => {
    return await Player.find({});
};

const createNewPlayer = async (
    newPlayerData: IPlayer
): Promise<PlayerDocument> => {
    return await Player.create(newPlayerData);
};

const getPlayerById = async (
    userId: string
): Promise<PlayerDocument | null> => {
    return await Player.findById({ user: userId });
};

const updatePlayerById = async (
    playerId: string,
    updatedPlayerData: IPlayer
): Promise<PlayerDocument | null> => {
    const player = await Player.findByIdAndUpdate(playerId, updatedPlayerData, {
        new: true
    });
    if (!player) {
        throw new Error("Player not found");
    }
    return player;
};

const deletePlayerById = async (
    playerId: string
): Promise<PlayerDocument | null> => {
    const player = await Player.findByIdAndDelete(playerId);
    if (!player) {
        throw new Error("Player not found");
    }
    return player;
};

export const PlayerService = {
    getAllPlayers,
    createNewPlayer,
    getPlayerById,
    updatePlayerById,
    deletePlayerById
};
