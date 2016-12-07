'use strict'

const books = require('./books.json');
const music = require('./music.json');
const wrong = require('./wrong.json');
const empty = require('./empty.json');

let invertIndex, index;


describe('Inverted Index TestSuite', () => {
    beforeEach(() => {
        invertIndex = new InvertedIndex();
        invertIndex.createIndex('books', books);
        invertIndex.createIndex('music', music);
        invertIndex.createIndex('wrong', wrong);
        invertIndex.createIndex('empty', wrong);
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
            expect(invertIndex.indexMap.hasOwnProperty('books')).toBe(true);
        });
        it('verifies that the file content is a JSON array', function () {
            expect(Array.isArray(books)).toBeTruthy();
        });
        it('verifies that the JSON file is valid', () => {
            expect(invertIndex.verifyFile(books).length).toEqual(2);
            expect(invertIndex.verifyFile(wrong)).toBe(false);
            expect(invertIndex.verifyFile(empty)).toBe(false);
        });
    });

    describe('Create and Populate Index', () => {
        it('verifies that the JSON has been read', () => {
            expect(invertIndex.getIndex('books').hasOwnProperty('alice')).toBeTruthy();
        });
        it('verifies that index maps strings to the correct Json objects', () => {
            expect(invertIndex.getIndex('books')['alice']).toEqual([0]);;
            expect(invertIndex.getIndex('music')['a']).toEqual([1]);
        });
        it('ensures existing files are not overridden during upload', () => {
            expect(invertIndex.getIndex('books')).toBeTruthy();
            expect(invertIndex.getIndex('music')).toBeTruthy();
        });
    });

    describe('Get Index', () => {
        it('gets a particular index', () => {
            expect(invertIndex.getIndex('books').a).toEqual([0, 1]);
            expect(invertIndex.getIndex('books').alice).toEqual([0]);
        });
    });


    describe('Search Index', () => {
        it('For non-valid terms returns no index', () => {
            expect(invertIndex.searchIndex('books', '')).toEqual([{
                books: {
                    '': []
                }
            }]);
        });
        it('finds the correct index for a word', () => {
            expect(invertIndex.searchIndex('books', 'alice')).toEqual([{
                books: {
                    alice: [0]
                }
            }]);
        });
        it('find terms in all files  when required', () => {
            expect(invertIndex.searchIndex('all', 'the','wonderland')).toEqual([{
                books: {
                    'wonderland': [0],
                    'the': [1]
                }
            }, {
                music: {
                    'wonderland': [],
                    'the': [0, 1]
                }
            }]);
        });
        it('ensure searchIndex can handle complex data types', () => {
            expect(invertIndex.searchIndex('music', 'a', ['a', 'full', 'like', 'none'],
                ['b']
            )).toEqual([{
                music: {
                    a: [1],
                    full: [],
                    like: [1],
                    none: [],
                    b: []
                }
            }]);
        });
    });
});