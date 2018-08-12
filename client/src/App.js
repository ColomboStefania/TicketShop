import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import EventsList from './components/events/EventsList'
import LogoutPage from './components/logout/LogoutPage'
import CreateEvent from './components/events/CreateEvent'
import HomePage from './components/home/HomePage'
import './App.css'
import TopBar from './components/layout/TopBar'
import CurrentEvent from './components/events/CurrentEvent';
import CurrentTicket from './components/events/CurrentTicket'
import EventList2 from './components/ForUser/EventList2'
import CurrentEvent2 from './components/ForUser/CurrentEvent2'
import CurrentTicket2 from './components/ForUser/CurrentTicket2'
import  Success from './components/events/Success'



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{marginTop:75}}>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home" component={HomePage} />   
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events" component={EventsList} />
            <Route exact path="/form" component={CreateEvent} />
            <Route exact path="/events/:id" component={CurrentEvent} />
            <Route exact path="/ticket/:id" component={CurrentTicket} />
            <Route exact path="/eventList" component={EventList2} />
            <Route exact path="/currentEvent/:id" component={CurrentEvent2} />
            <Route exact path="/currentTicket/:id" component={CurrentTicket2} />
            <Route exact path="/success" component={Success} />
          </main>
        </div>
      </Router>
    )
  }
}
export default App
