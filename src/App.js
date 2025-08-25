import logo from "./logo.svg";
import "./App.css";
import {useState} from "react";
import Board from "./Board";


function App() {
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [winner, setWinner] = useState(null);
  const [nextPlayerName, setNextPlayerName] = useState("X");

  function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const handleClick = (i) => {
    const nextHistory = history.slice(0, stepNumber + 1);
    const currentStep = nextHistory[nextHistory.length - 1];
    const squares = currentStep.squares.slice();
    if (winner || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";
    setHistory(nextHistory.concat([{ squares }]));
    setStepNumber(nextHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (move) => {
    setStepNumber(move);
    setXIsNext(move % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;
  }
  
  function handleClick(rowIndex, squareIndex) {
    console.log(rowIndex, squareIndex);

    // 이미 선택된 칸인지 확인
    if (board[rowIndex][squareIndex] !== null || winner) {
      return;
    }

    // 새로운 배열을 생성 (깊은 복사)
    let newBoard = board.map((row) => [...row]);
    newBoard[rowIndex][squareIndex] = nextPlayerName;
    setBoard(newBoard);
    setWinner(calculateWinner(newBoard));
    setNextPlayerName(nextPlayerName === "X" ? "O" : "X")
    
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );

  function calculateWinner(board){
  

    // 같은 값 3개면 그 값을 반환(X/O), 아니면 null
    const same3 = (a, b, c) => (a && a === b && b === c ? a : null);

    let v;

    // 2) 가로 3줄
    if ((v = same3(board[0][0], board[0][1], board[0][2])))
      return v;
    if ((v = same3(board[1][0], board[1][1], board[1][2])))
      return v;
    if ((v = same3(board[2][0], board[2][1], board[2][2])))
      return v;

    // 3) 세로 3줄
    if ((v = same3(board[0][0], board[1][0], board[2][0])))
      return v;
    if ((v = same3(board[0][1], board[1][1], board[2][1])))
      return v;
    if ((v = same3(board[0][2], board[1][2], board[2][2])))
      return v;

    // 4) 대각 2줄
    if ((v = same3(board[0][0], board[1][1], board[2][2])))
      return v;
    if ((v = same3(board[0][2], board[1][1], board[2][0])))
      return v;


    return null;
    }
}

export default App;
