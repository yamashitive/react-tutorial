const Square = (props) => {
  const {value, onClick, isWinSquare} = props;

  return (
    <button 
      className="square"
      style={{backgroundColor: isWinSquare ? 'lime' : 'white'}}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;