let userLat
let userLong
const getBtn = document.querySelector('#get-btn')
const errorField = document.getElementById('error-field')
const uvInfoArea = document.getElementById('uv-info')
const recColumn = document.getElementById('recommended')
const description = document.getElementById('desc')
window.addEventListener('DOMContentLoaded', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError)
    } else{
        errorField.innerText = `Geolocation is not supported by this browser`
    }
    
    
    function showPosition(position){
        userLat = position.coords.latitude
        userLong = position.coords.longitude
        document.getElementById('location-notice').style.display = 'none'

    }
    function showError(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorField.innerHTML = "User denied the request for Geolocation.<br> Please enable to use this service."
            break;
          case error.POSITION_UNAVAILABLE:
            errorField.innerText = "Location information is unavailable."
            break;
          case error.TIMEOUT:
            errorField.innerText = "The request to get user location timed out."
            break;
          case error.UNKNOWN_ERROR:
            errorField.innerText = "An unknown error occurred."
            break;
        }
      }



})
document.getElementById('bottle').addEventListener('click', ()=> location.reload())

getBtn.addEventListener('click', async ()=>{
  try {
	  const response = await fetch(`https://api.openuv.io/api/v1/uv?lat=${userLat}&lng=${userLong}`,{
			method: 'GET',
			headers: {
	            'x-access-token': 'b0a8781d243add3f163eeb6e80a23c0e'
	        },})
	
	    if(response.status === 200){
	        const info = await response.json()
	        const uvIndex = info.result.uv
            getBtn.disabled = true
            getBtn.innerText = 'Success!'
            if(uvIndex <= 3){
                
                recColumn.style.visibility = 'visible'
                description.innerText = `Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 15+ sunscreen. Bright surfaces, sand, water, and snow, will increase UV exposure.`
                document.body.style.backgroundColor = 'rgb(50,134,36)'
                uvInfoArea.style.color = 'rgb(50,134,36)'
                uvInfoArea.innerHTML = `<strong>UV Index:</strong> ${uvIndex}<br><strong>Risk:</strong> <u>Low</u> <br>No Sunscreen Needed!`

            } else if (uvIndex <= 5 && uvIndex > 3){
                
                recColumn.style.visibility = 'visible'
                description.innerText = `Stay in shade near midday when the Sun is strongest. If outdoors, wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.`
                document.body.style.backgroundColor = 'rgb(153,146,0)'
                uvInfoArea.style.color = 'rgb(153,146,0)'
                uvInfoArea.innerHTML = `<strong>UV Index:</strong> ${uvIndex}<br><strong>Risk:</strong> <u>Moderate</u> <br>Sunscreen Suggested!`
            } 
            else if (uvIndex <=7 && uvIndex > 5){

                recColumn.style.visibility = 'visible'
                description.innerText = `Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.`
                document.body.style.backgroundColor = 'rgb(193,111,0)'
                uvInfoArea.style.color = 'rgb(193,111,0)'
                uvInfoArea.innerHTML = `<strong>UV Index:</strong> ${uvIndex}<br><strong>Risk:</strong> <u>High!</u> <br>Sunscreen Suggested!`

            }
            else if(uvIndex < 11 && uvIndex > 7){

                recColumn.style.visibility = 'visible'
                description.innerText = `Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly. Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.`
                document.body.style.backgroundColor = 'rgb(183,40,13)'
                uvInfoArea.style.color = 'rgb(183,40,13)'
                uvInfoArea.innerHTML = `<strong>UV Index:</strong> ${uvIndex}<br><strong>Risk:</strong> <u>Very High!</u> <br>Sunscreen Strongly Suggested!`

            }
            else if(uvIndex >= 11){

                recColumn.style.visibility = 'visible'
                description.innerText = `Take all precautions because unprotected skin and eyes can burn in minutes. Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.`
                document.body.style.backgroundColor = 'rgb(126,61,111)'
                uvInfoArea.style.color = 'rgb(126,61,111)'
                uvInfoArea.innerHTML = `<strong>UV Index:</strong> ${uvIndex}<br><strong>Risk:</strong> <u>Extreme!</u> <br>Sunscreen Heavily Suggested!`

            }
	    
        } else {
	        throw new Error('Failed to get UV Index data. Try again.')
	    }
} catch (e) {
	errorField.innerText += `\n ${e.message}`
    getBtn.style.display = 'none'
    const retryBtn = document.createElement('button')
    retryBtn.setAttribute('class', 'btn btn-warning')
    retryBtn.innerText = 'Retry'
    document.querySelector('.btn-section').appendChild(retryBtn)
    retryBtn.addEventListener('click', ()=> location.reload())
}

})
