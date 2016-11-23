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
  sanitize(indexes) {
    return indexes.map(word => word.toLowerCase().replace(/[!''@#$%^&*,'.]/g, ""));
  }

  /**
   * Create File Index
   * @function
   * @param {String} fileName-Uploaded file;fileContent- Contents of the Json file.
   * @return {Array} returns filename, merged and sanitized contents of the json file
   */
  createIndex(fileName, fileContent) {
    const completeIndex = [];
    for (let value of fileContent) {
      const title = value.title;
      const splitTitle = title.split(' ');
      const textTitle = this.sanitize(splitTitle);

      const text = value.text;
      const splitText = text.split(' ');
      const content = this.sanitize(splitText);

      const mergeWords = content.concat(textTitle);
      completeIndex.push(mergeWords);
    }
    this.storeIndex(fileName, completeIndex);
    return [fileName, completeIndex];
  }


  /**
   * Stores the File Index
   * @function
   * @param {String,String} fileName, fileContents
   * @return {Array} stores fileName and fileContent in the indexMap
   */
  storeIndex(textTitle, completeIndex) {
    const words = {}

    for (let pos in completeIndex) {
      completeIndex[pos].forEach((word) => {
        if (words[word]) {
          if (words[word].indexOf(pos) === -1) {
            words[word].push(pos);
          }
        } else {
          words[word] = [pos];
        }
      });
    }
    return this.indexMap[textTitle] = words;
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
   * @param {String,String} fileName/title to searched
   * @return {Object} returns search results
   */
  searchIndex(fileName, terms) {
    const searchResult = {};
    let query = terms.split(' ');
    let sanitizeQuery = this.sanitize(query);
    var result = this.indexMap;

    sanitizeQuery.forEach((term) => {
      if (result[fileName][term]) {
        searchResult[term] = result[fileName][term];
      }
    });
    return searchResult;
  }
}