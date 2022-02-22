let arr=[];
let lastItem='';

for(let i = 0; i < 100; i++) {
    arr.push({title: i,
    category:'cat',
    thumb:'https://www.sierraclub.org/sites/www.sierraclub.org/files/styles/flexslider_full/public/sierra/articles/big/SIERRA%20Night%20Sky%20WB.jpeg?itok=jxh1nTJA%27',
    timestamp:'1643256662'})
}

export default fakeServer = (quantity, delayTime) => new Promise((resolve, reject) => {
    let resultArr;
    const indexOflastItem = arr.indexOf(lastItem);
    if(indexOflastItem === arr.length - 1) return resolve('Complete!');

    if(!lastItem) {
        resultArr = [...arr].slice(0, quantity);
        lastItem = [...resultArr].pop();
    }
    else {
        const newIndexOfItem = arr.indexOf(lastItem) + 1;
        resultArr = [...arr].slice(newIndexOfItem, newIndexOfItem + quantity);
        lastItem = [...resultArr].pop();
    }

    setTimeout(() => {
        resolve(resultArr);
    }, delayTime);
});
