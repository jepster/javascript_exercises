require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

// example API call
app.get('/apod', async (req, res) => {
    try {
        // let imageData = (async () => {
            // const spiritPhotos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=1000&api_key=${process.env.API_KEY}`);
            // const perseverancePhotos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=1000&api_key=${process.env.API_KEY}`);
            // const opportunityPhotos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=${process.env.API_KEY}`);
            // const curiosityPhotos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.API_KEY}`);
            //
            // return spiritPhotos.push(perseverancePhotos).concat(opportunityPhotos).concat(curiosityPhotos);

                let finalResult;
                const urls = [
                    `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=1000&api_key=${process.env.API_KEY}`,
                    `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=${process.env.API_KEY}`,
                    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.API_KEY}`
                ];
                Promise.all(
                    urls.map(url =>
                        fetch(url)
                            .then(e => e.json())
                    )
                ).then(data => {
                    finalResult = data;


                    // const data = Object.assign(allResponses[0], allResponses[1], allResponses[2], allResponses[3]);

                    // console.log(value)
                    // Website you wish to allow to connect
                    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

                    // Request methods you wish to allow
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

                    // Request headers you wish to allow
                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

                    // Set to true if you need the website to include cookies in the requests sent
                    // to the API (e.g. in case you use sessions)
                    res.setHeader('Access-Control-Allow-Credentials', true);

                    res.send(finalResult)
                })
                .catch((err) => {
                    console.log(err);
                });

        // })().then(arrayOfResponses =>
        //     arrayOfResponses.map(item => console.log(item.json()))
        // )
        // .then(allPhotos => {
        //     return allPhotos.json();
        // })

    } catch (err) {
        console.log('error:', err);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))