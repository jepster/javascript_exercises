const Immutable = require('immutable');

// implement_immutablejs.js

// Lets think about how we could refactor our application state flow to use Immutable. 
// The original code is provided below, how might you re-write both the store object and updateStore function with Immutable?
// Remember if you need help, the docs should be the first place you look.

let store = {
    user: {
        first_name: 'John',
        last_name: 'Doe'
    }
}

const updateStore = (store, newState) => {
    return Immutable.merge(store, newState);
}

console.log(updateStore(store, {user: {first_name: 'Kevin', last_name: 'Alfa Kevin'}}));