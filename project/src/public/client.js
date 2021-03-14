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

    return `${RenderedList(roverDataRaw)}`;
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    JsLoadingOverlay.show();
    render(root)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const RenderedList = (roverDataRaw) => {
    const roverPhotoCollectionRaw = roverDataRaw.image.photos.sort((itemA, itemB) => itemA.earth_date - itemB.earth_date);

    const roverPhotoCollection = roverPhotoCollectionRaw.map(item => {
        return {
            name: item.rover.name,
            imgSrc: item.img_src,
            earthDate: item.earth_date,
            landingDate: item.rover.landing_date,
            launchDate: item.rover.launch_date,
            status: item.rover.status,
            camera: item.camera.full_name
        };
    });

    const immutableRoverPhotoCollection = fromJS(roverPhotoCollection);


    const htmlRoverInitialList = immutableRoverPhotoCollection.map((item, index) => {
        let htmlMarkup = '';

        htmlMarkup += `<div class="col-sm-4">
            <div class="card">
                <div class="card-header">
                    Name: ${item.get('name')}
                </div>
                <div class="img-wrapper">
                  <img class="card-img-top" src="${item.get('imgSrc')}" title="${item.get('name')}" alt="${item.get('name')}"/>
                </div>
                <div class="card-body">
                    <p>Landing date: ${item.get('landingDate')}</p>
                    <p>Launch date: ${item.get('launchDate')}</p>
                    <p>Earth date: ${item.get('earthDate')}</p>
                    <p>Status: ${item.get('status')}</p>
                    <p>Camera: ${item.get('camera')}</p>
                </div>
            </div>
        </div>`;

        return htmlMarkup;
    });

    JsLoadingOverlay.hide();

    return `
        <header></header>
        <main>
            <section>
                <div class="container">
                  <div class="row" id="root">
                    ${htmlRoverInitialList.join('')}
                  </div>
                </div>
            </section>
        </main>
        <footer></footer>
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


