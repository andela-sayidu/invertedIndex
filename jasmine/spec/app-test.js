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
       
        });
        it('verifies that the index maps strings to the correct Json objects in the array', () => {
           
        });
    });

    describe('Search Index', () => {
        it('', () => {
            expect(testIndex instanceof invertedIndex).toBe(true);
        });
    });

}); 
},{"./books.json":1}]},{},[2]);
