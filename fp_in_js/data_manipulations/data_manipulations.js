var nearEarthObjects = require('./nasa_near_earth_object_API.json');

// The object in the nasa_near_earth_object_API.json is a copy of real API response from the NASA Near-Earth Object API. 
// Find the following from the API:

// Total Count ---------------------------------------------
// 1. How many near-earth objects did NASA register for the date of the search? Return the asteroid count.


// Averages ------------------------------------------------
// 2. What was the average absolute magnitude of all the near earth objects in this data set? Return the average absolute_magnitude_h.

// Hint - you can achieve this multiple ways, but the reduce method can be a little-known but cool way to find averages. To do it though, you'll need to use the initial_value argument
// For some extra challenge try using reduce with the initial setting argument. To learn more about it, take a look at this page: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce


// Hazardous -----------------------------------------------
// 3. A list of all objects (their id, name, max size in miles, and closest approach in miles) that are labeled potentially hazardous


// Too Close for Comfort -----------------------------------
// 4. A list of all objects (their id, name, max size in miles, and closest approach in miles) that have a miss_distance of less than 900,000 miles


// Alert ---------------------------------------------------
// 5. Of all the near-earth objects for this date, find the time that the asteroid with the nearest miss will be closest to earth. 

// const elementsFromJSON = JSON.parse(nearEarthObjects);

// 2.

let asteroids = nearEarthObjects.near_earth_objects['2019-12-02'];

const resultAsteroids = asteroids.reduce((acc, curr, i, arr) => {
  if (i + 1 == arr.length) {
    // this is the averages trick
    //  at the very last item, take the accumulated sum and divide by the total number of items
    return acc / arr.length
  }
  return acc += curr['absolute_magnitude_h']
}, 0)
console.log(resultAsteroids);


// 3.

const hazardousElements = nearEarthObjects.near_earth_objects['2019-12-02'].filter(element => element.is_potentially_hazardous_asteroid === true)

let newElements = [];

hazardousElements.forEach(element => {
  newElements.push({
    'id': element.id,
    'name': element.id,
    'max size in miles': element.id,
  })
})

console.log(newElements);

// 4.

