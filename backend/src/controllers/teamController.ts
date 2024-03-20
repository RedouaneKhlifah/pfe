import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ITeam } from "../../types/teamTypes";
import { TeamSchema, validator } from "../validator/JoiSchemas";
import { teamService } from "../services/teamServices";

const getAllTeams = asyncHandler(async (_req: Request, res: Response) => {
    const teams = await teamService.getAllTeams();
    res.status(200).json(teams);
});

const getOneTeam = asyncHandler(async (req: Request, res: Response) => {
    const teamId = req.params.id;
    const team = await teamService.getTeamById(teamId);
    if (!team) {
        res.status(404).json({ message: "Team not found" });
    } else {
        res.status(200).json(team);
    }
});

const createTeam = asyncHandler(async (req: Request, res: Response) => {
    const { name, location, image } = req.body;
    const newTeamData: ITeam = {
        name,
        location,
        image
    };

    const validationErrors = validator(TeamSchema, newTeamData);

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const newTeam = await teamService.createNewTeam(newTeamData);
    res.status(201).json({
        message: "Team created successfully.",
        newTeam
    });
});

const updateTeam = asyncHandler(async (req: Request, res: Response) => {
    const teamId = req.params.id;
    const { name, location, image } = req.body;
    const updatedTeamData: ITeam = {
        name,
        location,
        image
    };

    const validationErrors = validator(TeamSchema, updatedTeamData);

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const updatedTeam = await teamService.updateTeamById(
        teamId,
        updatedTeamData
    );
    if (!updatedTeam) {
        res.status(404).json({ message: "Team not found" });
        return;
    }

    res.status(200).json({
        message: "Team updated successfully.",
        updatedTeam
    });
});

const deleteTeam = asyncHandler(async (req: Request, res: Response) => {
    const teamId = req.params.id;
    const deletedTeam = await teamService.deleteTeamById(teamId);
    if (!deletedTeam) {
        res.status(404).json({ message: "Team not found" });
        return;
    }
    res.status(200).json({ message: "Team deleted successfully." });
});

export { getAllTeams, getOneTeam, createTeam, updateTeam, deleteTeam };
