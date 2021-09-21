/* eslint-disable */
// Simple usage of callback 
function greeting(name) {
    console.log('Hello ' + name);
}
  
function processUserInput(callback) {
    var name = prompt('Please enter your name.');
    callback(name);
}
  
processUserInput(greeting);
  
/* 
    Rewrite using async/await
*/
const processUserInput = () => {
    return new Promise( resolve => {
        resolve(prompt('Please enter your name.'))
    });
}

const simpleAsyncAwait = async () => {
    const name = await processUserInput();
    greeting(name);
}
/* eslint-enable */