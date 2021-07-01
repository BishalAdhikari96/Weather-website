const path = require('path')
const express = require('express')
const hbs = require('hbs')
const utility = require('./geocode')

console.log(path.join(__dirname, '../public'))
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to the server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bishal Adhikari'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bishal Adhikari'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help and Support',
        name: 'Bishal Adhikari'
    })
})

app.get('/weather',(req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Please provide search address'
        })
    }else {
        utility.geocode(address, (error, data) => {
            if(error){
                return res.send({
                    error
                })
            }
        
            utility.forecast(data.latitude, data.longitude, (error,forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    address,
                    forecastData       
                })               
            })
        })  
    }
    
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        product: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('errorpage',{
        title: '404',
        name: 'Bishal',
        message: 'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('errorpage',{
        title: '404',
        name: 'Bishal',
        message: 'Page not found.'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})