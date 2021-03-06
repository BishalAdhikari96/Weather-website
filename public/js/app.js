const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    const url = '/weather?address=' + encodeURIComponent(location)
    fetch(url).then(((response) => {
    response.json().then((data) => {
        if(data.error){
            // console.log(data.error)
            messageOne.textContent= data.error
            messageTwo.textContent= ''
        }else {
            messageOne.textContent= data.address
            messageTwo.textContent = 'Current Temperature: ' + data.forecastData.currentTemp + '. Feels Like: ' + data.forecastData.feelsLike
        }        
    })
}))
})