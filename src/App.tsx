import * as React from "react";
import { connect } from 'react-redux'
import "./App.css";
import { Player } from "./domain/Player";
import { TBoard, Game } from "./domain/Game";

import {
  findLowestEmptyIndex,
  getGameState,
  togglePlayerTurn,
  getPrettyPlayer
} from './useCases/useCases';

interface IState {
  board: TBoard;
  playerTurn: Player;
  gameState: Game | Player;
  isStartGame: boolean,
}

interface IMapDispatchToProps extends IState {
  makeMove: (obj) => void,
  startGame: (obj) => void,
  initialGame: () => void,
  restartGame: () => void,
}

type IProps = IMapDispatchToProps & typeof mapDispatchToProps;

class App extends React.Component<IProps, {}> {
  public startGame = () => {
    const { startGame } = this.props;
    startGame({
      isStartGame: true,
    })
  };

  public restartGame = () => {
    const { restartGame } = this.props;
    restartGame();
  }

  public renderCells = () => {
    const { board } = this.props;
    return board.map((player, index) => this.renderCell(player, index));
  };

  public handleOnClick = (index: number) => () => {
    const {gameState} = this.props
    if (gameState !== Game.Ongoing) return
    const column = index % 7;

    this.makeMove(column);
  };

  public makeMove(column: number) {
    const { board, playerTurn, makeMove } = this.props;
    const index = findLowestEmptyIndex(board, column);
    const newBoard = board.slice();
    newBoard[index] = playerTurn;
    const gameState = getGameState(newBoard);

    makeMove({
      board: newBoard,
      playerTurn: togglePlayerTurn(playerTurn),
      gameState
    });
  }

  public renderCell = (player: Player, index: number) => {
    return (
      <div
        className="cell"
        key={index}
        onClick={this.handleOnClick(index)}
        data-player={getPrettyPlayer(player)}
      />
    );
  };

  public renderGameStatus = () => {
    const { gameState } = this.props;
    const { Ongoing, Draw, PlayerOneWin, PlayerTwoWin } = Game;

    let text;
    if (gameState === Ongoing) {
      text = 'Game is ongoing'
    } else if (gameState === Draw) {
      text = 'Game is a draw'
    } else if (gameState === PlayerOneWin) {
      text = 'Player one won'
      alert('Player one won');
    } else if (gameState === PlayerTwoWin) {
      text = 'Player two won'
      alert('Player two won');
    }

    return <div>{text}</div>
  }

  public render() {
    const { isStartGame } = this.props;

    return (
      <div className="App">
        <h2>{this.renderGameStatus()}</h2>
        <div className="controlPanel">
          {
            !isStartGame ?
              <button onClick={this.startGame}>Start Game!</button>
              : <button onClick={this.restartGame}>Restart game</button>
          }
        </div>
        {
          isStartGame ? <div className="board">{this.renderCells()}</div> : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IState, ownProps: any = {}) => {
  return {
    board: state.board,
    playerTurn: state.playerTurn,
    isStartGame: state.isStartGame,
    gameState: state.gameState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeMove: (stateObj: IState) => {
      dispatch({type: "SET_MAKE_MOVE", payload: stateObj})
    },
    startGame: (stateObj: IState) => {
      dispatch({type: "SET_START_GAME", payload: stateObj})
    },
    initialGame: () => {
      dispatch({type: "SET_INITIAL_GAME"})
    },
    restartGame: () => {
      dispatch({type: "SET_RESTART_GAME"})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
