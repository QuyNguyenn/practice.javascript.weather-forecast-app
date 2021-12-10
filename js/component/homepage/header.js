import html from "../../redux/core.js";
import { connect } from "../../redux/store.js";

function header({ appData, weatherData }) {
    const current = weatherData.current;

    return html`
        <div class="header">
            <div class="moon-sun-img ${appData.dayOrNight(current.sunrise, current.sunset) ? 'sun' : 'moon'}">
            </div>
            <div class="cloud cloud--${appData.dayOrNight(current.sunrise, current.sunset) ? 'day' : 'night'}">
                <i class="fas fa-cloud"></i>
            </div>
            <div class="select-location">${appData.location.locationName}</div>
            <div class="today-summary">
                <div class="temperature">
                    <span class="value">${appData.unitConvert(current.temp, 'temperature', appData, 1)}</span>
                    <div class="point">°</div>
                </div>
                <div class="today-weather">${current.weather[0].main}</div>
            </div>
        </div>
    `
}

// ${Math.round(current.temp * 10) / 10} 

export default connect()(header);