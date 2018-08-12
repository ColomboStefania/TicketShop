import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import './events.css'
import { fetchEvents } from '../../actions/events'
import _ from 'lodash'
import { Link} from 'react-router-dom'


class EventsList2 extends PureComponent {
  componentDidMount() {
    this.props.fetchEvents()
  }

  render() {
 

    const { events } = this.props

    return (
    
        <div>
          
          {!events && <div>Loading...</div>}
          {events  &&
          (
            <div>
              <div className= "containertitle">
              <h1> All Events</h1>
              </div>
              <div>
                {_.map(events, event => {
                  if (new Date(event.endDate) < new Date)
                  return 
                    <div key={event.id} className = "containerEvent">
                       <Link to={`/currentEvent/${event.id}`}>
                        <h1 className = "textlink">{event.eventName}</h1>
                        <img src={event.picture} width="250" height="250" className="pictureEvent" />
                        <p  className = "textlink">Starts: {event.startDate}</p>
                        <p  className = "textlink">Ends: {event.endDate}</p>
                        <p  className = "textlink">Ends: eventoooo</p>
                       </Link> 
                    </div> 
                   return <div key={event.id} className = "containerEvent">
                   <Link to={`/currentEvent/${event.id}`}>
                    <h1 className = "textlink">{event.eventName}</h1>
                    <img src={event.picture} width="250" height="250" className="pictureEvent" />
                    <p  className = "textlink">Starts: {event.startDate}</p>
                    <p  className = "textlink">Ends: {event.endDate}</p>
                 
                   </Link> 
                </div> 
                } ) }
              </div>
            </div>
          )}
        </div>
    )
  }
}

const mapStateToProps = ({ events, currentUser }) => {
  return { events, currentUser }
}

export default connect( mapStateToProps,{ fetchEvents })(EventsList2)


