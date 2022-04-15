import {
    app
} from "firabe_config";
import {
    getAnalytics,
    logEvent
} from "firebase/analytics";

const analytics = getAnalytics(app);
var path = window.location.pathname;
var eventName = 'view' + path.replace(/\//g, '_');

logEvent(analytics, eventName)