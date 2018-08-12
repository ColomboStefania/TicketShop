import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchTicket , updateTicket} from '../../actions/tickets'
import { Redirect, Link } from 'react-router-dom'
import './events.css'
import TextField from 'material-ui/TextField'

class CurrentTicket extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // ticketId: parseInt(this.props.match.params.id),
      description: '',
      price: '',
      picture: '',
    }
  }

  componentWillMount() {
    this.props.fetchTicket(this.props.match.params.id)
  }

  handleRefresh() {
    this.props.fetchTicket(this.props.match.params.id)
  }

  handleChangeDescription = event => {
    this.setState({ description: event.target.value })
  }
  handleChangePicture = event => {
    this.setState({ picture: event.target.value })
  }
  handleChangePrice = event => {
    this.setState({ price: event.target.value })
  }

  handleSubmitUpdate= event => {
    event.preventDefault()
      this.props.updateTicket(
      this.props.currentTicket.id,
      this.state
      )
    this.setState({ 
      description: '',
      price:'',
      picture: ''
     })
  }

  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/login" />
    }

    if (
      !this.props.currentTicket ||
      this.props.currentTicket.id !== parseInt(this.props.match.params.id, 10)
    ) {
      this.handleRefresh()
      return <div>Loading...</div>
    }

    const ticket = this.props.currentTicket
 

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
                { ticket.comments.map((item, index) =>  (
                  <span key={index}>
                    <p>Author: { item.commentOwner }</p>
                    <p>Comment: { item.comment }</p>
                 </span> 
                ))
                }
            <div>
          </div>
      </div>
      <div>
        <form className ="formsubmitticket" onSubmit={this.handleSubmitUpdate} >
          <h2>Description:</h2>
            <TextField
            id="x"
            placeholder="description"
            type="text"
            value={this.state.description}
            onChange={this.handleChangeDescription}
            required
            />
            <h2>Price:</h2>
            <TextField
            id="x"
            placeholder="Price"
            type="text"
            value={this.state.price}
            onChange={this.handleChangePrice}
            required
            />
            <h2>Picture:</h2>
            <TextField
            id="x"
            placeholder="Picture"
            type="text"
            value={this.state.picture}
            onChange={this.handleChangePicture}
            required
            />
              <button className = "buttonsubmit" id="primary" type="submit" onSubmit={this.handleSubmitUpdate}>
                ADD
              </button>
        </form>
       </div>
    </div>
    )
  }
}


const mapStateToProps = ({
  currentTicket,
  currentEvent,
  currentUser
}) => {
  return {
    currentTicket,
  currentEvent,
  currentUser
  }
}

export default connect(mapStateToProps, {  fetchTicket, updateTicket })(CurrentTicket)
