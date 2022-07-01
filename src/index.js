import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

const Board = (props) => {
  const {squares, onClick} = props;

  const renderSquare = (i) => {
    return (
      <Square 
        value={squares[i]}
        onClick={() => onClick(i)}
        key={i}
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

const Game = () => {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isHistoryAsc, setIsHistoryAsc] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const handleClick = (i) => {
    const clickedHistory = history.slice(0, stepNumber + 1);
    const current = clickedHistory[clickedHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    
    setHistory(
      clickedHistory.concat([{
        squares: squares,
        squareNum: i,
      }])
    );
    setStepNumber(clickedHistory.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const calcColRow = (i) => {
    let colNum;
    let rowNum;

    const colGroups = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];
    const rowGroups = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    colGroups.map((arr, index) => {
      if(arr.indexOf(i) !== -1) {
        colNum = index + 1;
      }
    })

    rowGroups.map((arr, index) => {
      if(arr.indexOf(i) !== -1) {
        rowNum = index +1;
      }
    })

    return `( Col:${colNum}, Row:${rowNum} )`;
  }

  const handleReverse = () => {
    setIsHistoryAsc(!isHistoryAsc);
  }

  const moves = history.map((step, move) => {
    const clickedSquare = calcColRow(step.squareNum);
    const desc = move ?
      `Go to move #${move} ${clickedSquare}`:
      'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {stepNumber === move ? <b>{desc}</b> : desc}
        </button>
      </li>
    );
  });

  const sortedMoves = isHistoryAsc ? [...moves].reverse() : [...moves];

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol reversed={isHistoryAsc ? 'reversed' : ''}>{sortedMoves}</ol>
        <button onClick={() => handleReverse()}>reverse</button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
