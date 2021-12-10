const WEATHER_FORECAST_KEY = 'WEATHER_FORECAST';

export default {
    get() {
        const defaultData = {
            
        }

        return JSON.parse(localStorage.getItem(WEATHER_FORECAST_KEY)) || {};
    },
    set(appData) {
        const data = {};

        data.screen = appData.screen;
        data.location = appData.location;
        data.unitDetail = appData.unitDetail;
        data.selectedUnit = appData.selectedUnit;
        data.unitSetAPI = appData.unitSetAPI;

        localStorage.setItem(WEATHER_FORECAST_KEY, JSON.stringify(data));
    }
}