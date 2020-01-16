const express = require('express');
const path = require('path'); //core node module
const hbs = require('hbs'); //doesn't need this to start using hbs // this is for setting up partials which are like components
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname); //variables node provide
//console.log(path.join(__dirname, '../public'));

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public'); //we need this because we can't use relative path here// we must use absolute paths
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs'); //setting up handlebars template engine//for dynamic code
app.set('views', viewsPath); //configuring views dir // otherwise express will look for hbs files in views dir
hbs.registerPartials(partialsPath); //configuring partials

app.use(express.static(publicDirectoryPath));  //app.use serves up what we want //in this case, index.html //index.html file automatically serves at root dir , so, we don't need a special code for like below
//if we want to visit another html page from public folder, we just enter their name in the url, eg. localhost:3000/help.html

app.get('' ,(req, res) => {//rendering hbs file which must be in the views folder by default
    res.render('index', {  //the name of the hbs file we want to render
        title: 'Weather App',
        name: 'Thet Aung'
    })
});//after this we deleted index.html

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Thet Aung'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'How may I help you?',
        name: 'Thet Aung'
    })
});

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({error: 'Address must be provided'})
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => { //setting up default parameters
        if(error){ // error handling // error alone isn't enough // node doesn't accept us destructuring off of body if it's undefined, so we must move it below error handling
            return res.send({error})
        }
        //const {latitude, longitude, location} = body; //or we can use default parameters

            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }
                res.send({
                    address,
                    location,
                    forecast: forecastData
                })
            })
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search) { //making search query required
       return  res.send({ //we must be careful here// if we didn't use return the rest of the code will still run and we'll be sending 2 responses and it is not allowed. if error >> cannot set headers after they are sent to the client << showed up, it is because we are sending back multiple responses
            error: 'You must provide search item'
        })
    }
    console.log(req.query); //checking value from query string // remember query string comes after question mark ?
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404Page', {
        title: '404 NOT FOUND',
        name: 'Thet Aung',
        errorMessage: 'Help article not found'
    })
});

app.get('*', (req, res) => { //* means default url page// if the url doesn't match all of the get methods above // we want to render this //this has to be the last of course
    //res.send('404 not found')
    res.render('404Page', {
        title: '404 NOT FOUND',
        name: "Thet Aung",
        errorMessage: 'Page not found'
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is listening to port ${process.env.PORT}`)
});