/**
 * InvertedIndex Class
 * @class
 */
class InvertedIndex {

  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.indexMap = {};
  }

  /**
   * Sanitizes text by removing invalid symbols.
   *
   * @param {Array} indexes - String to sanitize
   * @return {Array} array of words without special characters or symbols.
   */
  sanitize(indexes) {
    return indexes.map(word => word.toLowerCase()
      .replace(/[^A-Za-z0-9]/g, ''));
  }

  /**
   * Create File Index
   *
   * @param {String} fileName - Uploaded file
   * @param {String} fileContent - Contents of the Json file.
   */
  createIndex(fileName, fileContent) {
    const completeIndex = [];
    for (let value of fileContent) {
      const title = value.title;
      const text = value.text;
      const mergeWords = title + ' ' + text;
      completeIndex.push(this.sanitize(mergeWords.split(' ')));
    }
    this.storeIndex(fileName, completeIndex);
  }


  /**
   * Stores the File Index
   *
   * @param {String} fileName
   * @param {String} fileContents
   */
  storeIndex(fileName, completeIndex) {
    const wordIndex = {};
    for (let pos in completeIndex) {
      let posToInt = parseInt(pos);
      completeIndex[pos].forEach((word) => {
        if (wordIndex[word]) {
          if (wordIndex[word].indexOf(posToInt) === -1) {
            wordIndex[word].push(posToInt);
          }
        } else {
          wordIndex[word] = [posToInt];
        }
      });
    }
    this.indexMap[fileName] = wordIndex;
  }

  /**
   * Get File Index
   *
   * @param {String} fileName
   * @return {Object} returns file contents
   */
  getIndex(fileName) {
    return this.indexMap[fileName];
  }

  /**
   * Search a File
   *
   * @param {String} fileName
   * @param {String} terms
   * @return {Object} returns search results
   */
  searchaFile(fileName, terms) {
    const searchResult = {};
    const query = terms.split(' ');
    const sanitizeQuery = this.sanitize(query);
    const allFiles = this.indexMap;

    searchResult[fileName] = {};
    sanitizeQuery.forEach((term) => {
      if (allFiles[fileName][term]) {
        searchResult[fileName][term] = allFiles[fileName][term];
      } else {
        searchResult[fileName][term] = [];
      }
    });
    return searchResult;
  }

  /**
   * Search Index for 1 or multiple files
   *
   * @param {String} fileName
   * @param {String} terms
   * @return {Array} returns search results
   */
  searchIndex(fileName, terms) {
    const searchResult = [];
    const allFiles = this.indexMap;

    if (fileName == 'all') {
      for (let file in allFiles) {
        let search = this.searchaFile(file, terms);
        searchResult.push(search);
      }
    } else {
      let search = this.searchaFile(fileName, terms);
      searchResult.push(search);
    }
    return searchResult;
  }

}