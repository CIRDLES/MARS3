import d3 from 'd3'

export default function csvParse() {
  d3.csv('test.csv', function(d) {
    console.log(d);
  })
}
