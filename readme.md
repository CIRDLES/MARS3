# npm Commands
The project contains two npm packages and each has its own package.json.

1. `/mars-native` is the directory that contains the logic for running MARS as a native application in Electron
2. `/mars-client` is the directory that contains the application itself. It can be run independently of Electron

## `mars-native` Commands
cd into mars-native to run these commands:
- `npm start` starts electron with the application's most recent build.
- `npm run build` builds the application.
- `npm run build-watch' builds the application and watches for changes during development.
- `npm run start-dev` builds the application and runs Electron in one command.
- `npm run start-dev-watch' builds the application, runs Electron, and watches for changes. 

## `mars-client` Commands
The web application can be run and tested outside of Electron in your favorite browser
- `npm run build` builds the application (the same as in `/mars-native`)
- `npm run build-watch` builds the application and watches for changes. 

After the `npm run build-watch` command, navigate to http://localhost:8080/ in your browser.

# Test the asynchronous calls
You can quickly, and temporarily try out the asynchrounous calls copying the below code into `\mars-client\src\containers\Root.jsx.
Don't forget to replace the usercode, username, and password before running the application
```
// import the needed files
import {fetchUsercode, postSamples} from '../actions'
import sampleFactory from '../sampleFactory'

// create some test samples
var scrippsSample = {
  type: "Core",
  name: "Rocky",
  made_of: "Rock"
}

var scrippsSample2 = {
  type: "Core",
  name: "Bullwinkle",
  made_of: "Rock"
}

// create a data map <- these could eventually be stored in json format for each organization
// The keys are scripps names, and the values are the corresponding sesar names as strings
var dataMap = {
  type: 'sample_type',
  name: 'name',
  made_of: 'material'
}

// create a send object <- this will eventually be done in a function
var send = {
  samples: {
    sample: [
      sampleFactory(scrippsSample, dataMap, <usercode>),
      sampleFactory(scrippsSample2, dataMap, <usercode>)
    ],
    _xmlns: "http://app.geosamples.org",
    "_xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
  }
}

// Push the samples to IGSN
store.dispatch(postSamples(<email>, <password>, send));
```

You can view the responses in the web browser, or Electron's, console. Also, if you look at your test Environment in Sesar you should see the changes there as well.


