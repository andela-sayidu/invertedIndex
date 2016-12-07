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
module.exports={}
},{}],3:[function(require,module,exports){
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
},{"./books.json":1,"./empty.json":2,"./music.json":4,"./wrong.json":5}],4:[function(require,module,exports){
module.exports=[
  {
    "title": "All my friends are heathens, take it slow Wait for them to ask you who you know Please don't make any sudden moves You don't know the half of the abuse",
    "text": "Welcome to the room of people Who have rooms of people that they loved one day Docked away Just because we check the guns at the door Doesn't mean our brains will change from hand grenades You'll never know the psychopath sitting next to you You'll never know the murderer sitting next to you You'll think: How'd I get here, sitting next to you? But after all I've said, please don't forget"
  },
  {
    "title": "When I'm sitting in traffic some afternoon Or bored to death in some waiting room Well I'm gonna close my eyes and picture you Today",
    "text": "You keep brushing that hair back outta your eyes And it just keeps falling and so do I Well I'm feeling like the luckiest man alive Today I don't know about tomorrow But right now the whole world feels right And the memory of a day like today Can get you through the rest of your life"
  }
]
},{}],5:[function(require,module,exports){
module.exports=[{
  "a": "hjhjghhj",
  "b": "fgfgdfgf"
}, {
  "c": "hjhjghhj",
  "d": "fgfgdfgf"
}]
},{}]},{},[3]);
