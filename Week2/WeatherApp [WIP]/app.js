const API_KEY = '17uAlRDLAElbebijBjVjQ4sCt8FUO1y7';
const LOCATION_TIMEZONE_EL = document.querySelector('.location-timezone');
const ICON_EL = document.querySelector('.icon');
const TEMPERATURE_DEG_EL = document.querySelector('.temperature-degree');
const TEMPERATURE_SCALE_EL = document.querySelector('.temperature-scale');
const TEMPERATURE_DESCRIPTION_EL = document.querySelector('.temperature-description');
const TEMPERATURE_SECTION_EL = document.querySelector('.degree-section');


const main = async () => {
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported.');
        return;
    }

    await navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude}%2C%20${longitude}&language=en-US&details=true&toplevel=true`;

        const fetchLocationData = async () => {
            try {
                const response = await fetch(locationUrl);
                if (!response.ok) {
                    console.log(response.status);
                }
                const json = await response.json();
                return json;
            } catch (err) {
                console.log(err);
            }
        }

        const fetchForecastData = async (key) => {
            try {
                const forecastUrl = `https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`;
                const response = await fetch(forecastUrl);
                if (!response.ok) {
                    console.log(response.status);
                }
                const json = await response.json();
                return json;
            } catch (err) {
                console.log(err);
            }
        }

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

window.addEventListener('load', main);