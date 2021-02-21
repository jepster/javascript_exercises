// ----------------------------------------------------------
// OBJECT FREEZE EXAMPLE from Video
// ----------------------------------------------------------

// Note here that we must run Javascript in strict mode in order to see the error correctly
// Node runs in strict mode automatically, as do many online code editors, so if you are running these examples in the terminal or online you probably won't need this
// If you want to learn more about strict mode, here is a good article: https://www.geeksforgeeks.org/strict-mode-javascript/

"use strict";

const currentShow = {
    title: 'Dr. Who',
    seasons: 11,
    currentSeason: 4
}

// as a const, we can do this:
currentShow.currentSeason = 5

// but if we freeze the object
Object.freeze(currentShow);

// currentShow.currentSeason = 5;
// Throws an error and current_season remains unchanged


// OBJECT FREEZE EXERCISE

const ownObjectToFreeze = {
    foo: 'blar',
    blar: 'foo'
}

ownObjectToFreeze.blar = 'raz';
Object.freeze(ownObjectToFreeze);

// will throw an error:
// ownObjectToFreeze.blar = 'raz2';
// This will be the error message:
// TypeError: Cannot assign to read only property 'blar' of object '#<Object>'
// at Object.<anonymous> (/Users/majmesku/dev/udacity/nd032-c2-functional-programming-with-javascript-starter/functional_js_syntax/object_freeze.js:37:24)

console.log(ownObjectToFreeze);

// ----------------------------------------------------------
// Directions: Create your own object and freeze it!
