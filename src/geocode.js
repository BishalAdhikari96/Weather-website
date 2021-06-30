const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmlzaGFsOTYiLCJhIjoiY2txOHY1MzhuMDFodTJ1bnNnMzd5dG1xciJ9.DrvNWpXjOt0QqLXMt0OsHQ&limit=1'
    request({url: url, json: true},(error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(response.body.features.length ===0){
            callback('Unable to find location. Try another search.',undefined)
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8983c4fa965ad9f68fd84d00453e0391&query='+latitude +','+ longitude +'&units=f'
    request({ url: url, json: true }, (error, response) => {  
            if(error){
                callback('Unable to connect to weather service!',undefined)
            }else if(response.body.error){
                callback('Unable to find location!',undefined)
            }
            else{
                callback(undefined , {
                    currentTemp: response.body.current.temperature,
                    feelsLike: response.body.current.feelslike
                })
            }            
        })
}

module.exports = {
    geocode,
    forecast
}