import fetch from 'isomorphic-fetch'
import X2JS from 'x2js'

var x2js = new X2JS();

// Async usercode actions
export const FETCH_USERCODE_REQUEST = 'FETCH_USERCODE_REQUEST'
export const FETCH_USERCODE_SUCCESS = 'FETCH_USERCODE_SUCCESS'
export const FETCH_USERCODE_FAILURE = 'FETCH_USERCODE_FAILURE'

// Async sample posting actions
export const POST_SAMPLES_REQUEST = 'POST_SAMPLES_REQUEST'
export const POST_SAMPLES_SUCCESS = 'POST_SAMPLES_SUCCESS'
export const POST_SAMPLES_FAILURE = 'POST_SAMPLES_FAILURE'

export function fetchUsercodeRequest() {
  return {
    type: FETCH_USERCODE_REQUEST
  }
}

export function fetchUsercodeSuccess(usercode) {
  return {
    type: FETCH_USERCODE_SUCCESS,
    usercode
  }
}

export function fetchUsercodeFailure(error) {
  return {
    type: FETCH_USERCODE_FAILURE,
    error
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
    .then(responseJS => {
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

export function postSamplesRequest() {
  return {
    type: POST_SAMPLES_REQUEST
  }
}

export function postSamplesSuccess(data) {
  return {
    type: POST_SAMPLES_SUCCESS,
    data
  }
}

export function postSamplesFailure(errors) {
  return {
    type: POST_SAMPLES_FAILURE,
    errors
  }
}


export function postSamples(username, password, data) {
  return dispatch => {
    var postData = new FormData();
    postData.append("username", username);
    postData.append("password", password);
    postData.append("content", x2js.js2xml(data));
    dispatch(postSamplesRequest());
    return fetch('https://sesardev.geosamples.org/webservices/upload.php', {
      method: "POST",
      body: postData
    })
    .then(response => {
      var decoder = new TextDecoder();
      var reader = response.body.getReader();
      reader.read()
      .then(function(result) {
          return decoder.decode(result.value, {stream: true})
      })
      .then(responseText => x2js.xml2js(responseText))
      .then(responseJS => {
        if(response.status === 200) {
          dispatch(postSamplesSuccess(responseJS))
        } else {
          dispatch(postSamplesFailure(responseJS))
        }
      })
    })
  }
}
