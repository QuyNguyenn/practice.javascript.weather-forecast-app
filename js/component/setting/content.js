import html from "../../redux/core.js";
import {connect} from "../../redux/store.js";

function content({ appData, weatherData}) {

    const current = weatherData.current;

    return html`
        <div class="content">
            <div class="overlay top"></div>
            <div class="weather-summary">
                <div class="weather">${current.weather[0].main}</div>
                <div class="temperature">
                    <span class="value">${appData.unitConvert(current.temp, 'temperature', appData, 1)}</span>
                    <div class="point">°</div>
                </div>
            </div>
            <div class="weather-detail">
                <div class="humidity">
                    <i class="far fa-humidity"></i>
                    <div class="value">${current.humidity}${appData.unitDetail[appData.selectedUnit].humidity}</div>
                </div>
                <div class="pressure">
                    <i class="far fa-thermometer-empty"></i>
                    <div class="value">${appData.unitConvert(current.pressure, 'pressure', appData, 2)} ${appData.unitDetail[appData.selectedUnit].pressure}</div>
                </div>
                <div class="wind">
                    <i class="far fa-wind"></i>
                    <div class="value">${appData.unitConvert(current.wind_speed, 'windSpeed', appData, 2)} ${appData.unitDetail[appData.selectedUnit].windSpeed}</div>
                </div>
            </div>
            <div class="setting-parameter">
                <div class="setting-parameter-item" onclick="dispatch('showModal','changeUnitSet')">
                    <span class="name">Units Set</span>
                    <span class="unit">${appData.selectedUnit}</span>
                    <i class="far fa-chevron-right"></i>
                </div>
                <div class="setting-parameter-item ${appData.selectedUnit != 'custom' ? 'disable' : `" onclick="dispatch('showModal','changeCustomUnit','temperature')`}">
                    <span class="name">Temperature</span>
                    <span class="unit">${appData.unitDetail[appData.selectedUnit].temperature}</span>
                    <i class="far fa-chevron-right"></i>
                </div>
                <div class="setting-parameter-item ${appData.selectedUnit != 'custom' ? 'disable' : `" onclick="dispatch('showModal','changeCustomUnit','pressure')`}">
                    <span class="name">Atmospheric Pressure</span>
                    <span class="unit">${appData.unitDetail[appData.selectedUnit].pressure}</span>
                    <i class="far fa-chevron-right"></i>
                </div>
                <div class="setting-parameter-item ${appData.selectedUnit != 'custom' ? 'disable' : `" onclick="dispatch('showModal','changeCustomUnit','windSpeed')`}">
                    <span class="name">Wind Speed</span>
                    <span class="unit">${appData.unitDetail[appData.selectedUnit].windSpeed}</span>
                    <i class="far fa-chevron-right"></i>
                </div>
                <div class="setting-parameter-item disable">
                    <span class="name">Source</span>
                    <span class="unit">${appData.source}</span>
                    <i class="far fa-chevron-right"></i>
                </div>
            </div>
            <div class="overlay bottom"></div>
        </div>
    `
}

export default connect()(content);