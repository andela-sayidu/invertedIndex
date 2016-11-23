/**
 * InvertedIndex Class
 * @class
 */
class invertedIndex {
  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.indexMap = {};
  }

  /**
   * Sanitizes text by removing invalid symbols.
   * @function
   * @param {String} indexes - String to sanitize
   * @return {Array} array of words without special characters or symbols.
   */
  _sanitize(indexes) {
    return indexes.map(word => word.toLowerCase()
      .replace(/[!''@#$%^&*,'.]/g, ''));
  }

  /**
   * Create File Index
   * @function
   * @param {String} fileName-Uploaded file
   * @param {String} fileContent- Contents of the Json file.
   * @return {Array} filename,merged & sanitized contents of the Json file
   */
  createIndex(fileName, fileContent) {
    const completeIndex = [];
    for (let value of fileContent) {
      const title = value.title;
      const text = value.text;
      const mergeWords = title.concat(text);
      const wordsArray = mergeWords.split(' ')
      this._sanitize(wordsArray);
      completeIndex.push(wordsArray);
    }
    this._storeIndex(fileName, completeIndex);
    return [fileName, completeIndex];
  }


  /**
   * Stores the File Index
   * @function
   * @param {String} fileName
   * @param {String} fileContents
   * @return {Array} stores fileName and fileContent in the indexMap
   */
  _storeIndex(textTitle, completeIndex) {

    const wordIndex = {};
    for (let pos in completeIndex) {
      completeIndex[pos].forEach((word) => {
        if (wordIndex[word]) {
          if (wordIndex[word].indexOf(pos) === -1) {
            wordIndex[word].push(pos);
          }
        } else {
          wordIndex[word] = [pos];
        }
      });
    }
      console.log(textTitle,wordIndex);
    return this.indexMap[textTitle] = wordIndex;
  }

  /**
   * Get File Index
   * @function
   * @param {String} fileName
   * @return {Object} returns file contents
   */
  getIndex(fileName) {
    return this.indexMap[fileName];
  }


  /**
   * Search Index
   * @function
   * @param {String} fileName
   * @param {String} terms
   * @return {Object} returns search results
   */
  searchIndex(fileName, terms) {
    const searchResult = {};
    const query = terms.split(' ');
    const sanitizeQuery = this._sanitize(query);
    const result = this.indexMap;

    sanitizeQuery.forEach((term) => {
      if (result[fileName][term]) {
        searchResult[term] = result[fileName][term];
      }
    });
    return searchResult;
  }
}