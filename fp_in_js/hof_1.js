// 1. Create a function that when passed as a callback to the Higher Order function provided, makes the final return the number's square plus two

const addTwo = (callback) => {
  return callback() + 2
}

const getTwo = () =>{
  return 4;
}

console.log(addTwo(getTwo));

// 2. Create a Higher Order Function that could take this callback to return a greeting

const createFullName = (first_name, last_name, title) => {
  return `${title} ${first_name} ${last_name}`
}

const greetAndMeet = (callback) => {
  return callback('Tom', 'Tomason', 'Dev');
}

console.log(greetAndMeet(createFullName));
// you might notice that this function is less than ideal - that's great! We'll talk about why next