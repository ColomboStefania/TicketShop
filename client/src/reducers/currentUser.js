import {USER_LOGIN_SUCCESS, USER_LOGOUT} from '../actions/users'
import {localStorageJwtKey} from '../constants'

let initialState = null
try {
  const jwt = localStorage.getItem(localStorageJwtKey)
  if (jwt) {
    initialState = { jwt }
  }
}
catch (e) {

}

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case USER_LOGIN_SUCCESS:
			return payload

    case USER_LOGOUT:
      return null

		default:
      return state
	}
}
