import { readFileSync, writeFileSync } from 'fs';

class dbclient {
    constructor(databaseName) {
        this.databaseName = databaseName;
        this.data = {};
    }

    async load() {
        try {
            const data = readFileSync(`${this.databaseName}.json`, 'utf8');
            this.data = JSON.parse(data);
        } catch (error) {
            // If the file doesn't exist or there's an error reading it, assume an empty database
            this.data = {};
        }
    }

    async save() {
        const data = JSON.stringify(this.data, null, 2);
        writeFileSync(`${this.databaseName}.json`, data);
    }

    async update() {
        
    }

    async get(collectionName, documentId) {
        const collection = this.data[collectionName];
        if (!collection) {
            return null;
        }
        return collection[documentId] || null;
    }

    async set(collectionName, documentId, document) {
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

export default dbclient;
