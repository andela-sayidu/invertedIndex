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
	  if(!this.indexMap[title]){
	      return "wrong";
	   }else{
		  return this.indexMap[title];
	   }
	}


	/*
	* Search for particular words 
	*/
	searchIndex(terms) {
		const searchResult = {};
		let a = terms.split(' ');
		var result = this.indexMap;
		let keys = Object.keys(result);

		for (let key in keys) {
			if (this.getIndex(keys[key])) {
				a.forEach((term) => {
					if (result[keys[key]][term]) {
						searchResult[term] = result[keys[key]][term];
					}
				});
			}
		}
	}

}

