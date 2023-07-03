const journal = require('./utils/filelogger');

// Usage example
const outputMessage = 'This is the message to log.';
const source = __dirname;

journal(outputMessage, source);
