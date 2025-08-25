import Square from "./Square";


export default function Board({ board, onItemClick }) {
  return (
    <div>
      {board.map((row, rowIndex) => (
        <div className="board-row">
          {row.map((square, squareIndex) => (
            <Square
              value={square}
              onClick={() => onItemClick(rowIndex, squareIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
