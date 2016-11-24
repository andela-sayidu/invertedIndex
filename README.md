https://travis-ci.org/andela-sayidu/invertedIndex.svg?branch=feature%2FSearchallfiles
[![Coverage Status](https://coveralls.io/repos/github/andela-sayidu/invertedIndex/badge.svg)](https://coveralls.io/github/andela-sayidu/invertedIndex)

# Inverted Index
## Introduction

Elasticsearch uses a structure called an inverted index, which is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

## Key Features of this Application

* Supports Upload of JSON file created following the format displayed below:

```
[
    {"title": "Required",
    "text":"Do include some content on the subject matter."
    },
    {"title": "eg. Checkpoint 1",
    "text": "This Checkpoint is called inverted Index."
    }
]
```

* Creates an Index for any selected JSON file.

* Searching of a specific JSON file or all indexed JSON files.

## Usage

You may clone the repository and run the app locally to use.



## Technologies

* EchmaScript 6 (JavaScript 2015)
* Node.js
* Angular.js