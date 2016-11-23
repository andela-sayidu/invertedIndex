/*
* InvertedIndex Class
*/
class invertedIndex {

  constructor() {
    this.indexMap = {};
  }

  sanitize(indexes) {
    let lowerindex = [];
    indexes.map((word) => {
      lowerindex.push(word.toLowerCase().replace(/[!''@#$%^&*,'.]/g, ""));
    });
    return lowerindex;
  }

	/*
	* Create File Index
	*/
  createIndex(fileName, fileContent) {
    let completeIndex = [];
    for (let value of fileContent) {
      let title = value.title;
      let splitTitle = title.split(' ');
      let textTitle = this.sanitize(splitTitle);

      let text = value.text;
      let splitText = text.split(' ');
      let content = this.sanitize(splitText);

      let mergeWords = content.concat(textTitle);
      completeIndex.push(mergeWords);
    }
    this.storeIndex(fileName, completeIndex);
    return [fileName, completeIndex];
  }


	/*
	* Stores the File Index
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

	/*
	* Get File Index
	*/
  getIndex(title) {
    return this.indexMap[title];
  }


	/**
	 * Search for Terms
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

