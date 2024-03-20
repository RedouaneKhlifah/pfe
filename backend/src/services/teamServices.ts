import { ITeam } from "../../types/teamTypes";
import Team, { TeamDocument } from "../models/teamModel";

const getAllTeams = async (): Promise<TeamDocument[]> => {
    return await Team.find({});
};

const createNewTeam = async (newTeamData: ITeam): Promise<TeamDocument> => {
    return await Team.create(newTeamData);
};

const getTeamById = async (teamId: string): Promise<TeamDocument | null> => {
    return await Team.findById(teamId);
};

const updateTeamById = async (
    teamId: string,
    updatedTeamData: ITeam
): Promise<TeamDocument | null> => {
    const team = await Team.findByIdAndUpdate(teamId, updatedTeamData, {
        new: true
    });
    if (!team) {
        throw new Error("Team not found");
    }
    return team;
};

const deleteTeamById = async (teamId: string): Promise<TeamDocument | null> => {
    const team = await Team.findByIdAndDelete(teamId);
    if (!team) {
        throw new Error("Team not found");
    }
    return team;
};

export const teamService = {
    getAllTeams,
    createNewTeam,
    getTeamById,
    updateTeamById,
    deleteTeamById
};
