const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//find the mean by getting information from query string, parsint to int, and dividiing by length
app.get('/mean', function(req, res) {
    if (!req.query.nums) {
        return res
            .status(400)
            .json('You must enter numbers.');
    }
    let nums = req.query.nums;
    let numsArr = nums.split(',');
    let total = 0
    numsArr.forEach(num => {
        parsedNum = parseInt(num)
        if (!parsedNum){
            return res
                .status(400)
                .json(`${num} is not a number.`);
        }
        total += parsedNum;
    });
    return res.json({operation:"mean", value: total/numsArr.length});
});

app.get('/median', function(req, res) {
    if (!req.query.nums) {
        return res
            .status(400)
            .json('You must enter numbers.');
    }
    let nums = req.query.nums;
    let numsArr = nums.split(',');
    let numsIntArr = [];
    numsArr.forEach(num => {
        parsedNum = parseInt(num)
        if (!parsedNum){
            return res
                .status(400)
                .json(`${num} is not a number.`);
        }
        numsIntArr.push(parsedNum);
    });
    let middle = Math.floor(numsIntArr.length / 2);
    const arr = numsIntArr.sort((a, b) => a - b);
    const median = arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
    return res.json({operation:"median", value: median});
});
  
app.get('/mode', function(req, res) {
    if (!req.query.nums) {
        return res
            .status(400)
            .json('You must enter numbers.');
    }
    let nums = req.query.nums;
    let numsArr = nums.split(',');
    let numsIntArr = [];
    numsArr.forEach(num => {
        parsedNum = parseInt(num)
        if (!parsedNum){
            return res
                .status(400)
                .json(`${num} is not a number.`);
        }
        numsIntArr.push(parsedNum);
    });
    
    let mode = [], count = [], i, number, maxIndex = 0;
 
    for (i = 0; i < numsIntArr.length; i += 1) {
        number = numsIntArr[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
 
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                mode.push(Number(i));
            }
        }

     return res.json({operation:"mode", value: mode});
});

app.listen(3000, function(){
console.log('App on port 3000');
}) 