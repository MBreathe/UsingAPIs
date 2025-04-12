import {renderPage} from "./renderingPage.js";

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
    const cityEl = document.querySelector('#city-name');
    const iconEl = document.querySelector('#icon');
    const degreeSection = document.querySelector('.degree-section');
    const temperatureEl = document.querySelector('#temperature');
    const temperatureScaleEl = document.querySelector('#temperature-scale');
    const weatherStatusEl = document.querySelector('#weather-status');
    let scale = 'Metric';

    cityEl.innerHTML = cityData.EnglishName;
    //iconEl.innerHTML = icon;
    temperatureEl.innerHTML = weatherData[0].Temperature[scale].Value;
    temperatureScaleEl.innerHTML = temperatureScale;
    weatherStatusEl.innerHTML = weatherData[0].WeatherText;

    degreeSection.addEventListener('click', () => {
        if (temperatureScale === 'Metric') {
            temperatureScale = 'Imperial';
            temperatureScaleEl.innerHTML = temperatureScale;
        }
        else {
            temperatureScale = 'C';
            temperatureScaleEl.innerHTML = temperatureScale;
        }
    })
}

export async function main() {
    try {
        const apiKey = '17uAlRDLAElbebijBjVjQ4sCt8FUO1y7';
        const cityData = await retrieveCityData(apiKey);
        const cityKey = cityData.Key;
        const weatherData = await retrieveWeatherData(apiKey, cityKey);

        populatePage(cityData, weatherData);
    } catch (error) {
        console.log('Error occurred inside main function:',error);
    }

}

/*
const main = async () => {
        fetchLocationData()
            .then(locationData => {
                LOCATION_TIMEZONE_EL.innerHTML = locationData.EnglishName;
                const key = locationData.Key;
                return key;}).then(key => fetchForecastData(key))
            .then(forecastData => {
                const data = forecastData[0];
                console.log(data);
                TEMPERATURE_DESCRIPTION_EL.innerHTML = data.WeatherText;
                TEMPERATURE_DEG_EL.innerHTML = data.Temperature.Metric.Value;
                TEMPERATURE_SCALE_EL.innerHTML = data.Temperature.Metric.Unit;
                let metric = true;
                let scale;
                TEMPERATURE_SECTION_EL.addEventListener('click', () => {
                    if (!metric) {
                        metric = true;
                        scale = 'Metric';
                    }
                    else {
                        metric = false;
                        scale = 'Imperial';
                    }
                    TEMPERATURE_DEG_EL.innerHTML = data.Temperature[scale].Value;
                    TEMPERATURE_SCALE_EL.innerHTML = data.Temperature[scale].Unit;
                    console.log(metric);
                })
            })
    });

}
*/

window.addEventListener('load', renderPage);