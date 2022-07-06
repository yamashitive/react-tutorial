import Square from './Square';

const Board = (props) => {
  const {squares, onClick, winLine} = props;

  const renderSquare = (i) => {
    const isWinSquare = winLine && winLine.some(winSquare => winSquare ===  i);

    return (
      <Square 
        value={squares[i]}
        onClick={() => onClick(i)}
        key={i}
        isWinSquare={isWinSquare}
      />
    );
  }

  const renderBoadRow = (i) => {
    return (
      <div className="board-row" key={i}>
        {(() => {
          const cols = [];
          for(let j = 0; j < 3; j++) {
            cols.push(renderSquare(j+i*3));
          }
          return cols;
        })()}
      </div>
    )
  }

  return (
    <div>
      {(() => {
        const rows = [];
        for(let i = 0; i < 3; i++) {
          rows.push(renderBoadRow(i));
        }
        return rows;
      })()}
    </div>
  );
}

export default Board;