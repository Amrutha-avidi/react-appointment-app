import {Component} from 'react'

import {v4 as uudiv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    inputTitle: '',
    inputDate: '',
    appointmentList: [],
    isFilterActive: false,
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {inputDate, inputTitle} = this.state
    const newAppointment = {
      id: uudiv4(),
      inputDate,
      inputTitle,
      isStarred: false,
      isFilterActive: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      inputDate: '',
      inputTitle: '',
    }))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onAddTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onAddDate = event => {
    this.setState({inputDate: event.target.value})
  }

  impAppointments = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(each => each.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {inputDate, inputTitle, isFilterActive} = this.state
    const starButtonClassName = isFilterActive ? 'active' : ''
    const filteredAppointments = this.getFilteredAppointmentsList()

    return (
      <div className="main-bg">
        <div className="card">
          <div className="card-top">
            <form
              className="appointment-details"
              onSubmit={this.onAddAppointment}
            >
              <h1 className="appointment-details-head">Add Appointment</h1>
              <div className="input-details">
                <label htmlFor="title" className="input-head">
                  TITLE
                </label>
                <input
                  id="title"
                  value={inputTitle}
                  placeholder="Title"
                  className="input-content"
                  type="text"
                  onChange={this.onAddTitle}
                />
              </div>
              <div className="input-details">
                <label htmlFor="date" className="input-head">
                  DATE
                </label>
                <input
                  id="date"
                  value={inputDate}
                  onChange={this.onAddDate}
                  className="input-content"
                  type="date"
                />
              </div>
              <div>
                <button type="submit" className="appointment-button">
                  Add
                </button>
              </div>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <div className="line">
            <hr />
          </div>

          <div className="button-container">
            <h1 className="button-container-head">Appointments</h1>
            <button
              onClick={this.impAppointments}
              type="button"
              className={`remove-button ${starButtonClassName}`}
            >
              Starred
            </button>
          </div>

          <ul className="appointment-container">
            {filteredAppointments.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                toggleStar={this.toggleStar}
                key={eachAppointment.id}
                impAppointments={this.impAppointments}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
