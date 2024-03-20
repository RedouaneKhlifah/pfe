import mongoose, { Schema, Document } from "mongoose";
import { ITournament } from "../../types/tournamentTypes";

const tournamentSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        teams: [
            {
                type: Schema.Types.ObjectId,
                ref: "Team"
            }
        ]
    },
    {
        timestamps: true
    }
);
export interface TournamentDocument extends Document, ITournament {}

const Tournament = mongoose.model<TournamentDocument>(
    "Tournament",
    tournamentSchema
);

export default Tournament;
