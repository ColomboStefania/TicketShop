import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../actions/comments'
import { fetchTicket } from '../../actions/tickets'
import './events.css'
import TextField from 'material-ui/TextField'

class CurrentTicket extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // ticketId: parseInt(this.props.match.params.id),
      commentOwner: '',
      comment: ''
    }
  }

  componentWillMount() {
    this.props.fetchTicket(this.props.match.params.id)

  }

  handleRefresh() {
    this.props.fetchTicket(this.props.match.params.id)
  }

  handleChange1 = event => {
    this.setState({ commentOwner: event.target.value })
  }

  handleChange2 = event => {
    this.setState({ comment: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addComment(
       this.props.currentTicket.id,
       this.state
    )
    this.setState({ 
      commentOwner: '',
      comment: '' })
  }


  render() {


    if (
      !this.props.currentTicket ||
      this.props.currentTicket.id !== parseInt(this.props.match.params.id, 10)
    ) {
      this.handleRefresh()
      return <div>Loading...</div>
    }

    const ticket = this.props.currentTicket
    console.log(this.props)

    return (

          <div>
             <div className= "containertitle">
              <h1> Ticket from {ticket.ticketName}</h1>
            </div>
              <img className= "pictureTicket" src={ticket.picture} alt="" />
            <div className = "containerTicketOverview">
              <h2> Description: {ticket.description} </h2>
              <h2> Price: {ticket.price} euro </h2>
              <h2> We calculated that the risk of this ticket being a fraud is: </h2>
        
              { ticket.comments.length > 3 && <h2> {parseInt(ticket.risk) + 5} %  </h2>}
              { ticket.comments.length <= 3 && <h2>  {parseInt(ticket.risk)} %  </h2>}
      
              {ticket.comments.map((item, index) =>  (
              <span key={index}>

                <p>Author: { item.commentOwner }</p>
                <p>Comment: { item.comment }</p>
          
              </span> 
            ))}
            <div>
          </div>
        </div>
           <form className ="formsubmitticket" onSubmit={this.handleSubmit}>
       
          <h2>Your Full Name:</h2>
          <TextField
            id="safety"
            placeholder="Marco Rossi"
            type="text"
            value={this.state.commentOwner}
            onChange={this.handleChange1}
            required
          />

            <h2>comment:</h2>
            <TextField
            id="safety"
            placeholder="comment"
            type="text"
            value={this.state.comment}
            onChange={this.handleChange2}
            required
          />
          
          <button className = "buttonsubmit" id="primary" type="submit" onSubmit={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = ({currentTicket, currentEvent,currentUser}) => {
  return {currentTicket,currentEvent,currentUser}}

export default connect(mapStateToProps,{ fetchTicket, addComment })(CurrentTicket)
