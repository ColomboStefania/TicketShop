import _ from 'lodash'
import { FETCHED_EVENTS, ADD_EVENT } from '../actions/events'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCHED_EVENTS:
      return _.mapKeys(payload.events, 'id')
    case ADD_EVENT:
      return payload
    default:
      return state
  }
}
