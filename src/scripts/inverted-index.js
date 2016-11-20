/*
* InvertedIndex Class
*/
class invertedIndex {

	constructor() {
		this.indexMap = {};
	}


	sanitize(indexes) {
		return indexes.toLowerCase().replace(/[!''@#$%^&*,'.]/g, "");
	}

	/*
	* Create File Index
	*/
	createIndex(fileName,fileContent) {
		let completeIndex = [];
		for (let [key, value] of filepath.entries()) {
			let title = value.title;
			let splitTitle = title.split(' ');
			textTitle = this.sanitize(splitTitle);

			let text = value.text;
			let splitText = text.split(' ');
			content = this.sanitize(splitText);
			completeIndex.push(content.concat(textTitle));
		}
		this.storeIndex(fileName, completeIndex);
	}


storeIndex(textTitle, completeIndex) {
const words = {};
//hasOwnProperty
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


//if only one file is uploaded, using only one file path. 
//if only one more than is uploaded, then accept all *.
//searchIndex(filepath,terms)
searchIndex(terms) {
const searchResult = {};
let a = terms.split(' ');
var result = this.indexMap;
let keys = Object.keys(result);

for (let key in keys) {
a.forEach((term) => {
if (result[keys[key]][term]) {
searchResult[term] = result[keys[key]][term];
}
});
}
console.log(searchResult);
}

}

