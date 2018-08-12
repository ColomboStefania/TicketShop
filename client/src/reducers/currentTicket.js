import {
    GET_TICKET,
    // DELETE_TICKET,
    UPDATE_TICKET
  } from '../actions/tickets'
  import {
    ADD_COMMENT
  } from '../actions/comments'
  
  export default function(state = null, { type, payload }) {
    switch (type) {
      case GET_TICKET:
        return payload.ticket
      case ADD_COMMENT:
        return payload
        case UPDATE_TICKET:
        return payload
      // case DELETE_TICKET:
      //   return null
      default:
        return state
    }
  }
  