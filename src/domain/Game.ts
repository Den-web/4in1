import { Player } from './Player';

export enum Game {
  Ongoing = -1,
  Draw = 0,
  PlayerOneWin = Player.One,
  PlayerTwoWin = Player.Two
}

export type TBoard = Player[];
