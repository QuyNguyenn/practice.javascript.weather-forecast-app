import html from "../../redux/core.js";
import {connect} from "../../redux/store.js";

function header({ appData, weatherData }) {

    const current = weatherData.current;

    return html`
        <div class="header">
            <div class="des">
                <i class="fal fa-location"></i>
                Your Location Now
            </div>
            <span class="loction-infor">${appData.location.locationName}, ${appData.location.country}</span>
            <div class="weather-icon-wrapper">
                ${appData.weatherIconHTML(weatherData.current, current.weather[0].id, appData)}
            </div>
        </div>
    `
}

export default connect()(header);