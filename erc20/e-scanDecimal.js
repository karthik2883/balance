var scraperjs = require('scraperjs');
var fs = require('fs-extra');
(async function main() {
    try {
        const addressRaw = await fs.readFile(__dirname + "/erc20.json", 'utf-8');
        const addressJson = JSON.parse(addressRaw);
        const result = await Promise.all(addressJson.map(async (decimal) => {
            try {
                var url = "https://etherscan.io/" + decimal.address;
                const res = await scraperjs.StaticScraper.create(url)
                    .scrape(function ($) {
                        return $("#ContentPlaceHolder1_trDecimals td:last-child").map(function () {
                            var d = $(this).text();
                            var od = {};
                            od['decimal'] = d.replace(/^\s*|\s*$/g, '');
                            od['address'] = decimal.address;
                            od['erc20name'] = decimal.erc20name;
                            return od;
                        }).get();
                    }).catch(function(e){
                        console.log(e);
                    });
                return res;
            } catch (e) {
                console.log(e.message)
            }
        }));
        if (result.length > 0) {
            var json = JSON.stringify(result, null, 2);
            fs.writeFile(__dirname + '/erc20DFJ.json', json, 'utf8');
        }

    } catch (e) {
        console.log(e.message);
    }
})();
