var os = require('os');
var async = require("async");
var http = require('http');
var request = require('request');
var path = require('path');
var fs = require('fs');
//load json
var dir = "btc";
var parentDir = path.dirname(dir);
var obj = "";
fs.readFile(__dirname + "/" + dir + '/btc_balance.json', 'utf8', function (err, data) {
    obj = JSON.parse(data);
  //  console.log(obj);
});
var counter = 1;
var intervals =
    setInterval(function () {
        createAccount(counter++, obj);
    }, 300);

function StopInterval() {
    clearInterval(intervals);
}
var data = [];
var sum = 0;
function createAccount(cnt, info) {
     console.log(info[cnt]);
      sum += parseFloat(info[cnt].balance) ;
     console.log(sum);
}

