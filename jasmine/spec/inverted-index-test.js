import books from './books.json'; 
import invertedIndex from './src/inverted-index.js';


//describe: Test Suite 
describe("Read Book Data", function(){
    //it : Unit test 
    it("checks json is not empty",function(books){
        expect(this.indexMap).to.be.an('object');
        expect(this.indexMap).to.be.instanceof(InvertedIndex);
    }); 
}); 