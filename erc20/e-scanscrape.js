var scraperjs = require('scraperjs');
var fs = require('fs'); 
var counter = 1;

var intervals = setInterval(function () {
        scrap(counter++);
    }, 3000);
 
var x = [];

function scrap(counter){
    console.log(counter)
    var url ="";
   if(counter ==0){
      url = 'https://etherscan.io/tokens';
   }else{
      url = 'https://etherscan.io/tokens?p='+counter;
   }
   
  scraperjs.StaticScraper.create(url ,counter)
    .scrape(function($) {
        return $("h5 a").map(function() {
            var obj = {};
            obj['erc20name'] = $(this).text();
            obj['address'] = $(this).attr("href");
            return obj;
        }).get();
    })
    .then(function(erc20) { 
       // var obj = {};
      //  obj['info'] = erc20     
        x.push(erc20);                      
       var json = JSON.stringify(x, null, 2);
       console.log(json);
       fs.writeFile(__dirname +'/erc20.json', json, 'utf8');
    })
}
 