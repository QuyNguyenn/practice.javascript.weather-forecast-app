import html from "../redux/core.js";
import {connect} from "../redux/store.js";
import homepageHeader from "./homepage/header.js";
import homepageContent from "./homepage/content.js";
import locationPageHeader from "./location/header.js";
import locationPageContent from "./location/content.js";
import settingPageHeader from "./setting/header.js";
import settingPageContent from "./setting/content.js";

function App({ appData, weatherData }) {

    const htmls = {
        homepage: `
            ${homepageHeader()}
            ${homepageContent()}
        `,
        location: `
            ${locationPageHeader()}
            ${locationPageContent()}
        `,
        setting: `
            ${settingPageHeader()}
            ${settingPageContent()}
        `
    }

    const modal = (appData => {

        if (appData.changeUnitSet) {
            return html`
                <div class="modal modal-change-unit active">
                    <div class="modal-title">Select Unit Set</div>
                    <div class="modal-select-list">
                        ${appData.unitSets.map((crr) => {
                            const checked = crr == appData.selectedUnit ? 'checked' : '';
                            return `
                                <div class="modal-select-item-wrapper">
                                    <label for="unit-set-${crr}">${crr}</label>
                                    <input type="radio" ${checked} name="unit" id="unit-set-${crr}" onclick="dispatch('changeUnitSet','${crr}')">
                                </div>
                            `
                        })}
                    </div>
                </div>
            `
        }
        else if (appData.changeLocation) {

            const locationIndex = appData.changeLocation.replace('location-index-', '');
            const location = appData.locationHistory[locationIndex];

            return html`
                <div class="modal modal-change-location active">
                    <div class="modal-title">Set ${location.locationName} as your location ?</div>
                    <div class="modal-control">
                        <button class="modal-btn" onclick="dispatch('changeLocationConfirm', ${locationIndex})">Yes</button>
                        <button class="modal-btn" onclick="dispatch('hideModal')">Cancel</button>
                    </div>
                </div>
            `
        }
        if (appData.changeCustomUnit) {

            return html`
                <div class="modal modal-change-unit active">
                    <div class="modal-title">Change Unit</div>
                    <div class="modal-select-list">
                        ${appData.customUnitList[appData.changeCustomUnit].map((crr) => {
                            const checked = crr == appData.unitDetail.custom[appData.changeCustomUnit] ? 'checked' : '';
                            return `
                                <div class="modal-select-item-wrapper">
                                    <label for="unit-set-${crr}">${crr}</label>
                                    <input type="radio" ${checked} name="unit" id="unit-set-${crr}" onclick="dispatch('changeCustomUnit','${appData.changeCustomUnit}','${crr}')">
                                </div>
                            `
                        })}
                    </div>
                </
            `
        }
        else {
            return `
                <div class="modal">
                </div>
            `
        }
    })(appData);

    return html`
        <div class="app ${appData.screen}">
            ${htmls[appData.screen]}
            <div class="nav">
                <div class="nav--item home ${appData.screen == 'homepage' ? 'active' : ''}" onclick = dispatch('switchPage'\,'homepage')>
                    <i class="far fa-home-alt"></i>
                </div>
                <div class="nav--item location ${appData.screen == 'location' ? 'active' : ''}" onclick = dispatch('switchPage'\,'location')>
                    <i class="fal fa-globe-asia"></i>
                </div>
                <div class="nav--item setting ${appData.screen == 'setting' ? 'active' : ''}" onclick = dispatch('switchPage'\,'setting')>
                    <i class="fad fa-sliders-h"></i>
                </div>
            </div>
            <div class="overlay ${appData.changeUnitSet || appData.changeLocation || appData.changeCustomUnit ? 'active' : ''}" onclick="dispatch('hideModal')"></div>
            ${modal};
        </div>
    `
}

export default connect()(App);