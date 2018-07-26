var os = require('os');
var async = require("async");
var http = require('http');
var request = require('request');
var path = require('path');    
var fs = require('fs');
//load json
var dir = "btc";
var parentDir = path.dirname(dir);
var obj ="";
fs.readFile(__dirname+"/"+dir+'/btc.json', 'utf8', function(err, data) {
    obj = JSON.parse(data); 
    console.log(obj);
}); 
var counter = 1;
var intervals  =
 setInterval(function() { 
    createAccount(counter++, obj.usersinfo);
},300);
function StopInterval() {
    clearInterval(intervals);
}
var data = [];
function createAccount(cnt,info){
 //  var chainInfo =  "https://chain.api.btc.com/v3/address/"+info[cnt].wallet_address;
 // var chainInfo = "https://chain.api.btc.com/v3/address/3QvEYd8PJgtZaYWBaWmaqzS4H6B3Fww7rP";
   var chainInfo =  " https://blockchain.info/address/"+info[cnt].wallet_address+"?format=json";
  // https://blockchain.info/address/3MFYaRhmz5U1QzLK2gNbLf4CGTVcbxzFUj?format=json
  //  var requestLoop = setInterval(function(){
        request({
            url: chainInfo,
            method: "GET",
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10
        },function(error, response, body){
            if(!error && response.statusCode == 200){
                 console.log('sucess!',JSON.stringify(response));
               if(JSON.parse(response.body).final_balance !==null){
                var item = {};
                item["address"] = info[cnt].wallet_address;
                item["balance"] = JSON.parse(response.body).final_balance
                data.push(item);              
                var json = JSON.stringify(data, null, 2);
                console.log("data",json);              
                fs.writeFile(dir + '/btc_balance.json', json, 'utf8');
               }
            }else{
                console.log('error' + response);
            }
        });
     // }, 60000);
}

 