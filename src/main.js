let testData = ['one', 'two', 'three'];

let repeater = document.querySelector('gz-for');
let testButton = document.getElementById('test-btn');
let logButton = document.getElementById('log-btn');
repeater.dataSet = testData;
console.log('testData', testData, repeater.dataSet);
testData = ['four', 'five', 'six'];
console.log('testData', testData, repeater.dataSet);
testButton.addEventListener('click',(event)=>{
    //testData = ['four', 'five', 'six'];
    repeater.dataTest();
    console.log('testData', testData, repeater.dataSet);
    repeater.render();
});

logButton.addEventListener('click',(event)=>{
    console.log('testData', testData, repeater.dataSet);
});
