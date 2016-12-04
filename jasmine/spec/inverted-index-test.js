'use strict'

const books = require('./books.json');
let invertIndex, index;

describe('Inverted Index TestSuite', () => {
    beforeEach(() => {
        invertIndex = new InvertedIndex();
        index = invertIndex.createIndex('books', books);
    });

    describe('Sanitize', () => {
        it('return an array with sanitized tokens', () => {
            expect(invertIndex.sanitize(books[0].title.split(' '))).toEqual(['alice', 'in', 'wonderland']);
        });
        it('filters out symbols', function () {
            expect(invertIndex.sanitize(['a&lice', 'i*n', 'wonderl@.and'])).toEqual(['alice', 'in', 'wonderland']);
        });
    });

    describe('Read Book Data', () => {
        it('ensures that JSON file is not empty', () => {
            expect(index.length > 0).toBe(true);
        });
    });

    describe('Create and Populate Index', () => {
        it('verifies that the JSON has been read', () => {
            expect(invertIndex.createIndex('books', minibooks)).toEqual(['books', [
                ['alice', 'a']
            ]]);
        });
        it('verifies that the index maps strings to the correct Json objects in the array', () => {
            expect(invertIndex.storeIndex('books', [
                ['alice', 'a']
            ])).toEqual({
                alice: ['0'],
                a: ['0']
            });
        });
    });

    describe('Get Index', () => {
        it('gets a particular index', () => {
            expect(invertIndex.getIndex('books').a).toEqual(['0', '1']);
            expect(invertIndex.getIndex('books').alice).toEqual(['0']);
        });
    });


    describe('Search Index', () => {
        it('searches for only valid titles', () => {
            expect(invertIndex.searchIndex('books', '')).toEqual({});
        });
        it('finds the correct index for a word', () => {
            expect(invertIndex.searchIndex('books', 'alice')).toEqual({
                alice: ['0']
            });
        });
    });

});