import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createEvent } from '../../actions/events'
import DatePicker from 'react-date-picker'
import { convert } from '../../lib'
import TextField from 'material-ui/TextField'
import { Redirect } from 'react-router-dom'
import './events.css'



class CreateEvent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      eventName: '',
      startDate: new Date(),
      endDate: new Date(),
      description: '',
      picture: ''
    }
  }

  handleChange = event => {
    this.setState({ eventName: event.target.value })
  }

  handleChange1 = event => {
    this.setState({ description: event.target.value })
  }
  handleChange2 = event => {
    this.setState({ picture: event.target.value })
  }

  handleChangeStart = date => {
    this.setState({ startDate: date })
  }

  handleChangeEnd = date => {
    this.setState({ endDate: date })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.createEvent({
      eventName: this.state.eventName,
      startDate: convert(this.state.startDate),
      endDate: convert(this.state.endDate),
      description: this.state.description,
      picture: this.state.picture
    })
  }

  render() {


    return (
      <div>
        {this.state.redirect && <Redirect to="/" />}
        <form className = "formcreateevent" onSubmit={this.handleSubmit}>
          <h1>Event Name:</h1>
          <TextField
            id="x"
            placeholder="Event"
            type="text"
            value={this.state.eventName}
            onChange={this.handleChange}
            required
          />
          <h2>Description:</h2>
          <TextField
            id="x"
            placeholder=" decription "
            type="text"
            value={this.state.description}
            onChange={this.handleChange1}
            required
          />
          <h2>Picture:</h2>
          <TextField
            id="x"
            placeholder="picture url"
            type="text"
            value={this.state.picture}
            onChange={this.handleChange2}
            required
          />
          <div>
            <DatePicker
              value={this.state.startDate}
              onChange={this.handleChangeStart}
            />
            <span>until</span>
            <DatePicker
              value={this.state.endDate}
              onChange={this.handleChangeEnd}
            />
          </div>
         
          <button className="buttonsubmit" id="cheese" type="submit" onSubmit={this.handleSubmit}>
            Submit
          </button>
     
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => {return { currentUser }}

export default connect( mapStateToProps, { createEvent })(CreateEvent)


