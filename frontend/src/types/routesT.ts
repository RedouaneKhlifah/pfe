import { IPlayer, Imatch } from "./api.Interface";

export type RootScreenRoutesT = {
  PlayerDetailsScreen: { player: IPlayer };
  MatcheDetailsScreen: { match: Imatch };
  matches: undefined;
  players: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
};
