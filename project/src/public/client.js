const { fromJS, Map } = require('immutable');

import 'bootstrap';
import "./assets/stylesheets/main.scss";
import 'js-loading-overlay'
import _ from 'underscore';

// add our markup to the page
const root = document.getElementById('root')

window.roverDataRaw = null;

let applicationStore = {};

window.options = Map({
    name: true,
    imgSrc: true,
    earthDate: true,
    landingDate: true,
    launchDate: true,
    status: true,
    camera: true
});

const enableOption = (option) => {
    window.options = window.options.set(option, true);
    render(root)
}

const disableOption = (option) => {
    window.options = window.options.set(option, false);
    render(root)
}

const updateApplicationStore = (roverDataRaw) => {
    if (!_.isEmpty(roverDataRaw[0].photos)) {
        window.roverDataRaw = roverDataRaw[0].photos.concat(roverDataRaw[1].photos).concat(roverDataRaw[2].photos);
    }

    const roverPhotoCollectionRaw = window.roverDataRaw.sort((itemA, itemB) => itemA.earth_date - itemB.earth_date);

    const roverPhotoCollection = roverPhotoCollectionRaw.map(item => {
        return {
            name: window.options.get('name') ? item.rover.name : null,
            imgSrc: window.options.get('imgSrc') ? item.img_src : null,
            earthDate: window.options.get('earthDate') ? item.earth_date : null,
            landingDate: window.options.get('landingDate') ? item.rover.landing_date : null,
            launchDate: window.options.get('launchDate') ? item.rover.launch_date : null,
            status: window.options.get('status') ? item.rover.status : null,
            camera: window.options.get('camera') ? item.camera.full_name : null,
            show: ((item) => {
                if (typeof window.selectedRover === 'undefined' || window.selectedRover === 'All') {
                    return true;
                } else return item.rover.name === window.selectedRover;
            })(item)
        };
    });

    return fromJS(roverPhotoCollection);
}

const render = async (root) => {
    root.innerHTML = await App();

    const inputElements = document.querySelectorAll('input[type=checkbox]');
    Array.from(inputElements).map(input => {
        input.addEventListener('change', (event) => {
            if (event.target.checked) {
                enableOption(event.target.id);
                updateApplicationStore(window.roverDataRaw);
            } else {
                disableOption(event.target.id);
                updateApplicationStore(window.roverDataRaw);
            }
        });
    });

    document.querySelector('select').addEventListener('change', (event) => {
        window.selectedRover = event.currentTarget.selectedOptions[0].value;
        updateApplicationStore(window.roverDataRaw);
        render(root);
    });
}

// create content
const App = async (roverDataRaw) => {

    const fetchMoviesJSON = async () => {
        return await fetch('http://localhost:3000/apod').then(response => response.json());
    }

    if (_.isEmpty(window.roverDataRaw)) {
        window.roverDataRaw = await fetchMoviesJSON();
    }

    applicationStore = updateApplicationStore(window.roverDataRaw);

    return `${RenderedList(applicationStore)}`;
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    JsLoadingOverlay.show();
    render(root)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const RenderedList = (immutableRoverPhotoCollection) => {
    const htmlRoverInitialList = immutableRoverPhotoCollection.map((item, index) => {
        let htmlMarkup = '';

        if (item.get('show') === true) {
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
        }

        return htmlMarkup;
    });

    JsLoadingOverlay.hide();

    return `
        <header></header>
        <main>
            <section>
                <div class="container">
                    <form class="card selection-form">
                        <div class="row">
                            <div class="col landing-date-col">
                                <input type="checkbox" class="form-check-input" id="landingDate" ` +
                                    (() => {
                                      if (window.options.get('landingDate') === true) {
                                          return 'checked="checked"'
                                      }
                                    })() + `/>
                                <label class="form-check-label" for="landing_date">Landing date</label>
                            </div>
                            <div class="col">
                                <select name="rovers" class="form-control">
                                    <option value="all">All</option>
                                    <option value="Spirit">Spirit</option>
                                    <option value="Opportunity">Opportunity</option>
                                    <option value="Curiosity">Curiosity</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div class="row" id="root">
                        ${htmlRoverInitialList.join('')}
                    </div>
                </div>
            </section>
        </main>
        <footer></footer>
    `
}


