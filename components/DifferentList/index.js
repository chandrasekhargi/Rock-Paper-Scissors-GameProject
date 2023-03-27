import './index.css'

const DifferentList = props => {
  const {listItems} = props
  const {id, imageUrl} = listItems
  const selectOption = () => {
    const {chooseOption} = props
    chooseOption(id)
  }

  return (
    <li className="thing-list">
      <button onClick={selectOption} type="button">
        <img src={imageUrl} alt={id} className="image" />
      </button>
    </li>
  )
}

export default DifferentList
