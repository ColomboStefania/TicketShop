import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link} from 'react-router-dom'


class Success extends PureComponent {
  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/login" />
    }

    return (
      <div>
          <h1> Event created!! </h1>
        <img src="https://res.cloudinary.com/bs-producties-bv/image/fetch/c_fill,ar_3:1,g_faces/f_auto,q_auto,dpr_1.0/c_fill,w_auto,h_500/https://www.topticketshop.nl/afbeeldingen/groot/concertstandaard.jpg" alt="success" />
        <h2> Event created!! </h2>
        <Link to={`/events`}>
        <button className  = "buttonCreate" id="back" to={`/events/all`}>
          Back
        </button>
        </Link> 

      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => {return { currentUser }}

export default connect(mapStateToProps)(Success)
