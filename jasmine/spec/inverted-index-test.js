'use strict'

const books = require('./books.json');
const testIndex = new invertedIndex();

describe('Inverted Index TestSuite', () => {
    //Check that the Inverted index is a class 
    describe('Inverted Index Class', () => {
        it('should be a class', () => {
            expect(testIndex instanceof invertedIndex).toBe(true);
            expect(testIndex instanceof Object).toBe(true);
            expect(typeof (testIndex)).toBe('object');
        });

        it('checks for default indexMap', () => {
            expect(typeof (testIndex.indexMap)).toBe('object');
        });
    });

    describe('Sanitize', function () {
        it('return an array with sanitized tokens', () => {
            console.log(books[0].title);
            console.log(testIndex.sanitize(books[0].title));
            expect(testIndex.sanitize(books[0].title)).toEqual('alice in wonderland');
        });
        it('filters out symbols', function () {
            expect(testIndex.sanitize('a&lice in wonderl@.and')).toEqual('alice in wonderland');
        });
    });

    describe('Read Book Data', () => {
        it('ensures that JSON file is not empty', () => {
            expect(books.length > 0).toBe(true);
        });
    });

    describe('Populate Index', () => {
        it('verifies that the JSON has been read', () => {
                books.createIndex('books.json',books); 
                this.indexMap('');
        });
        it('verifies that the index maps strings to the correct Json objects in the array', () => {
           
        });
    });

    describe('Search Index', () => {
        it('', () => {
        });
    });

}); 