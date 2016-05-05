import {combineReducers} from 'redux'
import {
  FETCH_USERCODE_REQUEST, FETCH_USERCODE_SUCCESS, FETCH_USERCODE_FAILURE
} from './actions'

function user(state = { }, action) {
  switch (action.type) {
    case FETCH_USERCODE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_USERCODE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        userCode: action.data
      })
    case FETCH_USERCODE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.data
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user
})

export default rootReducer
