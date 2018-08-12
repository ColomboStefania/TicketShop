
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { addTicket } from '../../actions/tickets'
import { fetchEvent } from '../../actions/events'
import { Redirect, Link } from 'react-router-dom'
import './events.css'

class CurrentEvent2 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: parseInt(this.props.match.params.id),
      ticketName: '',
      price: 0,
      comment: '',
      description: '',
      picture: ''
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


  handleSubmit = event => {
    event.preventDefault()
    this.props.addTicket({
      id: this.props.currentEvent.id,
      ticketName: this.state.ticketName,
      description: this.state.description,
      picture: this.state.picture,
      comment: this.state.comment,
      price: this.state.price
    })
    this.setState({ 
      ticketName: '',
      description: '',
      picture: '',
      comment: '',
      price: ''  })
  }


  render() {

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
              <Link to={`/currentTicket/${ticket.id}`} key={index}>
                <div>
                  <div className = "containerTicketOverview">
                    <h2> Owner: {ticket.ticketName}  </h2>
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
      </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentEvent, currentUser, currentTicket }) => {
  return { currentEvent, currentUser, currentTicket }
}

export default connect( mapStateToProps,{ fetchEvent, addTicket })(CurrentEvent2)

