import { IPlayer } from "./interface";

export const isAllAccumulated = (players: IPlayer[], pointsOfAccumulate: number) => {
  return players.every((player) => player.score >= pointsOfAccumulate);
}

export const isAccumulated = (player: IPlayer, pointsOfAccumulate: number) => {
  return player.score >= pointsOfAccumulate;
}