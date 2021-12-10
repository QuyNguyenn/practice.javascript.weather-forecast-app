import { createStore } from "./core.js";
import reducer from "./reducer.js";

const {attach, connect, dispatch} = createStore(reducer);

const drawDayNightCurve = (selector) => {

    const dayNightCurve = document.querySelector(selector);
    
    if (dayNightCurve) {
        
        const dayNightCurveWidth = dayNightCurve.clientWidth;
        const dayNightCurveHeight = dayNightCurve.clientHeight;
    
        dayNightCurve.width = dayNightCurveWidth;
        dayNightCurve.height = dayNightCurveHeight;
    
        const ctx = dayNightCurve.getContext('2d');
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#333";
        ctx.beginPath();
        ctx.moveTo(0, 2);
        ctx.quadraticCurveTo(dayNightCurveWidth / 5, 0, dayNightCurveWidth / 2, dayNightCurveHeight / 2);
        ctx.quadraticCurveTo(4 * dayNightCurveWidth / 5, dayNightCurveHeight, dayNightCurveWidth, dayNightCurveHeight - 2);
        const linearGrad = ctx.createLinearGradient(0, 2, dayNightCurveWidth, dayNightCurveHeight - 2);
        linearGrad.addColorStop(0, '#706676');
        linearGrad.addColorStop(1, '#173545');
    
        ctx.strokeStyle = linearGrad;
        ctx.stroke();
    }
}

window.dispatch = (action, ...args) => {
    dispatch(action, args);
    drawDayNightCurve("#day-night-curve");
};

export {
    attach,
    connect
}