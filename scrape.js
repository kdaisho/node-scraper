const request = require("request");
const cheerio = require("cheerio");
const util = require("util");
request(
    "http://www.kotsu-okinawa.org/time/honto-chatan-kita/k1.htm",
    (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            const time = [];
            const obj = {};
            // const siteTable = $("#contents_right td");
            // $("#contents_right tr").each((i, el) => {
            $("tbody tr").each((i, row) => {
                const arr = [];

                $(row).each((i, el) => {
                    console.log("hi", $(el).text());
                    let hour = $(el).text();
                    if (hour.length < 4) {
                        hour = "0" + hour;
                    }
                    arr.push(hour);
                });
                arr[0] = arr[0]
                    .replace(/\n/g, ",")
                    .replace(/\s/g, "")
                    .replace(/(^,)|(,$)/g, "")
                    .replace(/(,\s$)/g, "");
                let value = arr[0].split(",");
                console.log("RRA", value);
                value.forEach((item, i) => {
                    if (item.length <= 3) {
                        console.log("Value 3", item);
                        value[i] = item.replace(/(\w)(\w\w)/g, "0$1$2");
                    }
                    value[i] = value[i].replace(/(\w\w)(\w\w)/g, "$1:$2");
                });
                time.push(value);
            });
            util.inspect.defaultOptions.maxArrayLength = null;
            console.log(time, { maxArrayLength: null });
        }
    }
);
