import { attach } from "./redux/store.js";
import App from "./component/app.js";

const body = document.querySelector('body');
attach(App, body);

dispatch('reload');


