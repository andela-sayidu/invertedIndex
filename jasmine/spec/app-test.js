(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],2:[function(require,module,exports){
'use strict'

const books = require('./books.json');
let invertIndex, index;

describe('Inverted Index TestSuite', () => {

    beforeEach(() => {
        invertIndex = new invertedIndex();
        index = invertIndex.createIndex('books', books);
    });

    describe('Inverted Index Class', () => {
        it('should be a class', () => {
            expect(invertIndex instanceof invertedIndex).toBe(true);
            expect(invertIndex instanceof Object).toBe(true);
            expect(typeof (invertIndex)).toBe('object');
        });

        it('checks for default indexMap', () => {
            expect(typeof (invertIndex.indexMap)).toBe('object');
        });
    });


    describe('Sanitize', function () {
        it('return an array with sanitized tokens', () => {
            expect(invertIndex._sanitize(books[0].title.split(' '))).toEqual(['alice', 'in', 'wonderland']);
        });
        it('filters out symbols', function () {
            expect(invertIndex._sanitize(['a&lice', 'i*n', 'wonderl@.and'])).toEqual(['alice', 'in', 'wonderland']);
        });
    });

    describe('Read Book Data', () => {
        it('ensures that JSON file is not empty', () => {
            expect(index.length > 0).toBe(true);
        });
    });

    describe('Create and Populate Index', () => {
        let minibooks = [{
            "title": "A",
            "text": "Alice."
        }];
        it('verifies that the JSON has been read', () => {
            expect(invertIndex.createIndex('books', minibooks)).toEqual(['books', [
                ['alice', 'a']
            ]]);
        });
        it('verifies that the index maps strings to the correct Json objects in the array', () => {
            expect(invertIndex._storeIndex('books', [
                ['alice', 'a']
            ])).toEqual({
                alice: ['0'],
                a: ['0']
            });
        });
    });

    describe('Get Index', () => {
        it('gets a particular index', () => {
            expect(invertIndex.getIndex('books').a).toEqual(['0','1']);
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
},{"./books.json":1}]},{},[2]);
