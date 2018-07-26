//fetch once one go save in fs as js 

var async = require("async");
var fs = require('fs');
var mysql = require('mysql');

//folder and file creation
var dir = "evr";
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

/**DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=laravelletcoin
DB_USERNAME=root
DB_PASSWORD=Smile@7890
 */


var obj = {};
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'everus'
});

con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT everus_eth_address ,user_id from users  ", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        try {
            let data = result;
            obj.usersinfo = data;
            var json = JSON.stringify(obj, null, 2);

            //obj.table.push(data);
            Promise.resolve(
                //  data.pipe(dir + '/user.log')
                fs.writeFile(dir + '/evr.json', json, 'utf8')

            ).then(function () {
                console.log(data);
            })
        } catch (error) {
            console.log(error);
        }
    });
});