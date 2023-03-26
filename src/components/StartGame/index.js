import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import 'reactjs-popup/dist/index.css'

import DifferentList from '../DifferentList'
import ShowChoosedItems from '../showChoosedItems'

import './index.css'
import {
  BgContainer,
  ScoreCard,
  ScoreCardContainer,
} from '../../styledComponents'

const matchStatus = {
  win: 'YOU WON',
  lose: 'YOU LOSE',
  draw: 'IT IS DRAW',
}

const playGame = {
  isRock: 'ROCK',
  isPaper: 'PAPER',
  isScissor: 'SCISSORS',
}

class StartGame extends Component {
  state = {
    playerChoice: '',
    opponentChoice: '',
    isGameInProgress: true,
    count: 0,
    scoreTxt: '',
  }

  clickOnPlayAgain = () => {
    this.setState({isGameInProgress: true})
  }

  chooseOption = id => {
    const {choicesList} = this.props
    const {opponentChoice, playerChoice, count, scoreTxt} = this.state

    const filterChoice = choicesList.find(each => each.id === id)
    // this.countingScoreAndGetResults()
    const lengthOfChoicesList = choicesList.length
    const getOpponentChoice =
      choicesList[Math.floor(Math.random() * lengthOfChoicesList)]

    let countingScore = count

    let resultTxt = scoreTxt

    if (
      playerChoice.id === playGame.isScissor &&
      opponentChoice.id === playGame.isPaper
    ) {
      resultTxt = matchStatus.win
      countingScore += 1
    } else if (
      playerChoice.id === playGame.isScissor &&
      opponentChoice.id === playGame.isRock
    ) {
      resultTxt = matchStatus.lose
      countingScore -= 1
    } else if (
      playerChoice.id === playGame.isPaper &&
      opponentChoice.id === playGame.isRock
    ) {
      resultTxt = matchStatus.win
      countingScore += 1
    } else if (
      playerChoice.id === playGame.isPaper &&
      opponentChoice.id === playGame.isScissor
    ) {
      resultTxt = matchStatus.lose
      countingScore -= 1
    } else if (
      playerChoice.id === playGame.isRock &&
      opponentChoice.id === playGame.isPaper
    ) {
      resultTxt = matchStatus.lose
      countingScore -= 1
    } else if (
      playerChoice.id === playGame.isRock &&
      opponentChoice.id === playGame.isScissor
    ) {
      resultTxt = matchStatus.win
      countingScore += 1
    } else if (opponentChoice.id === playerChoice.id) {
      resultTxt = matchStatus.draw
      countingScore += 0
    }

    this.setState({
      scoreTxt: resultTxt,
      count: countingScore,
      isGameInProgress: false,
      playerChoice: filterChoice,
      opponentChoice: getOpponentChoice,
    })
  }

  countScore = () => {
    const {count} = this.state
    return (
      <>
        <div>
          <h1 className="rock">Rock</h1>
          <h1 className="rock">Paper</h1>
          <h1 className="rock">Scissors</h1>
        </div>
        <ScoreCard>
          <h1 className="score-count">Score</h1>
          <h1 className="score-count">{count}</h1>
        </ScoreCard>
      </>
    )
  }

  showOptions = () => {
    const {choicesList, scoreTxt} = this.props

    return (
      <>
        <ul className="things-unordered-list">
          {choicesList.map(eachItem => (
            <DifferentList
              chooseOption={this.chooseOption}
              key={eachItem.id}
              listItems={eachItem}
              scoreTxt={scoreTxt}
            />
          ))}
        </ul>
      </>
    )
  }

  showScore = () => {
    const {opponentChoice, playerChoice, scoreTxt} = this.state
    return (
      <ShowChoosedItems
        playerChoice={playerChoice.imageUrl}
        opponentChoice={opponentChoice.imageUrl}
        playAgain={this.clickOnPlayAgain}
        scoreTxt={scoreTxt}
      />
    )
  }

  rulesBtn = () => (
    <Popup
      modal
      trigger={
        <button className="rules-btn" type="button">
          RULES
        </button>
      }
    >
      {close => (
        <div className="popup-close-container">
          <button className="close-btn" onClick={() => close()} type="button">
            <RiCloseLine size={20} />
          </button>
          <img
            src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
            alt="rules"
            className="rules-image"
          />
        </div>
      )}
    </Popup>
  )

  render() {
    const {
      isGameInProgress,
      opponentChoice,
      playerChoice,
      scoreTxt,
    } = this.state
    console.log(opponentChoice.id, playerChoice.id, scoreTxt)

    return (
      <BgContainer>
        <ScoreCardContainer>
          <div className="score-card-border">{this.countScore()}</div>
        </ScoreCardContainer>
        <div className="things-width">
          {isGameInProgress ? this.showOptions() : this.showScore()}
        </div>
        <div className="popup-btn">{this.rulesBtn()}</div>
      </BgContainer>
    )
  }
}

export default StartGame
