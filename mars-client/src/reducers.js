import {combineReducers} from 'redux'
import {
  FETCH_USERCODE_REQUEST, FETCH_USERCODE_SUCCESS, FETCH_USERCODE_FAILURE,
  POST_SAMPLES_REQUEST, POST_SAMPLES_SUCCESS, POST_SAMPLES_FAILURE
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
        userCode: action.usercode
      })
    case FETCH_USERCODE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.usercode
      })
    default:
      return state
  }
}

function samples(state = { }, action) {
  switch (action.type) {
    case POST_SAMPLES_REQUEST:
      return Object.assign({}, state, {
        isPosting: true
      })
    case POST_SAMPLES_SUCCESS:
      return Object.assign({}, state, {
        isPosting: false,
        // FOR TESTING ONLY: THIS MUST BE CHANGED FOR THIS REDUCER TO BE COMPLETE
        // TODO: figure out a way to apply the information to the samples in the state
        samples: action.data
      })
    case POST_SAMPLES_FAILURE:
      return Object.assign({}, state, {
        isPosting: false,
        // FOR TESTING ONLY: THIS MUST BE CHANGED FOR THIS REDUCER TO BE COMPLETE
        // ALSO, THE API DOESN'T SPECIFY WHETHER YOU CAN HAVE PARTIAL SUCCESS
        errors: action.errors
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  samples
})

export default rootReducer
