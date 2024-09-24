
// const string = " this is a string without div"

// const closeDivTag = (str) => { 
//     const div = '<div>'
//     const tempDivModifier = '<<d>>'
//     let DivIndicator = false;
//     let closedDivTagString = str
//     let findDiv = closedDivTagString.indexOf(div)

//     while(findDiv >= 0){
//         if (!DivIndicator){
//             closedDivTagString = closedDivTagString.replace(div, tempDivModifier);
//             DivIndicator = true;
//         }else{
//             closedDivTagString = closedDivTagString.replace(div, '</div>');
//             DivIndicator = false;
//         }
//         findDiv = closedDivTagString.indexOf(div)
//     }
//     while(closedDivTagString.indexOf(tempDivModifier) >= 0){
//         closedDivTagString = closedDivTagString.replace(tempDivModifier, '<div>');
//     }
//     console.log(closedDivTagString)
//  }
// closeDivTag(string)


// String.prototype.isPalindrome = function () {
//     let palindrome = true;
//     for (let i = 0; i < this.length; i++) {
//         if (palindrome) {
//             palindrome = this[i] === this[(this.length - 1) - i]
//         }
//     }
//     return palindrome
// }
// console.log('aasllaa'.isPalindrome())


// String.prototype.stringMap = function (callback){
//     for (let i = 0; i < this.length; i++) {
//         callback(this[i], i);
//     }
// };

// "hello".stringMap((item , index) => { 
//     console.log(index)
//  })


// Array.prototype.flatArray = function () { 
//     const flattenArray = [];
//     const flatteningFunction = (array) => { 
//         for(let i = 0 ; i < array.length ; i++){
//             flattenArray.push(array[i])
//         }
//      }
//     for(let i = 0 ; i < this.length ; i++){
//         if(this[i] instanceof Array){
//             flatteningFunction(this[i])
//         }
//         else{
//             flattenArray.push(this[i])
//         }
//     }
//     return flattenArray;
//  }

// console.log(["a","b" , 1 ,3, [ 11, 22, 33 , 55] , 234 , 523].flatArray() )


console.log(dir(document.children[0].children[1]))

Document.prototype.getMyElementById = function (id) {
    for( const element of Document ){
        if ( element.id === id ) return element

        const foundElement = Document.prototype.getMyElementById.call(element, id)
        return foundElement
    }
    return null
}

Document.getMyElementById("root")