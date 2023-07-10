// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, inputDate, inputTitle, isStarred} = appointmentDetails

  const important = () => {
    toggleStar(id)
  }

  const dateFormat = format(new Date(inputDate), 'dd MMMM yyyy, EEEE')
  const imageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="star-container">
        <p className="appointment-item-title">{inputTitle}</p>
        <button
          className="star-button"
          type="button"
          data-testid="star"
          onClick={important}
        >
          <img src={imageUrl} alt="star" />
        </button>
      </div>
      <p className="appointment-item-date">Date: {dateFormat}</p>
    </li>
  )
}

export default AppointmentItem
