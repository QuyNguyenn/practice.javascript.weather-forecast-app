import html from "../../redux/core.js";
import { connect } from "../../redux/store.js";

const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

Date.prototype.getHoursByTimezone = function (timezone) {
    timezone = timezone / 60;

    const UTCHour = this.getUTCHours();
    const UTCMinute = this.getUTCMinutes();

    let localHours = (UTCHour + UTCMinute / 60) + timezone;
    let result = Math.floor(localHours);

    if (result > 23) {
        result -= 24;
    }
    else if (result < 0) {
        result += 24;
    }

    return result;
}

Date.prototype.getMinutesByTimezone = function (timezone) {
    timezone = timezone / 60;

    const UTCHour = this.getUTCHours();
    const UTCMinute = this.getUTCMinutes();

    let localHours = (UTCHour + UTCMinute / 60) + timezone;
    let result = Math.round((localHours - Math.trunc(localHours)) * 60);

    return result;
}

Date.prototype.getDayByTimezone = function (timezone) {
    timezone = timezone / 60;

    const UTCDay = this.getUTCDay();
    const UTCHour = this.getUTCHours();
    const UTCMinute = this.getUTCMinutes();

    let localTime = (UTCHour + UTCMinute / 60) + timezone;
    let localHour = Math.floor(localTime);
    let result = UTCDay;

    if (localHour > 23) {
        result++;
    }
    else if (result < 0) {
        result--;
    }

    if (result > 6) {
        result -= 7;
    }
    else if (result < 0) {
        result += 7;
    }

    return result;
}

function timeConvert(timeStamp, timezone) {
    let date = new Date(timeStamp * 1000);

    let localHour = date.getHoursByTimezone(timezone / 60);
    let localMinute = date.getMinutesByTimezone(timezone / 60);
    let period = 'AM';

    if (localHour > 12) {   
        period = 'PM';
        localHour =  localHour - 12;
    }

    if (localHour == 0) {
        period = 'PM';
        localHour = 12;
    }

    return `${
                localHour.toString().length < 2 ? '0' + localHour.toString() : localHour
            }:${
                localMinute.toString().length < 2 ? '0' + localMinute.toString() : localMinute
            } ${period}`;
}

function dayConvert(timeStamp, timezone) {
    let date = new Date(timeStamp * 1000);

    return day[date.getDayByTimezone(timezone / 60)]
}

const htmlHourly = (weatherData, appData) => {
    const date = new Date(weatherData.hourly[0].dt * 1000)
    let i = 0;
    let htmls = [];

    if (date.getHoursByTimezone(weatherData.timezone_offset / 60) % 2 != 0) {
        i = 1;
    }

    for (let j = 0; j < 12; j += 1) {
        htmls = htmls.concat([html`
            <div class="today-hourly-slide--item">
                <div class="hour">${timeConvert(weatherData.hourly[i].dt, weatherData.timezone_offset)}</div>
                    ${appData.weatherIconHTML(weatherData.current, weatherData.hourly[i].weather[0].id, appData)}
                <div class="temperature">
                    <span class="value">${appData.unitConvert(weatherData.hourly[i].temp, 'temperature', appData, 1)}</span>
                    <div class="point">°</div>
                </div>
            </div>
        `])
        i += 2;
    }

    return htmls.join('');
}

const htmlDaily = (weatherData, appData) => {
    return weatherData.daily.map((crr, index) => {
        let day = dayConvert(crr.dt, weatherData.timezone_offset);

        if (index == 0) {
            day = 'Today';
        }

        return html`
        <div class="daily--item">
        <div class="day">${day}</div>
        <div class="weather-icon-wrapper">
            ${appData.weatherIconHTML(weatherData.current, crr.weather[0].id, appData)}
        </div>
        <div class="highest-temp temperature">
            <span class="value">${appData.unitConvert(crr.temp.max, 'temperature', appData, 1)}</span>
            <div class="point">°</div>
        </div>
        <div class="lowest-temp temperature">
            <span class="value">${appData.unitConvert(crr.temp.min, 'temperature', appData, 1)}</span>
            <div class="point">°</div>
        </div>
    </div>
        `
    }).join('')
}

function content({ weatherData, appData }) {

    const {current, hourly}  = weatherData;

    return html`
        <div class="content">
            <div class="overlay top"></div>
            <div class="today-detail">
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
            <div class="today-sunset-sunrise">
                <div class="sunrise">
                    <div class="sunrise-img"></div>
                    ${timeConvert(current.sunrise, weatherData.timezone_offset)}
                </div>
                <canvas id="day-night-curve" onresize="console.log([this])"></canvas>
                <div class="sunset">
                    ${timeConvert(current.sunset, weatherData.timezone_offset)}
                    <div class="sunset-img"></div>
                </div>
            </div>
            <div class="today-hourly">
                <div class="title">Hourly</div>
                <div class="today-hourly-slide">
                    ${htmlHourly(weatherData, appData)}
                </div>
            </div>
            <div class="daily">
                <div class="title">Daily</div>
                <div class="daily--list">
                    ${htmlDaily(weatherData, appData)}
                </div>
            </div>
            <div class="overlay bottom"></div>
        </div>
    `
}

export default connect()(content);