import logo from "./logo.svg";
import "./App.css";
import { useMemo, useState } from "react";
import Board from "./Board";


function App() {
  // 1) 히스토리: 보드 스냅샷들을 쌓는다
  const emptyBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const [history, setHistory] = useState([emptyBoard]); // 히스토리 시작은 한 장
  const [stepNumber, setStepNumber] = useState(0);      // 지금 보고 있는 히스토리 인덱스

  // 2) 현재 보드 & 다음 차례
  const current = history[stepNumber];
  const xIsNext = stepNumber % 2 === 0;

  // 3) 승자 계산 (현재 보드 기준)
  const winner = useMemo(() => calculateWinner(current), [current]);

  // 4) 클릭 처리: 현재 시점까지의 히스토리만 남기고 새 보드 스냅샷을 추가
  function handleClick(rowIndex, colIndex) {
    if (winner || current[rowIndex][colIndex]) return;

    const historyUntilNow = history.slice(0, stepNumber + 1);
    const latest = historyUntilNow[historyUntilNow.length - 1];

    // 깊은 복사로 새 보드 만들기
    const nextBoard = latest.map((row) => [...row]);
    nextBoard[rowIndex][colIndex] = xIsNext ? "X" : "O";

    setHistory(historyUntilNow.concat([nextBoard]));
    setStepNumber(historyUntilNow.length); // 새 스냅샷으로 이동
  }

  // 5) 타임트래블
  function jumpTo(move) {
    setStepNumber(move);
  }

  // 6) 상태 텍스트
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  // 7) 히스토리 이동 버튼 렌더링
  const moves = history.map((_, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game" style={{ padding: 16, fontFamily: "sans-serif" }}>
      <div className="game-board" style={{ marginBottom: 12 }}>
        <div style={{ marginBottom: 8 }}>{status}</div>
        <Board board={current} onItemClick={handleClick} />
      </div>

      <div className="game-info">
        <ol style={{ paddingLeft: 16 }}>{moves}</ol>
        <button onClick={() => { setHistory([emptyBoard]); setStepNumber(0); }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;

// ===== 유틸 =====
function calculateWinner(board) {
  const same3 = (a, b, c) => (a && a === b && b === c ? a : null);
  let v;

  // 가로
  if ((v = same3(board[0][0], board[0][1], board[0][2]))) return v;
  if ((v = same3(board[1][0], board[1][1], board[1][2]))) return v;
  if ((v = same3(board[2][0], board[2][1], board[2][2]))) return v;

  // 세로
  if ((v = same3(board[0][0], board[1][0], board[2][0]))) return v;
  if ((v = same3(board[0][1], board[1][1], board[2][1]))) return v;
  if ((v = same3(board[0][2], board[1][2], board[2][2]))) return v;

  // 대각
  if ((v = same3(board[0][0], board[1][1], board[2][2]))) return v;
  if ((v = same3(board[0][2], board[1][1], board[2][0]))) return v;

  return null;
}
