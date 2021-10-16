const  moment = require('moment');

function formatMessage(text, areas) {
    return {
        text,
        time:moment().format('h:mm a'),
        areas
    }
}

module.exports = formatMessage;