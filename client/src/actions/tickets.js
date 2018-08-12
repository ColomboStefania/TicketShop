import request from 'superagent'
import { baseUrl } from '../constants'

export const ADD_TICKET = 'ADD_TICKET'

export const UPDATE_TICKET = 'UPDATE_TICKET'
 export const GET_TICKET = 'GET_TICKET'

export const addTicket = (ticket) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(ticket)
    .then(response => {
      console.log(response.body)
      dispatch({
        type: ADD_TICKET,
        payload: response.body
      })
    })
    .catch(err => {
      console.log(err)
    })
}


export const updateTicket = (id , updates) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  console.log(id, updates)
  request
    .patch(`${baseUrl}/ticket/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updates)
    .then(response => {
      dispatch({
        type: UPDATE_TICKET,
        payload: response.body
      })
    })
    .catch(err => {
      console.log(err)
    })
}




export const fetchTicket = (id) => (dispatch, getState) => {
  const state = getState()


  request
    .get(`${baseUrl}/ticket/${id}`)

    .then(response => {
      dispatch({
        type: GET_TICKET,
        payload: response.body
      })
    })
    .catch(err => {
      console.log(err)
    })
}

