import mongoose, { Schema, Document } from "mongoose";
import { IPlayer } from "../../types/playerTypes";

const playerSchema: Schema = new Schema(
    {
        position: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export interface PlayerDocument extends Document, IPlayer {}

const Player = mongoose.model<PlayerDocument>("Player", playerSchema);

export default Player;
