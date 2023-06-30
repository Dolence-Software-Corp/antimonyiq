const db = require('./db');

// Example usage:
const dbClient = new db('myDatabase');
dbClient.load();

// Set a document in a collection
dbClient.set('users', 'user1', { name: 'John', age: 25 });

// Get a document from a collection
const user = dbClient.get('users', 'user1');
console.log(user); // { name: 'John', age: 25 }

// Remove a document from a collection
const removed = dbClient.remove('users', 'user1');
console.log(removed); // true

// Save the changes to the JSON file
dbClient.save();
