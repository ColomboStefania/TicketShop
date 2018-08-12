import request from 'superagent'
import { fetchTicket } from "./tickets"
import { baseUrl } from '../constants'

export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_COMMENT = 'GET_COMMENT'

export const addComment = (id, comment) => (dispatch, getState) => {
  const state = getState()
  console.log(comment)


  request
    .post(`${baseUrl}/currentTicket/${id}`)
   
    .send(comment)
    .then(response => {
      console.log(response.body)
      dispatch({
        type: ADD_COMMENT,
        payload: response.body
      })
      // fetchTicket(state.currentUser.id)
    })
    .catch(err => {
      console.log(err)
    })
}



export const fetchComment = (id) => (dispatch, getState) => {
  const state = getState()


  request
    .get(`${baseUrl}/comments/${id}`)
  
    .then(response => {
      dispatch({
        type: GET_COMMENT,
        payload: response.body
      })
    })
    .catch(err => {
      console.log(err)
    })
}


