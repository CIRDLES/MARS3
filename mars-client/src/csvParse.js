import d3 from 'd3'
import _ from 'lodash'

// To get files from the file System
// 1. Create an event listener on the control that watches for change
// 2. On change pass control.files array to csvParse()
// TODO: Error checking of CSV data

export default function csvParse(seriesFiles, callback) {
  var obj = {}
  var results = [obj];
  for(let i=0; i<seriesFiles.length; i++) {
    let fileReader = new FileReader();
    fileReader.readAsText(seriesFiles[i]);
    fileReader.addEventListener("load", function(event) {
      results.push(d3.csv.parse(event.target.result))
        if(i == seriesFiles.length-1) {
          _.merge.apply(null, results);
          callback(null, obj);
        }
    })
  }
}
