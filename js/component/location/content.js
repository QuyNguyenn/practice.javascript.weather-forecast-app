import html from "../../redux/core.js";
import { connect } from "../../redux/store.js";

function content(state) {

    const weatherDatas = state.weatherDataLocationHis;
    const locationHistory = state.appData.locationHistory;

    return html`
        <div class="content">
            <div class="overlay-search"></div>
            <div class="overlay top"></div>
            <ul class="another-city-list">
                ${locationHistory.map((location, index) => {
                    return html`
                        <li class="another-city-item" onclick="dispatch('showModal','changeLocation','location-index-${index}')">
                            <div class="another-city-item-wrapper">
                                <div class="weather-img">
                                    <i class="fal fa-sun"></i>
                                </div>
                                <div class="temperature">
                                    <span class="value">${state.appData.unitConvert(weatherDatas?.[location.urlPara]?.main.temp || 0, 'temperature', state.appData, 1)}</span>
                                    <div class="point">°</div>
                                </div>
                                <div class="location-infor">
                                    <span class="city-name">${location.locationName}</span>
                                    <span class="country-code">${location.country}</span>
                                </div>
                                <div class="weather-detail">
                                    <div class="humidity">
                                        <i class="far fa-humidity"></i>
                                        <div class="value">${weatherDatas?.[location.urlPara]?.main.humidity || 0}${state.appData.unitDetail[state.appData.selectedUnit].humidity}</div>
                                    </div>
                                    <div class="wind">
                                        <i class="far fa-wind"></i>
                                        <div class="value">${state.appData.unitConvert(weatherDatas?.[location.urlPara]?.wind.speed || 0, 'windSpeed', state.appData, 2)} ${state.appData.unitDetail[state.appData.selectedUnit].windSpeed}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    `
                })}
            </ul>
            <div class="overlay bottom"></div>
        </div>
    `
}

export default connect()(content);