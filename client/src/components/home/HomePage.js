import React, {PureComponent} from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

export default class HomePage extends PureComponent {
  render() {
    return (

        <div >
           <h1>Ticket Swap</h1>
          <div className = "buttonContainer">
            <button className="buttonHome"><Link to="/login" style={{ textDecoration: 'none' , color: 'white'}}><p className="playing">Login!</p></Link></button>
          </div> 
          <div >
            <button className="buttonHome"><Link to="/eventList" style={{ textDecoration: 'none' , color: 'white'}}><p className="playing">Look Around!</p></Link></button>
          </div> 
          <div className="logoImage">
            <p>.</p>
          </div>
      </div>
    )
  }
}