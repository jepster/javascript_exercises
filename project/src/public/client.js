const { fromJS } = require('immutable');

import 'bootstrap';
import "./assets/stylesheets/main.scss";
import 'js-loading-overlay'

let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const render = async (root) => {
    root.innerHTML = await App()
}


// create content
const App = async () => {

    const fetchMoviesJSON = async () => {
        return await fetch('http://localhost:3000/apod').then(response => response.json());
    }

    const roverDataRaw = await fetchMoviesJSON();
    const roverPhotoCollectionRaw = roverDataRaw.image.photos;



    const roverPhotoCollection = roverPhotoCollectionRaw.map(item => {
        return {
          name: item.rover.name,
          imgSrc: item.img_src
        };
    });

    const immutableRoverPhotoCollection = fromJS(roverPhotoCollection);


    const htmlRoverInitialList = immutableRoverPhotoCollection.map(item => {
        return `
            <div>
              <span>Name:</span> ${item.get('name')}
            </div>
            <div>
              <img src="${item.get('imgSrc')}" title="${item.get('name')}" alt="${item.get('name')}" />
            </div>
        `
    });

  JsLoadingOverlay.hide();

    return `
        <header></header>
        <main>
            <section>
              ${htmlRoverInitialList.join()}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    JsLoadingOverlay.show();
    render(root)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    // const today = new Date()
    //
    // if (!apod || apod.date === today.getDate() ) {
    //     getImageOfTheDay(store)
    // }

    debugger

    return apod.image.photos.map(item => {
        return `
          <img src="${item.img_src}" height="350px" width="100%" />
        `
    });
}

// ------------------------------------------------------  API CALLS


