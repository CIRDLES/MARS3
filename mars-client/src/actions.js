import fetch from 'isomorphic-fetch'
import X2JS from 'x2js'

var x2js = new X2JS();

// Async usercode actions
export const FETCH_USERCODE_REQUEST = 'FETCH_USERCODE_REQUEST'
export const FETCH_USERCODE_SUCCESS = 'FETCH_USERCODE_SUCCESS'
export const FETCH_USERCODE_FAILURE = 'FETCH_USERCODE_FAILURE'

export function fetchUsercodeRequest() {
  return {
    type: FETCH_USERCODE_REQUEST
  }
}

export function fetchUsercodeSuccess(data) {
  return {
    type: FETCH_USERCODE_SUCCESS,
    data
  }
}

export function fetchUsercodeFailure(data) {
  return {
    type: FETCH_USERCODE_FAILURE,
    data
  }
}

export function fetchUsercode(username, password) {
  return dispatch => {
    dispatch(fetchUsercodeRequest())
    return fetch('https://app.geosamples.org/webservices/credentials_service.php', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "username=" + username + "&password=" + password
    })
    .then(response => response.text())
    .then(responseText => x2js.xml2js(responseText))
    .then(
      function(responseJS){
        if(responseJS.results.user_codes) {
          dispatch(fetchUsercodeSuccess(responseJS.results.user_codes.user_code))
        } else {
          dispatch(fetchUsercodeFailure(responseJS.results.error))
        }
      }
    )
    .catch(response => dispatch(fetchUsercodeFailure(response.status)))
  }
}
