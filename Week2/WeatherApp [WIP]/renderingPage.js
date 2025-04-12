import {main} from './app.js';

export function renderPage() {
    const containerMainEl = document.querySelector('#app');
    containerMainEl.appendChild(document.createElement('div')).classList.add('container-location');
    containerMainEl.appendChild(document.createElement('div')).classList.add('container-weather');

    const containerLocationEl = document.querySelector('.container-location');
    containerLocationEl.appendChild(document.createElement('h1')).id = 'city-name';
    containerLocationEl.appendChild(document.createElement('span')).id = 'icon';

    const containerWeatherEl = document.querySelector('.container-weather');
    containerWeatherEl.appendChild(document.createElement('div')).classList.add('degree-section');
    containerWeatherEl.appendChild(document.createElement('p')).id = 'weather-status';

    const degreeSectionEl = document.querySelector('.degree-section');
    degreeSectionEl.appendChild(document.createElement('h2')).id = 'temperature';
    degreeSectionEl.appendChild(document.createElement('span')).id = 'temperature-scale';

    main();
}