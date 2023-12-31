const fs = require('fs');

class db {
    constructor(databaseName) {
        this.databaseName = databaseName;
        this.data = {};
    }

    load() {
        try {
            const data = fs.readFileSync(`${this.databaseName}.json`, 'utf8');
            this.data = JSON.parse(data);
        } catch (error) {
            // If the file doesn't exist or there's an error reading it, assume an empty database
            this.data = {};
        }
    }

    save() {
        const data = JSON.stringify(this.data, null, 2);
        fs.writeFileSync(`${this.databaseName}.json`, data);
    }

    get(collectionName, documentId) {
        const collection = this.data[collectionName];
        if (!collection) {
            return null;
        }
        return collection[documentId] || null;
    }

    set(collectionName, documentId, document) {
        if (!this.data[collectionName]) {
            this.data[collectionName] = {};
        }
        this.data[collectionName][documentId] = document;
        this.save();
    }

    remove(collectionName, documentId) {
        const collection = this.data[collectionName];
        if (collection && collection[documentId]) {
            delete collection[documentId];
            this.save();
            return true;
        }
        return false;
    }
}

module.exports = db;
