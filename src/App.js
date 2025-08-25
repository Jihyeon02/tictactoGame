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
  const [history, setHistory] = useState(null);
  
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
    <div>
      <div>{winner === null ? `Next Player : ${nextPlayerName}` : `Winner is ${winner}`}</div>
      <Board board={board} onItemClick={handleClick}/>
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
