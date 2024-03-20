import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { PlayerService } from "../services/playerService";
import { PlayerSchema, validator } from "../validator/JoiSchemas";
import { IPlayer } from "../../types/playerTypes";
import { checkUserbyId } from "../services/userServices";

const getAllPlayers = asyncHandler(async (_req: Request, res: Response) => {
    const players = await PlayerService.getAllPlayers();
    res.status(200).json(players);
});

const getOnePlayer = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;
    const player = await PlayerService.getPlayerById(userId!);
    if (!player) {
        res.status(404).json({ message: "Player not found" });
    } else {
        res.status(200).json(player);
    }
});

const createPlayer = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    checkUserbyId(userId);

    const { nickname, position, age, location, image } = req.body;
    const newPlayerData: IPlayer = {
        nickname,
        position,
        age,
        location,
        image
    };

    const validationErrors = validator(PlayerSchema, newPlayerData);

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const newPlayer = await PlayerService.createNewPlayer(newPlayerData);
    res.status(201).json({
        message: "Player created successfully.",
        newPlayer
    });
});

const updatePlayer = asyncHandler(async (req: Request, res: Response) => {
    const playerId = req.params.playerId;
    const { nickname, position, age, location, image } = req.body;
    const updatedPlayerData: IPlayer = {
        nickname,
        position,
        age,
        location,
        image
    };

    const validationErrors = validator(PlayerSchema, updatedPlayerData);

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const updatedPlayer = await PlayerService.updatePlayerById(
        playerId,
        updatedPlayerData
    );
    if (!updatedPlayer) {
        res.status(404).json({ message: "Player not found" });
        return;
    }

    res.status(200).json({
        message: "Player updated successfully.",
        updatedPlayer
    });
});

const deletePlayer = asyncHandler(async (req: Request, res: Response) => {
    const playerId = req.params.id;
    const deletedPlayer = await PlayerService.deletePlayerById(playerId);
    if (!deletedPlayer) {
        res.status(404).json({ message: "Player not found" });
        return;
    }
    res.status(200).json({ message: "Player deleted successfully." });
});

export {
    getAllPlayers,
    getOnePlayer,
    createPlayer,
    updatePlayer,
    deletePlayer
};
