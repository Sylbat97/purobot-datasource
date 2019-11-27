const csv = require('csv-parser');
const fs = require('fs');
var path = require('path');

let matches = [];
let wrestlersDictionnary = [];

//Loading matches
var jsonPath = path.join(__dirname, 'resources', 'njpw.csv');
fs.createReadStream(jsonPath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
        matches.push(row);
    })
    .on('end', () => {
        console.log('Matches CSV file successfully processed');
    });

//Loading wrestlers index
var jsonPath = path.join(__dirname, 'resources', 'njpw_index.csv');
fs.createReadStream(jsonPath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
        wrestlersDictionnary.push(row);
    })
    .on('end', () => {
        console.log('Wrestlers CSV file successfully processed');
    });

exports.getRandomMatch = function () {
    let index = randomIntFromInterval(0, matches.length);
    return matches[index];
}

exports.getMatchByWrestler = function (wrestler) {
    let matchesIDs = [];
    for (let i = 0; i < wrestlersDictionnary.length; i++) {
        if(wrestler == wrestlersDictionnary[i].wrestler){
            matchesIDs = matchesIDs.concat(wrestlersDictionnary[i].matches.split(' '));
        }
    }
    let index = matchesIDs[randomIntFromInterval(0, matchesIDs.length)];
    return matches[index];
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
