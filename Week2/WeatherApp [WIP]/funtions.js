export { retrieveCityData, retrieveWeatherData, populatePage }

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(response.status);
        }
        return response.json();
    } catch (error) {
        console.log('Fetching error:', error);
        throw error;
    }
}

function getGeolocation() {
    return new Promise(resolve => {
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported');
            return;
        }
        navigator.geolocation.getCurrentPosition(position => resolve(position.coords));
    })
}

async function retrieveCityData(apiKey) {
    try {
        const location = await getGeolocation();
        const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${location.latitude}%2C%20${location.longitude}&language=en-US&details=true&toplevel=true`;
        return  await fetchData(locationUrl);
    } catch (error) {
        console.log('Error while retrieving city data:', error);
        throw error;
    }
}

async function retrieveWeatherData(apiKey, cityKey) {
    try {
        const forecastUrl = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`;
        return await fetchData(forecastUrl);
    } catch (error) {
        console.log('Error while retrieving weather data:', error);
        throw error;
    }
}

function populatePage(cityData, weatherData) {
    const weatherDataMetric = weatherData[0].Temperature.Metric;
    const weatherDataImperial = weatherData[0].Temperature.Imperial;
    const cityEl = document.querySelector('#city-name');
    const iconEl = document.querySelector('#icon');
    const degreeSection = document.querySelector('.degree-section');
    const temperatureEl = document.querySelector('#temperature');
    const temperatureScaleEl = document.querySelector('#temperature-scale');
    const weatherStatusEl = document.querySelector('#weather-status');


    cityEl.innerHTML = cityData.EnglishName;
    //iconEl.innerHTML = icon;
    temperatureEl.innerHTML = weatherDataMetric.Value;
    temperatureScaleEl.innerHTML = weatherDataMetric.Unit;
    weatherStatusEl.innerHTML = weatherData[0].WeatherText;

    degreeSection.addEventListener('click', () => {

        if (temperatureScaleEl.innerHTML === 'C') {
            temperatureEl.innerHTML = weatherDataImperial.Value;
            temperatureScaleEl.innerHTML = weatherDataImperial.Unit;
        }
        else {
            temperatureEl.innerHTML = weatherDataMetric.Value;
            temperatureScaleEl.innerHTML = weatherDataMetric.Unit;
        }
    })
}