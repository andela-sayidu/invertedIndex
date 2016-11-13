/*
* InvertedIndex Class
*/
class invertedIndex {

	constructor() {
		this.indexMap = {};
	}

	/*
	* 
	*/
	createIndex(filepath) {
		let title;
		let completeIndex = [];
		for (let [key, value] of filepath.entries()) {
			title = value.title;
			let splitTitle = title.split(' ');
			textTitle = this.tokenize(splitTitle);

			let text = value.text;
			let splitText = text.split(' ');
			content = this.tokenize(splitText);
			completeIndex.push(content.concat(textTitle));
		}
		this.storeIndex(title, completeIndex);
	}


	getIndex(title) {
		return this.indexMap[title];
	}
}
