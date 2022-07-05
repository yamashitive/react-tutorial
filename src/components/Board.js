import Square from './Square';

const Board = (props) => {
  const {squares, onClick, winLine} = props;

  const renderSquare = (i) => {
    let isWinSquare;
    if (winLine) {
      isWinSquare = winLine.indexOf(i) !== -1 ? true : false;
    } else {
      isWinSquare = null;
    }

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
          const arr = [];
          for(let j = 0; j < 3; j++) {
            arr.push(renderSquare(j+i*3));
          }
          return arr;
        })()}
      </div>
    )
  }

  return (
    <div>
      {(() => {
        const arr = [];
        for(let i = 0; i < 3; i++) {
          arr.push(renderBoadRow(i));
        }
        return arr;
      })()}
    </div>
  );
}

export default Board;