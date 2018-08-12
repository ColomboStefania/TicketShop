import { FETCHED_EVENT } from '../actions/events'
import {
  ADD_TICKET,

} from '../actions/tickets'

export default function(state = null, { type, payload }) {
  switch (type) {
    case FETCHED_EVENT:
      return payload.event
    case ADD_TICKET:
      return payload

    default:
      return state
  }
}
