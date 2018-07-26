var os = require('os');
var async = require("async");
var http = require('http');
var request = require('request');
var path = require('path');
var fs = require('fs');
//load json
var dir = "evr";
var parentDir = path.dirname(dir);
var obj = "";
fs.readFile(__dirname + "/" + dir + '/evr_balance.json', 'utf8', function (err, data) {
    obj = JSON.parse(data);
  //  console.log(obj);
});
var counter = 1;
var intervals =
    setInterval(function () {
        createAccount(counter++, obj);
    },1000);

function StopInterval() {
    clearInterval(intervals);
}
var data = [];
var sum = 0;
function createAccount(cnt, info) {
         console.log(info[cnt]);
         sum += (parseFloat(info[cnt].info)/100000000) ;
        console.log(sum);
        var item = {};
        item["address"] = info[cnt].address;
        item["balance"] = (parseFloat(info[cnt].info)/100000000);
        // item["address"] = JSON.stringify(body);
        data.push(item);
        var json = JSON.stringify(data, null, 2);
        fs.writeFile(dir + '/evr_final_balance.json', json, 'utf8');
}

