# Inverted Index

## Introduction

Elasticsearch uses a structure called an inverted index, which is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

## Key Features of this Application

* Supports Upload of JSON file created following the format displayed below:

```
[
    {"title": "Rea",
    "text":"You will be asked to enter your Heroku credentials the first time you run a command; after the first time, your email address and an API token will be saved"
    },
    {"title": "Coveralls",
    "text": "See the latest code-coverage statistics on all of your repositories including the total percentages covered and the lines covered."
    }
]
```

* Creates an Index for any selected JSON file.

* Searching of a specific JSON file or all indexed JSON files.

## Usage

You may clone the repository and run the app locally to use.

Alternatively???


## Technologies

* EchmaScript 6 (JavaScript 2015)
* Node.js
* Angular.js