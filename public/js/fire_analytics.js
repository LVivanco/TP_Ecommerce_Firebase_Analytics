import {
    app
} from './firebase_config.js';
import {
    getAnalytics,
    logEvent
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js';

const title = document.title;
const analytics = getAnalytics(app);
var eventName = 'visit' + title;

logEvent(analytics, eventName)

logEvent(analytics, 'select_content', {
    content_type: 'link',
    item_id: window.location.href
});