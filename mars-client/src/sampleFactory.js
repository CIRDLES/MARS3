
export default function sampleFactory(valueObject, map, userCode) {

//TODO: Create an error to andle when a key does not exist in a map
//TODO: Check the values for type and create an error if not
  var sample = {
    user_code: userCode
  }

  // Iterate through value object
  for (var property in valueObject) {
    if (valueObject.hasOwnProperty(property)) {
      sample[map[property]] = valueObject[property]
    }
  }
  return sample
}
