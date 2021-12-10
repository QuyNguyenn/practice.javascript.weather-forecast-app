import html from "../../redux/core.js";
import { connect } from "../../redux/store.js";

function header() {
    return html`
        <div class="header">
            <div class="search-bar">
                <i class="search-icon far fa-search"></i>
                <input type="text" placeholder="Search" name="" id="" class="search-input">
                <i class="far fa-pen"></i>
                <div class="suggest-result">
                    <span class="suggest-result-item">Hanoi</span>
                    <span class="suggest-result-item">Da Nang</span>
                    <span class="suggest-result-item">Ho Chi Minh</span>
                    <span class="suggest-result-item">Binh Duong</span>
                    <span class="suggest-result-item">Hanoi</span>
                    <span class="suggest-result-item">Da Nang</span>
                    <span class="suggest-result-item">Ho Chi Minh</span>
                    <span class="suggest-result-item">Binh Duong</span>
                    <span class="suggest-result-item">Hanoi</span>
                    <span class="suggest-result-item">Da Nang</span>
                </div>
            </div>
        </div>
    `
}

export default connect()(header);