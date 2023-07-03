const fs = require('fs');

function getCurrentDateTime() {
    const currentDateTime = new Date().toLocaleDateString();
    return currentDateTime;
}

function getCurrentTime() {
    const currentTime = new Date().toLocaleTimeString();
    return currentTime;
}

function journal(message, source) {
    const currentDateTime = getCurrentDateTime();
    const currentTime = getCurrentTime();
    const logEntry = `${currentDateTime} ${currentTime} (${source}): ${message}`;

    fs.appendFile('porfolio_log.log', logEntry + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        }
    });
}

module.exports = journal;