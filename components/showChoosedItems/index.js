import './index.css'

const ShowChoosedItems = props => {
  const {playerChoice, opponentChoice, playAgain, scoreTxt} = props

  return (
    <li className="list-choice">
      <div className="list-container">
        <img src={playerChoice} alt="player" className="choice" />
        <img src={opponentChoice} alt="opponent" className="choice" />
      </div>
      <h1 className="score-txt">{scoreTxt}</h1>
      <button onClick={playAgain} className="play-btn" type="button">
        Play again
      </button>
    </li>
  )
}

export default ShowChoosedItems
