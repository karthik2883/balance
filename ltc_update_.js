var os = require('os');
var async = require("async");
var http = require('http');
var request = require('request');
var path = require('path');
var fs = require('fs');
//load json
var dir = "ltc";
var parentDir = path.dirname(dir);
var obj = "";
fs.readFile(__dirname + "/" + dir + '/ltc.json', 'utf8', function (err, data) {
    obj = JSON.parse(data);
    console.log(obj);
});
var counter = 1;
var intervals =
    setInterval(function () {
        createAccount(counter++, obj.usersinfo);
    }, 4000);

function StopInterval() {
    clearInterval(intervals);
}
var data = [];

function createAccount(cnt, info) {
    var chainInfo = "https://chain.so/api/v2/address/LTC/"+info[cnt].wallet_address;
    // var chainInfo = "https://chain.api.btc.com/v3/address/3QvEYd8PJgtZaYWBaWmaqzS4H6B3Fww7rP";
    //  var requestLoop = setInterval(function(){
    request({
        url: chainInfo,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var x = JSON.parse(response.body);
            
            var item = {};
            item["info"] = x.data;
           // item["address"] = JSON.stringify(body);
            data.push(item);
            var json = JSON.stringify(data, null, 2);
            fs.writeFile(dir + '/ltc_balance.json', json, 'utf8');

        } else {
            console.log('error' + response);
        }
    });
    // }, 60000);
}