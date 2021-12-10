import Convert from "../lib/convert-units.js";
import storage from "../../util/storage.js";

const init = {
    appData: {
        changeUnitSet: false,
        changeCustomUnit: '',
        changeLocation: '',
        screen: 'homepage',
        location: {
            urlPara: 'saigon',
            latitude: 10.825789,
            longitude: 106.716823,
            locationName: 'Ho Chi Minh',
            country: 'Vietnam'
        },
        locationHistory: [
            {
                urlPara: 'saigon',
                latitude: 10.825789,
                longitude: 106.716823,
                locationName: 'Ho Chi Minh',
                country: 'Vietnam',
            },
            {
                urlPara: 'conson',
                latitude: 8.687102,
                longitude: 106.607644,
                locationName: 'Con Son',
                country: 'Vietnam',
            },
            {
                urlPara: 'vungtau',
                latitude: 10.347256,
                longitude: 107.080183,
                locationName: 'Vung Tau',
                country: 'Vietnam',
            },
            {
                urlPara: 'dalat',
                latitude: 11.939078,
                longitude: 108.445397,
                locationName: 'Da Lat',
                country: 'Vietnam',
            },
            {
                urlPara: 'danang',
                latitude: 16.079515,
                longitude: 108.166523,
                locationName: 'Da Nang',
                country: 'Vietnam',
            },
            {
                urlPara: 'hanoi',
                latitude: 21.027292,
                longitude: 105.835417,
                locationName: 'Ha Noi',
                country: 'Vietnam',
            }
        ],
        unitSets: ['standard', 'metric', 'imperial', 'custom'],
        unitDetail: {
            standard: {
                temperature: 'kelvin',
                pressure: 'hPa',
                humidity: '%',
                windSpeed: 'm/s'
            },
            metric: {
                temperature: 'Celsius',
                pressure: 'hPa',
                humidity: '%',
                windSpeed: 'm/s'
            },
            imperial: {
                temperature: 'Fahrenheit',
                pressure: 'hPa',
                humidity: '%',
                windSpeed: 'miles/hour'
            },
            custom: {
                temperature: 'Celsius',
                pressure: 'hPa',
                humidity: '%',
                windSpeed: 'm/s'
            }
        },
        customUnitList: {
            temperature: [ 'Celsius', 'kelvin', 'Fahrenheit' ],
            pressure: [ 'hPa', 'mBar', 'psi' ],
            humidity: [ '%' ],
            windSpeed: [ 'm/s', 'km/h', 'm/h', 'ft/s' ],
        },
        unitList: {
            'Celsius': 'C',
            'kelvin': 'K',
            'Fahrenheit': 'F',
            'hPa': 'hPa',
            'mBar': 'mBar',
            'psi': 'psi',
            '%': '%',
            'm/s': 'm/s',
            'km/h': 'km/h',
            'm/h': 'm/h',
            'ft/s': 'ft/s',
        },
        selectedUnit: 'metric',
        unitSetAPI: 'metric',
        dayOrNight: (sunRiseTime, sunSetTime) => {
            let now = Date.now() / 1000;
            return (sunRiseTime < now && now < sunSetTime) ? true : false;
        },
        unitConvert: (value, para, appData, fixed = -1) => {
            if (appData.selectedUnit == 'custom') {
                const convert = Convert();

                const unitFrom = appData.unitList[
                    appData.unitDetail[appData.unitSetAPI][para]
                ];
                const unitTo = appData.unitList[
                    appData.unitDetail.custom[para]
                ];
                
                const newValue = convert(value).from(unitFrom).to(unitTo);
                value = newValue;
            }
            
            if (fixed >= 0) {
                value = value.toFixed(fixed);
                value = parseFloat(value);
            }

            return value;
        },
        tempConvert: temp => {
            return (Math.round(temp * 10) / 10).toFixed(1);
        },
        weatherIconHTML: (currentWeather, weatherId, appData) => {
            return `
                <div class="weather-icon weather-icon--${appData.dayOrNight(currentWeather.sunrise, currentWeather.sunset) ? 'day' : 'night'}">
                    ${
                        appData.dayOrNight(currentWeather.sunrise, currentWeather.sunset) ? 
                        appData.icons[appData.iconMapping[weatherId]].icon[0] : 
                        appData.icons[appData.iconMapping[weatherId]].icon?.[1] || 
                        appData.icons[appData.iconMapping[weatherId]].icon[0]
                    }
                </div>
            `
        },
        icons: [
            {
                id: 0,
                des: 'clear sky',
                icon: [
                    `
                        <div class="weather-icon-main">
                            <div class="moon-sun-img sun"></div>
                        </div>
                    `,
                    `
                        <div class="weather-icon-main">
                            <div class="moon-sun-img moon"></div>
                        </div>
                    `
                ]
            },
            {
                id: 1,
                des: 'few clouds',
                icon: [
                    `
                        <div class="weather-icon-main">
                            <div class="moon-sun-img sun"></div>
                        </div>
                        <div class="weather-icon-sub">
                            <i class="fas fa-cloud"></i>
                        </div>
                    `,
                    `
                        <div class="weather-icon-main">
                            <div class="moon-sun-img moon"></div>
                        </div>
                        <div class="weather-icon-sub">
                            <i class="fas fa-cloud"></i>
                        </div>
                    `,
                ]
            },
            {
                id: 2,
                des: 'scattered clouds',
                icon: [
                    `
                        <div class="weather-icon-main">
                            <i class="fad fa-cloud"></i>
                        </div>
                    `
                ]
            },
            {
                id: 3,
                des: 'broken clouds',
                icon: [
                    `
                        <div class="weather-icon-main">
                            <i class="fad fa-clouds"></i>
                        </div>
                    `
                ]
            },
            {
                id: 4,
                des: 'shower rain',
                icon: [
                    `
                        <div class="weather-icon-main">
                            <i class="fas fa-cloud-showers"></i>
                        </div>
                    `
                ]
            },
            {
                id: 5,
                des: 'rain',
                icon: [
                    `
                        <div class="weather-icon-main">
                            <div class="moon-sun-img sun"></div>
                        </div>
                        <div class="weather-icon-sub">
                            <i class="fas fa-cloud-showers"></i>
                        </div>
                    `,
                    `
                        <div class="weather-icon-main">
                            <div class="moon-sun-img moon"></div>
                        </div>
                        <div class="weather-icon-sub">
                            <i class="fas fa-cloud-showers"></i>
                        </div>
                    `
                ]
            },
            {
                id: 6,
                des: 'thunderstorm',
                icon: [
                    `
                        <div class="weather-icon-main">
                            <div class="moon-sun-img sun"></div>
                        </div>
                        <div class="weather-icon-sub">
                            <i class="fas fa-cloud-showers"></i>
                        </div>
                    `
                ]
            },
            {
                id: 7,
                des: 'snow',
                icon: [
                    `
                        <div class="weather-icon-main">
                            <i class="far fa-snowflakes"></i>
                        </div>
                    `
                ]
            },
            {
                id: 8,
                des: 'mist',
                icon: [
                    `
                        <div class="weather-icon-main">
                            <i class="fas fa-fog"></i>
                        </div>
                    `
                ]
            },
        ],
        iconMapping: {
            '200': 6,
            '201': 6,
            '202': 6,
            '210': 6,
            '211': 6,
            '212': 6,
            '221': 6,
            '230': 6,
            '231': 6,
            '232': 6,
            '300': 4,
            '301': 4,
            '302': 4,
            '310': 4,
            '311': 4,
            '312': 4,
            '313': 4,
            '314': 4,
            '321': 4,
            '500': 5,
            '501': 5,
            '502': 5,
            '503': 5,
            '504': 5,
            '511': 7,
            '520': 4,
            '521': 4,
            '522': 4,
            '531': 4,
            '600': 7,
            '601': 7,
            '602': 7,
            '611': 7,
            '612': 7,
            '613': 7,
            '615': 7,
            '616': 7,
            '620': 7,
            '621': 7,
            '622': 7,
            '701': 8,
            '711': 8,
            '721': 8,
            '731': 8,
            '741': 8,
            '751': 8,
            '761': 8,
            '762': 8,
            '771': 8,
            '781': 8,
            '800': 0,
            '801': 1,
            '802': 2,
            '803': 3,
            '804': 3,
        },
        getAPIURL: (latitude, longitude, units, apiKey, mode = 'onecall') => {
            let url = `https://api.openweathermap.org/data/2.5/${mode}?lat=${latitude}&lon=${longitude}&exclude=minutely,alert&units=${units}&appid=${apiKey}`;

            return url;
        },
        getDataMain: (state) => {
            let location = state.appData.location;
            let unit = state.appData.unitSetAPI;
            let apiKey = state.appData.apiKey;
            let apiURL = state.appData.getAPIURL(location.latitude, location.longitude, unit, apiKey);

            fetch(apiURL)
                .then((response => {
                    return response.json();
                }))
                .then(data => {
                    Object.assign(state.weatherData, data);
                    dispatch();
                })
                .catch(e => {
                    console.log(e);
                })
        },
        getDataHistoryLocation: (state) => {
            let unit = state.appData.unitSetAPI;
            let apiKey = state.appData.apiKey;

            async function getDatas(locationHistory) {

                for (let location of locationHistory) {
                    let apiURL = state.appData.getAPIURL(location.latitude, location.longitude, unit, apiKey, 'weather');

                    const response = await fetch(apiURL);

                    if (!response.ok) {
                        const message = `An error has occured: ${response.status}`;
                        throw new Error(message);
                    }

                    const data = await response.json();
                    state.weatherDataLocationHis[location.urlPara] = data;
                }
                
                dispatch();
            }

            getDatas(state.appData.locationHistory);
        },
        getDataAll: (state) => {
            state.appData.getDataMain(state);
            state.appData.getDataHistoryLocation(state);
        },
        apiKey: '84fdd0abc73f15c81c7e9476e961f0c8',
        source: 'openweathermap.org',
    },
    weatherData: {
        "lat":10.8258,
        "lon":106.7168,
        "timezone":"Asia/Ho_Chi_Minh",
        "timezone_offset":25200,
        "current":{
            "dt":1638862810,
            "sunrise":1638831556,
            "sunset":1638873005,
            "temp":30.03,
            "feels_like":31.76,
            "pressure":1011,
            "humidity":54,
            "dew_point":19.71,
            "uvi":3.36,
            "clouds":40,
            "visibility":10000,
            "wind_speed":1.54,
            "wind_deg":0,
            "weather":[
                {
                    "id":802,
                    "main":"Clouds",
                    "description":"scattered clouds",
                    "icon":"03d"
                }
            ]
        },
        "hourly":[
            {
                "dt":1638860400,
                "temp":30.02,
                "feels_like":31.92,
                "pressure":1011,
                "humidity":55,
                "dew_point":19.99,
                "uvi":6.08,
                "clouds":52,
                "visibility":10000,
                "wind_speed":2.79,
                "wind_deg":324,
                "wind_gust":2.41,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638864000,
                "temp":30.03,
                "feels_like":31.76,
                "pressure":1011,
                "humidity":54,
                "dew_point":19.71,
                "uvi":3.36,
                "clouds":40,
                "visibility":10000,
                "wind_speed":2.91,
                "wind_deg":322,
                "wind_gust":2.9,
                "weather":[
                    {
                    "id":802,
                    "main":"Clouds",
                    "description":"scattered clouds",
                    "icon":"03d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638867600,
                "temp":29.78,
                "feels_like":31.69,
                "pressure":1011,
                "humidity":56,
                "dew_point":20.06,
                "uvi":1.25,
                "clouds":52,
                "visibility":10000,
                "wind_speed":2.3,
                "wind_deg":316,
                "wind_gust":3.62,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638871200,
                "temp":29.07,
                "feels_like":30.85,
                "pressure":1011,
                "humidity":58,
                "dew_point":19.97,
                "uvi":0.22,
                "clouds":64,
                "visibility":10000,
                "wind_speed":1.44,
                "wind_deg":281,
                "wind_gust":2.45,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638874800,
                "temp":27.74,
                "feels_like":29.28,
                "pressure":1011,
                "humidity":62,
                "dew_point":19.8,
                "uvi":0,
                "clouds":74,
                "visibility":10000,
                "wind_speed":1.37,
                "wind_deg":232,
                "wind_gust":1.56,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638878400,
                "temp":26.3,
                "feels_like":26.3,
                "pressure":1012,
                "humidity":67,
                "dew_point":19.69,
                "uvi":0,
                "clouds":83,
                "visibility":10000,
                "wind_speed":1.2,
                "wind_deg":209,
                "wind_gust":2.17,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638882000,
                "temp":24.42,
                "feels_like":24.93,
                "pressure":1012,
                "humidity":77,
                "dew_point":20.04,
                "uvi":0,
                "clouds":77,
                "visibility":10000,
                "wind_speed":0.58,
                "wind_deg":207,
                "wind_gust":2.82,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638885600,
                "temp":23.89,
                "feels_like":24.42,
                "pressure":1013,
                "humidity":80,
                "dew_point":20.16,
                "uvi":0,
                "clouds":55,
                "visibility":10000,
                "wind_speed":0.27,
                "wind_deg":162,
                "wind_gust":2.52,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638889200,
                "temp":23.4,
                "feels_like":23.94,
                "pressure":1013,
                "humidity":82,
                "dew_point":20.16,
                "uvi":0,
                "clouds":58,
                "visibility":10000,
                "wind_speed":0.83,
                "wind_deg":127,
                "wind_gust":3.24,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638892800,
                "temp":22.94,
                "feels_like":23.51,
                "pressure":1013,
                "humidity":85,
                "dew_point":20.24,
                "uvi":0,
                "clouds":46,
                "visibility":10000,
                "wind_speed":1.05,
                "wind_deg":144,
                "wind_gust":3.29,
                "weather":[
                    {
                    "id":802,
                    "main":"Clouds",
                    "description":"scattered clouds",
                    "icon":"03n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638896400,
                "temp":22.62,
                "feels_like":23.21,
                "pressure":1013,
                "humidity":87,
                "dew_point":20.23,
                "uvi":0,
                "clouds":40,
                "visibility":10000,
                "wind_speed":0.97,
                "wind_deg":169,
                "wind_gust":2.86,
                "weather":[
                    {
                    "id":802,
                    "main":"Clouds",
                    "description":"scattered clouds",
                    "icon":"03n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638900000,
                "temp":22.37,
                "feels_like":22.96,
                "pressure":1013,
                "humidity":88,
                "dew_point":20.24,
                "uvi":0,
                "clouds":44,
                "visibility":10000,
                "wind_speed":0.88,
                "wind_deg":208,
                "wind_gust":2.64,
                "weather":[
                    {
                    "id":802,
                    "main":"Clouds",
                    "description":"scattered clouds",
                    "icon":"03n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638903600,
                "temp":22.08,
                "feels_like":22.67,
                "pressure":1012,
                "humidity":89,
                "dew_point":20.13,
                "uvi":0,
                "clouds":23,
                "visibility":10000,
                "wind_speed":0.8,
                "wind_deg":253,
                "wind_gust":2.33,
                "weather":[
                    {
                    "id":801,
                    "main":"Clouds",
                    "description":"few clouds",
                    "icon":"02n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638907200,
                "temp":21.72,
                "feels_like":22.3,
                "pressure":1012,
                "humidity":90,
                "dew_point":19.89,
                "uvi":0,
                "clouds":44,
                "visibility":10000,
                "wind_speed":0.76,
                "wind_deg":280,
                "wind_gust":2.22,
                "weather":[
                    {
                    "id":802,
                    "main":"Clouds",
                    "description":"scattered clouds",
                    "icon":"03n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638910800,
                "temp":21.4,
                "feels_like":21.95,
                "pressure":1012,
                "humidity":90,
                "dew_point":19.65,
                "uvi":0,
                "clouds":59,
                "visibility":10000,
                "wind_speed":0.51,
                "wind_deg":303,
                "wind_gust":1.85,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0.03
            },
            {
                "dt":1638914400,
                "temp":21.23,
                "feels_like":21.78,
                "pressure":1012,
                "humidity":91,
                "dew_point":19.62,
                "uvi":0,
                "clouds":68,
                "visibility":10000,
                "wind_speed":0.33,
                "wind_deg":18,
                "wind_gust":1.35,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0.03
            },
            {
                "dt":1638918000,
                "temp":21.15,
                "feels_like":21.7,
                "pressure":1013,
                "humidity":91,
                "dew_point":19.66,
                "uvi":0,
                "clouds":74,
                "visibility":10000,
                "wind_speed":0.46,
                "wind_deg":83,
                "wind_gust":1.33,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638921600,
                "temp":22.13,
                "feels_like":22.72,
                "pressure":1014,
                "humidity":89,
                "dew_point":20.19,
                "uvi":0.34,
                "clouds":78,
                "visibility":10000,
                "wind_speed":0.76,
                "wind_deg":95,
                "wind_gust":1.74,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638925200,
                "temp":23.79,
                "feels_like":24.39,
                "pressure":1014,
                "humidity":83,
                "dew_point":20.8,
                "uvi":1.44,
                "clouds":100,
                "visibility":10000,
                "wind_speed":0.83,
                "wind_deg":98,
                "wind_gust":1.6,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638928800,
                "temp":25.56,
                "feels_like":26.18,
                "pressure":1014,
                "humidity":77,
                "dew_point":21.26,
                "uvi":3.5,
                "clouds":100,
                "visibility":10000,
                "wind_speed":0.89,
                "wind_deg":64,
                "wind_gust":1.36,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638932400,
                "temp":27.25,
                "feels_like":29.28,
                "pressure":1014,
                "humidity":70,
                "dew_point":21.29,
                "uvi":5.98,
                "clouds":100,
                "visibility":10000,
                "wind_speed":1.52,
                "wind_deg":34,
                "wind_gust":1.62,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638936000,
                "temp":28.64,
                "feels_like":31.01,
                "pressure":1013,
                "humidity":64,
                "dew_point":21.13,
                "uvi":8.19,
                "clouds":100,
                "visibility":10000,
                "wind_speed":1.83,
                "wind_deg":16,
                "wind_gust":1.83,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638939600,
                "temp":29.42,
                "feels_like":31.76,
                "pressure":1012,
                "humidity":60,
                "dew_point":20.94,
                "uvi":8.84,
                "clouds":100,
                "visibility":10000,
                "wind_speed":2.08,
                "wind_deg":10,
                "wind_gust":1.92,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638943200,
                "temp":29.55,
                "feels_like":31.82,
                "pressure":1011,
                "humidity":59,
                "dew_point":20.84,
                "uvi":7.87,
                "clouds":100,
                "visibility":10000,
                "wind_speed":2.01,
                "wind_deg":10,
                "wind_gust":1.81,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638946800,
                "temp":29.63,
                "feels_like":31.96,
                "pressure":1010,
                "humidity":59,
                "dew_point":20.69,
                "uvi":5.24,
                "clouds":100,
                "visibility":10000,
                "wind_speed":1.93,
                "wind_deg":8,
                "wind_gust":1.75,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638950400,
                "temp":29.75,
                "feels_like":31.99,
                "pressure":1010,
                "humidity":58,
                "dew_point":20.55,
                "uvi":2.9,
                "clouds":100,
                "visibility":10000,
                "wind_speed":1.7,
                "wind_deg":359,
                "wind_gust":1.53,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638954000,
                "temp":29.43,
                "feels_like":31.78,
                "pressure":1010,
                "humidity":60,
                "dew_point":20.8,
                "uvi":1.07,
                "clouds":100,
                "visibility":10000,
                "wind_speed":1.43,
                "wind_deg":337,
                "wind_gust":1.34,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638957600,
                "temp":27.85,
                "feels_like":30.01,
                "pressure":1010,
                "humidity":67,
                "dew_point":21.2,
                "uvi":0.22,
                "clouds":100,
                "visibility":10000,
                "wind_speed":1.26,
                "wind_deg":300,
                "wind_gust":1.8,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638961200,
                "temp":26.36,
                "feels_like":26.36,
                "pressure":1011,
                "humidity":71,
                "dew_point":20.68,
                "uvi":0,
                "clouds":100,
                "visibility":10000,
                "wind_speed":1.16,
                "wind_deg":263,
                "wind_gust":1.39,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638964800,
                "temp":25.73,
                "feels_like":26.29,
                "pressure":1012,
                "humidity":74,
                "dew_point":20.75,
                "uvi":0,
                "clouds":100,
                "visibility":10000,
                "wind_speed":0.59,
                "wind_deg":230,
                "wind_gust":1.42,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638968400,
                "temp":25.01,
                "feels_like":25.6,
                "pressure":1013,
                "humidity":78,
                "dew_point":20.8,
                "uvi":0,
                "clouds":100,
                "visibility":10000,
                "wind_speed":0.59,
                "wind_deg":132,
                "wind_gust":2.08,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638972000,
                "temp":24.53,
                "feels_like":25.13,
                "pressure":1013,
                "humidity":80,
                "dew_point":20.83,
                "uvi":0,
                "clouds":100,
                "visibility":10000,
                "wind_speed":0.84,
                "wind_deg":118,
                "wind_gust":1.6,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638975600,
                "temp":24.18,
                "feels_like":24.79,
                "pressure":1013,
                "humidity":82,
                "dew_point":20.85,
                "uvi":0,
                "clouds":100,
                "visibility":10000,
                "wind_speed":1.05,
                "wind_deg":136,
                "wind_gust":1.78,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638979200,
                "temp":23.85,
                "feels_like":24.46,
                "pressure":1013,
                "humidity":83,
                "dew_point":20.84,
                "uvi":0,
                "clouds":98,
                "visibility":10000,
                "wind_speed":0.73,
                "wind_deg":162,
                "wind_gust":1.69,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638982800,
                "temp":23.56,
                "feels_like":24.16,
                "pressure":1013,
                "humidity":84,
                "dew_point":20.76,
                "uvi":0,
                "clouds":95,
                "visibility":10000,
                "wind_speed":0.16,
                "wind_deg":132,
                "wind_gust":1.4,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638986400,
                "temp":23.25,
                "feels_like":23.85,
                "pressure":1012,
                "humidity":85,
                "dew_point":20.6,
                "uvi":0,
                "clouds":93,
                "visibility":10000,
                "wind_speed":0.53,
                "wind_deg":4,
                "wind_gust":1.31,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638990000,
                "temp":22.98,
                "feels_like":23.58,
                "pressure":1011,
                "humidity":86,
                "dew_point":20.41,
                "uvi":0,
                "clouds":99,
                "visibility":10000,
                "wind_speed":1.06,
                "wind_deg":1,
                "wind_gust":1.44,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638993600,
                "temp":22.72,
                "feels_like":23.29,
                "pressure":1011,
                "humidity":86,
                "dew_point":20.24,
                "uvi":0,
                "clouds":99,
                "visibility":10000,
                "wind_speed":1.3,
                "wind_deg":25,
                "wind_gust":1.77,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1638997200,
                "temp":22.56,
                "feels_like":23.12,
                "pressure":1011,
                "humidity":86,
                "dew_point":20.1,
                "uvi":0,
                "clouds":99,
                "visibility":10000,
                "wind_speed":1.66,
                "wind_deg":18,
                "wind_gust":2.24,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1639000800,
                "temp":22.46,
                "feels_like":23.01,
                "pressure":1012,
                "humidity":86,
                "dew_point":19.91,
                "uvi":0,
                "clouds":99,
                "visibility":10000,
                "wind_speed":1.81,
                "wind_deg":30,
                "wind_gust":2.61,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1639004400,
                "temp":22.4,
                "feels_like":22.92,
                "pressure":1012,
                "humidity":85,
                "dew_point":19.73,
                "uvi":0,
                "clouds":100,
                "visibility":10000,
                "wind_speed":1.64,
                "wind_deg":36,
                "wind_gust":2.26,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04n"
                    }
                ],
                "pop":0
            },
            {
                "dt":1639008000,
                "temp":23.32,
                "feels_like":23.85,
                "pressure":1013,
                "humidity":82,
                "dew_point":20.05,
                "uvi":0.33,
                "clouds":100,
                "visibility":10000,
                "wind_speed":1.62,
                "wind_deg":38,
                "wind_gust":2.81,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1639011600,
                "temp":24.94,
                "feels_like":25.45,
                "pressure":1014,
                "humidity":75,
                "dew_point":20.1,
                "uvi":1.56,
                "clouds":100,
                "visibility":10000,
                "wind_speed":1.95,
                "wind_deg":33,
                "wind_gust":2.77,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1639015200,
                "temp":26.63,
                "feels_like":26.63,
                "pressure":1015,
                "humidity":68,
                "dew_point":20.25,
                "uvi":3.81,
                "clouds":100,
                "visibility":10000,
                "wind_speed":2.29,
                "wind_deg":31,
                "wind_gust":2.81,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1639018800,
                "temp":28.28,
                "feels_like":30.25,
                "pressure":1014,
                "humidity":63,
                "dew_point":20.5,
                "uvi":6.51,
                "clouds":100,
                "visibility":10000,
                "wind_speed":2.16,
                "wind_deg":32,
                "wind_gust":2.58,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1639022400,
                "temp":29.87,
                "feels_like":32.21,
                "pressure":1014,
                "humidity":58,
                "dew_point":20.76,
                "uvi":7.58,
                "clouds":91,
                "visibility":10000,
                "wind_speed":1.94,
                "wind_deg":40,
                "wind_gust":3.45,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1639026000,
                "temp":30.22,
                "feels_like":32.65,
                "pressure":1012,
                "humidity":57,
                "dew_point":20.79,
                "uvi":8.18,
                "clouds":92,
                "visibility":10000,
                "wind_speed":2.08,
                "wind_deg":36,
                "wind_gust":3.83,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0
            },
            {
                "dt":1639029600,
                "temp":29.84,
                "feels_like":32.34,
                "pressure":1011,
                "humidity":59,
                "dew_point":20.95,
                "uvi":7.29,
                "clouds":93,
                "visibility":10000,
                "wind_speed":1.93,
                "wind_deg":13,
                "wind_gust":2.66,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "pop":0.14
            }
        ],
        "daily":[
            {
                "dt":1638849600,
                "sunrise":1638831556,
                "sunset":1638873005,
                "moonrise":1638842220,
                "moonset":1638884640,
                "moon_phase":0.11,
                "temp":{
                    "day":29.13,
                    "min":21.69,
                    "max":30.03,
                    "night":22.94,
                    "eve":29.07,
                    "morn":21.85
                },
                "feels_like":{
                    "day":31.1,
                    "night":23.51,
                    "eve":30.85,
                    "morn":22.31
                },
                "pressure":1013,
                "humidity":59,
                "dew_point":20.3,
                "wind_speed":2.91,
                "wind_deg":322,
                "wind_gust":3.62,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04d"
                    }
                ],
                "clouds":73,
                "pop":0.08,
                "uvi":9.38
            },
            {
                "dt":1638936000,
                "sunrise":1638917987,
                "sunset":1638959425,
                "moonrise":1638932100,
                "moonset":1638974760,
                "moon_phase":0.15,
                "temp":{
                    "day":28.64,
                    "min":21.15,
                    "max":29.75,
                    "night":23.85,
                    "eve":27.85,
                    "morn":21.23
                },
                "feels_like":{
                    "day":31.01,
                    "night":24.46,
                    "eve":30.01,
                    "morn":21.78
                },
                "pressure":1013,
                "humidity":64,
                "dew_point":21.13,
                "wind_speed":2.08,
                "wind_deg":10,
                "wind_gust":2.86,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "clouds":100,
                "pop":0.03,
                "uvi":8.84
            },
            {
                "dt":1639022400,
                "sunrise":1639004418,
                "sunset":1639045846,
                "moonrise":1639021620,
                "moonset":1639064580,
                "moon_phase":0.19,
                "temp":{
                    "day":29.87,
                    "min":22.4,
                    "max":30.22,
                    "night":23.33,
                    "eve":27.3,
                    "morn":22.46
                },
                "feels_like":{
                    "day":32.21,
                    "night":23.68,
                    "eve":29.37,
                    "morn":23.01
                },
                "pressure":1014,
                "humidity":58,
                "dew_point":20.76,
                "wind_speed":2.76,
                "wind_deg":348,
                "wind_gust":5,
                "weather":[
                    {
                    "id":500,
                    "main":"Rain",
                    "description":"light rain",
                    "icon":"10d"
                    }
                ],
                "clouds":91,
                "pop":0.4,
                "rain":0.32,
                "uvi":8.18
            },
            {
                "dt":1639108800,
                "sunrise":1639090850,
                "sunset":1639132267,
                "moonrise":1639110780,
                "moonset":1639154160,
                "moon_phase":0.22,
                "temp":{
                    "day":27.47,
                    "min":21.28,
                    "max":30.54,
                    "night":23.82,
                    "eve":30.19,
                    "morn":21.49
                },
                "feels_like":{
                    "day":28.79,
                    "night":24.37,
                    "eve":32.4,
                    "morn":21.76
                },
                "pressure":1013,
                "humidity":61,
                "dew_point":19.42,
                "wind_speed":3.23,
                "wind_deg":159,
                "wind_gust":5.43,
                "weather":[
                    {
                    "id":802,
                    "main":"Clouds",
                    "description":"scattered clouds",
                    "icon":"03d"
                    }
                ],
                "clouds":25,
                "pop":0.06,
                "uvi":9.7
            },
            {
                "dt":1639195200,
                "sunrise":1639177281,
                "sunset":1639218689,
                "moonrise":1639199700,
                "moonset":0,
                "moon_phase":0.25,
                "temp":{
                    "day":27.1,
                    "min":22.71,
                    "max":30.65,
                    "night":24.82,
                    "eve":30.47,
                    "morn":22.71
                },
                "feels_like":{
                    "day":28.94,
                    "night":25.47,
                    "eve":32.5,
                    "morn":23.33
                },
                "pressure":1012,
                "humidity":69,
                "dew_point":20.91,
                "wind_speed":2.12,
                "wind_deg":307,
                "wind_gust":2.48,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "clouds":99,
                "pop":0,
                "uvi":9.13
            },
            {
                "dt":1639281600,
                "sunrise":1639263712,
                "sunset":1639305112,
                "moonrise":1639288440,
                "moonset":1639243500,
                "moon_phase":0.29,
                "temp":{
                    "day":25.19,
                    "min":24.18,
                    "max":27.18,
                    "night":24.34,
                    "eve":27.18,
                    "morn":24.27
                },
                "feels_like":{
                    "day":25.8,
                    "night":24.97,
                    "eve":29.07,
                    "morn":24.92
                },
                "pressure":1012,
                "humidity":78,
                "dew_point":21.03,
                "wind_speed":1.49,
                "wind_deg":6,
                "wind_gust":3.22,
                "weather":[
                    {
                    "id":804,
                    "main":"Clouds",
                    "description":"overcast clouds",
                    "icon":"04d"
                    }
                ],
                "clouds":98,
                "pop":0.22,
                "uvi":10
            },
            {
                "dt":1639368000,
                "sunrise":1639350143,
                "sunset":1639391536,
                "moonrise":1639377060,
                "moonset":1639332720,
                "moon_phase":0.32,
                "temp":{
                    "day":25.83,
                    "min":22.79,
                    "max":27.54,
                    "night":24.01,
                    "eve":27.54,
                    "morn":22.9
                },
                "feels_like":{
                    "day":26.37,
                    "night":24.5,
                    "eve":29.28,
                    "morn":23.54
                },
                "pressure":1011,
                "humidity":73,
                "dew_point":20.52,
                "wind_speed":3.97,
                "wind_deg":28,
                "wind_gust":7.12,
                "weather":[
                    {
                    "id":500,
                    "main":"Rain",
                    "description":"light rain",
                    "icon":"10d"
                    }
                ],
                "clouds":99,
                "pop":0.64,
                "rain":1.26,
                "uvi":10
            },
            {
                "dt":1639454400,
                "sunrise":1639436574,
                "sunset":1639477960,
                "moonrise":1639465680,
                "moonset":1639421880,
                "moon_phase":0.35,
                "temp":{
                    "day":27.45,
                    "min":23.28,
                    "max":27.66,
                    "night":24.45,
                    "eve":25.74,
                    "morn":23.28
                },
                "feels_like":{
                    "day":29.14,
                    "night":25.09,
                    "eve":26.35,
                    "morn":23.78
                },
                "pressure":1012,
                "humidity":65,
                "dew_point":20.35,
                "wind_speed":2.63,
                "wind_deg":167,
                "wind_gust":4.1,
                "weather":[
                    {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04d"
                    }
                ],
                "clouds":68,
                "pop":0.12,
                "uvi":10
            }
        ]
    },
    weatherDataLocationHis: {},
}

Object.assign(init.appData, storage.get());

const actions = {
    switchPage: (state, page) => {
        state.appData.screen = page;
        storage.set(state.appData);
    },
    reload: (state) => {
        state.appData.getDataAll(state);
    },
    showModal: (state, args) => {
        let modalName = args[0];
        let value = args[1];
            
        state.appData[modalName] = value || true;
    },
    hideModal: ({ appData, weatherData }) => {
        if (appData.changeUnitSet) {
            appData.changeUnitSet = false;
            if (appData.unitSetAPI != appData.selectedUnit && appData.selectedUnit != 'custom') {
                appData.unitSetAPI = appData.selectedUnit;
                const location = appData.location;
                const unit = appData.unitSetAPI;
                const apiKey = appData.apiKey;

                const apiURL = appData.getAPIURL(location.latitude, location.longitude, unit, apiKey);

                fetch(apiURL)
                    .then((response => {
                        return response.json();
                    }))
                    .then(data => {
                        Object.assign(weatherData, data);
                        dispatch();
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        }
        appData.changeLocation = '';
        appData.changeCustomUnit = '';
        storage.set(appData);
    },
    changeUnitSet: ({ appData }, unit) => {
        appData.selectedUnit = unit;
        storage.set(appData);
    },
    changeCustomUnit: ({appData}, args) => {
        const para = args[0];
        const unit = args[1];

        appData.unitDetail.custom[para] = unit;
        storage.set(appData);
    },
    changeLocationConfirm: (state, index) => {
        const { appData } = state;

        Object.assign(appData.location, appData.locationHistory[index]);
        appData.getDataMain(state);
        appData.changeLocation = '';
    }
}

export default function reducer(state = init, action, args) {
    if (actions?.[action]) {
        actions[action](state, ...args);
    }

    return state;
}