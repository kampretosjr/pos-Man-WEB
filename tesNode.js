var array = [{
  "adults": 0,
  "children": 3
}, {
  "adults": 0,
  "children": 1
}];

var val = array.reduce(function(previousValue, currentValue) {
  return {
    adults: previousValue.adults + currentValue.adults,
  }
});
console.log(val);