
import {USER_LOGOUT} from '../actions/users'


export default (state = null, {type, payload}) => {
  switch (type) {
    case USER_LOGOUT:
      return null
    default:
      return state
  }
}
