
var async = require("async");
var fs = require('fs'); 

//folder and file creation

// if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
// }
var array = fs.readFileSync(__dirname+"/"+"erc20.txt").toString().split("|");

var data = [];
for(i in array) {
    console.log(array[i]);
    var obj = {};
    obj['info'] = array[i]
    data.push(obj);              
    var json = JSON.stringify(data, null, 2);
    fs.writeFile(__dirname +'/erc20.json', json, 'utf8');
}

 