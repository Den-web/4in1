import {intitializeBoard} from "../useCases/useCases";
import {Player} from "../domain/Player";
import {Game} from "../domain/Game";

const initialState = {
  isStartGame: false,
  board: intitializeBoard(),
  playerTurn: Player.One,
  gameState: Game.Ongoing
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case "SET_MAKE_MOVE":
      return {
        ...state,
        board: action.payload.board,
        playerTurn: action.payload.playerTurn,
        gameState: action.payload.gameState,
      }
    case "SET_START_GAME":
      return {
        ...state,
        isStartGame: action.payload.isStartGame,
      }
    case "SET_INITIAL_GAME":
      return {
        ...state,
      }
    case "SET_RESTART_GAME":
      return {
        ...state,
        ...initialState
      }

    default: return state
  }
}

export default reducer;