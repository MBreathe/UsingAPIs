import {renderPage} from "./landingPage.js";
import { retrieveCityData, retrieveWeatherData, populatePage } from './funtions.js'

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

window.addEventListener('load', renderPage);