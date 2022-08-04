import { Player } from '../domain/Player';
import { TBoard, Game } from '../domain/Game';

export const intitializeBoard = () => {
  const board = [];
  for (let i = 0; i < 42; i++) {
    board.push(Player.None);
  }
  return board;
};

export const getPrettyPlayer = (player: Player) => {
  if (player === Player.None) return "noPlayer";
  if (player === Player.One) return "playerOne";
  if (player === Player.Two) return "playerTwo";
};

export const findLowestEmptyIndex = (board: TBoard, column: number) => {
  for (let i = 35 + column; i >= 0; i -= 7) {
    if (board[i] === Player.None) return i;
  }

  return -1;
};

export const togglePlayerTurn = (player: Player) => {
  return player === Player.One ? Player.Two : Player.One;
};

export const getGameState = (board: TBoard) => {
  // Checks wins horizontally
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c <= 4; c++) {
      const index = r * 7 + c;
      const boardSlice = board.slice(index, index + 4);

      const winningResult = checkWinningSlice(boardSlice);
      if (winningResult !== false) return winningResult;
    }
  }

  // check wins vertically
  for (let r = 0; r <= 2; r++) {
    for (let c = 0; c < 7; c++) {
      const index = r * 7 + c;
      const boardSlice = [
        board[index],
        board[index + 7],
        board[index + 7 * 2],
        board[index + 7 * 3]
      ];

      const winningResult = checkWinningSlice(boardSlice);
      if (winningResult !== false) return winningResult;
    }
  }

  // check wins diagonally
  for (let r = 0; r <= 2; r++) {
    for (let c = 0; c < 7; c++) {
      const index = r * 7 + c;

      // Checks diagonal down-left
      if (c >= 3) {
        const boardSlice = [
          board[index],
          board[index + 7 - 1],
          board[index + 7 * 2 - 2],
          board[index + 7 * 3 - 3]
        ];

        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) return winningResult;
      }

      // Checks diagonal down-right
      if (c <= 3) {
        const boardSlice = [
          board[index],
          board[index + 7 + 1],
          board[index + 7 * 2 + 2],
          board[index + 7 * 3 + 3]
        ];

        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) return winningResult;
      }
    }
  }

  if (board.some(cell => cell === Player.None)) {
    return Game.Ongoing
  } else {
    return Game.Draw
  }
};

export const checkWinningSlice = (miniBoard: Player[]) => {
  if (miniBoard.some(cell => cell === Player.None)) return false;

  if (
    miniBoard[0] === miniBoard[1] &&
    miniBoard[1] === miniBoard[2] &&
    miniBoard[2] === miniBoard[3]
  ) {
    return miniBoard[1];
  }

  return false;
};