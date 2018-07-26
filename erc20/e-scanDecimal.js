var scraperjs = require('scraperjs');
var fs = require('fs');
var async = require("async");
var obj = "";
var counter = 0;

var info = [];
var x = [];



async function readFile(path, opts = 'utf8') {
    new Promise((res, rej) => {
        fs.readFile(path, opts, (err, data) => {
            if (err) rej(err)
            else res(data)
        })
    });
}
console.log(__dirname+"/erc20.json");

readFile(__dirname+"/erc20.json").then(function(e){
    console.log(e);
}).catch(function(e){
    console.log(e);
});

// fs.readFile(__dirname + "/erc20.json", 'utf8', async function (err, data) {
//   aw obj = JSON.parse(data);
//     //  async.eachSeries(JSON.parse(data), async function (value, callback) {
//     //     await createPromise(value).then( function (h) {             
//     //         scraperjs.StaticScraper.create(h.url)
//     //             .scrape(function ($) {
//     //                 return $("#ContentPlaceHolder1_trDecimals td:last-child").map(function () {
//     //                     var decimal = $(this).text();
//     //                     var od = {};
//     //                     od['decimal'] = decimal.replace(/^\s*|\s*$/g, '');
//     //                     od['address'] = h.address;
//     //                     od['erc20name'] = h.erc20name;
//     //                     return od;
//     //                 }).get();
//     //             })
//     //             .then(function (erc20) {
//     //                 if (erc20.length > 0) {
//     //                     info.push(erc20);
//     //                     var json = JSON.stringify(info, null, 2);
//     //                     var jsonFile = '/erc20DFJ.json';
//     //                     fs.writeFile(__dirname + jsonFile, json, 'utf8');
//     //                 }

//     //             });
//     //     }).catch(function (e) {
//     //         console.log(e);
//     //     });
//     // })

// });


function createPromise(obj) {

    return new Promise(function (resolve, reject) {
        if (obj) {
            var url = 'https://etherscan.io/' + obj.address;
            var d = {};
            d['url'] = url;
            d['erc20name'] = obj.erc20name;
            d['address'] = obj.address;
            resolve(d);
        } else {
            reject(0);
        }
    });

}

function asyncronous(obj) {
    console.log(obj);
    //     var url = 'https://etherscan.io/';           

}
