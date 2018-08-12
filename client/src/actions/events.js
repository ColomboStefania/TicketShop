import request from 'superagent'
import { baseUrl } from '../constants'

export const FETCHED_EVENTS = 'FETCHED_EVENTS'
export const FETCHED_EVENT = 'FETCHED_EVENT'
export const ADD_EVENT = 'ADD_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

export const fetchEvents = () => (dispatch, getState) => {
  const state = getState()

  request
    .get(`${baseUrl}/events`)

    .then(response => {
      dispatch({
        type: FETCHED_EVENTS,
        payload: response.body
      })
    })
}

export const fetchEvent = (id) => (dispatch, getState) => {
  const state = getState()


  request
    .get(`${baseUrl}/events/${id}`)
  
    .then(response => {
      dispatch({
        type: FETCHED_EVENT,
        payload: response.body
      })
    })
}

export const createEvent = (event) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/form`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(event)
    .then(response => {
      dispatch({
        type: ADD_EVENT,
        payload: response.body
      })
    })
}

export const deleteEvent = event => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
    .delete(`${baseUrl}/events/${event}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => {
      dispatch({
        type: DELETE_EVENT,
        payload: response.body
      })
    })
}
