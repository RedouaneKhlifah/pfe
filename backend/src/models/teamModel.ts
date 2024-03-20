import mongoose, { Schema, Document } from 'mongoose';
import { ITeam } from '../../types/teamTypes';

const teamSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export interface TeamDocument extends Document, ITeam {}

const Team = mongoose.model<TeamDocument>('Team', teamSchema);

export default Team;