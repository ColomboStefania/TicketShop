import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { addTicket } from '../../actions/tickets'
import { fetchEvent } from '../../actions/events'
import { Redirect, Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import './events.css'

class CurrentEvent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: parseInt(this.props.match.params.id),
      ticketName: '',
      price: 0,
      comment: '',
      description: '',
      picture: '',
      ticketTitle: ''
    }
  }

  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.id)
  }

  handleRefresh() {
    this.props.fetchEvent(this.props.match.params.id)
  }

  handleChange = event => {
    this.setState({ ticketName: event.target.value })
  }

  handleChange1 = event => {
    this.setState({ description: event.target.value })
  }
  handleChange2 = event => {
    this.setState({ picture: event.target.value })
  }
  handleChange3 = event => {
    this.setState({ comment: event.target.value })
  }
  handleChange4 = event => {
    this.setState({ price: event.target.value })
  }
  handleChangeTitle = event => {
    this.setState({ ticketTitle: event.target.value })
  }


  handleSubmit = event => {
    event.preventDefault()
    this.props.addTicket({
      id: this.props.currentEvent.id,
      ticketName: this.state.ticketName,
      description: this.state.description,
      picture: this.state.picture,
      comment: this.state.comment,
      price: this.state.price,
      ticketTitle: this.state.ticketTitle
    })
    this.setState({ 
      ticketName: '',
      description: '',
      picture: '',
      comment: '',
      price: '',
      ticketTitle: ''
     })
  }


  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/login" />
    }

    if (
      !this.props.currentEvent ||
      this.props.currentEvent.id !== parseInt(this.props.match.params.id, 10)
    ) {
      this.handleRefresh()
      return <div></div>
    }

    const event = this.props.currentEvent

    return (
      <div>
        {this.state.redirect && <Redirect to="/" />}
        <div className= "containertitle">
            <h1> All Tickets for the {event.eventName}</h1>
            </div>

       
        <div>
          {event.tickets.map((ticket, index) => {
            return (
              <Link to={`/ticket/${ticket.id}`} key={index}>
                <div>
                  <div className = "containerTicketOverview">
                    <h2> Owner: {ticket.ticketName}  </h2>
                    <h2> Title: {ticket.ticketTitle}  </h2>
                    <h2> Price: {ticket.price} Euro  </h2>
                    { ticket.comments.length > 3 && <h2> Fraud: {parseInt(ticket.risk) + 5} %  </h2>}
                    { ticket.comments.length < 3 && <h2> Fraud: {parseInt(ticket.risk)} %  </h2>}
                    { ticket.comments.length > 3 && parseInt(ticket.risk) + 5  < 30 &&
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Button_Icon_Green.svg/200px-Button_Icon_Green.svg.png" width="50" height="50"/>
                    }
                    { parseInt(ticket.risk)  < 30 && ticket.comments.length < 3 &&
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Button_Icon_Green.svg/200px-Button_Icon_Green.svg.png" width="50" height="50"/>
                    }
                    { ticket.comments.length > 3 && parseInt(ticket.risk) + 5  < 60 && parseInt(ticket.risk) + 5  >= 30 &&
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Button_Icon_Yellow.svg/2000px-Button_Icon_Yellow.svg.png" width="50" height="50"/>
                    }
                    {parseInt(ticket.risk)  < 60 && parseInt(ticket.risk)  >= 30 &&
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Button_Icon_Yellow.svg/2000px-Button_Icon_Yellow.svg.png" width="50" height="50"/>
                    }
                    { ticket.comments.length > 3 && parseInt(ticket.risk) + 5  <= 100 && parseInt(ticket.risk) + 5  >= 60 &&
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Button_Icon_Red.svg/2000px-Button_Icon_Red.svg.png" width="50" height="50"/>
                    }
                    { parseInt(ticket.risk) <= 100  && parseInt(ticket.risk) >= 60 &&
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Button_Icon_Red.svg/2000px-Button_Icon_Red.svg.png" width="50" height="50"/>
                    }
                  </div>
                </div>
                </Link>
            )
          })}
        </div>
             <div>
        {this.state.redirect && <Redirect to="/" />}
      
        <form className ="formsubmitticket" onSubmit={this.handleSubmit}>
          <h2>Ticket Owner:</h2>
          <TextField
            id="safety"
            placeholder="i.e. Event 2"
            type="text"
            value={this.state.eventName}
            onChange={this.handleChange}
            required
          />
            <h2>Ticket Title:</h2>
          <TextField
            id="safety"
            placeholder="title"
            type="text"
            value={this.state.event}
            onChange={this.handleChangeTitle}
            required
          />
          <h2>Description:</h2>
          <TextField
            id="safety"
            placeholder="i.e. decription 2"
            type="text"
            value={this.state.description}
            onChange={this.handleChange1}
            required
          />
          <h2>Picture:</h2>
          <TextField
            id="safety"
            placeholder="i.e. decription 2"
            type="text"
            value={this.state.picture}
            onChange={this.handleChange2}
            required
          />
          <h2>Price:</h2>
          <TextField
            id="safety"
            placeholder="20euro"
            type="int"
            value={this.state.price}
            onChange={this.handleChange4}
            required
          />
            <h2>comment:</h2>
          <TextField
            id="safety"
            placeholder="comment"
            type="text"
            value={this.state.comment}
            onChange={this.handleChange3}
            required
          />
          
          <button className = "buttonsubmit" id="primary" type="submit" onSubmit={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentEvent, currentUser }) => {return { currentEvent, currentUser }}

export default connect( mapStateToProps,{ fetchEvent, addTicket })(CurrentEvent)

