const axios = require("axios");
const cheerio = require("cheerio");
const util = require("util");
const url = "http://www.kotsu-okinawa.org/time/honto-chatan-kita/k1.htm";

axios
    .get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        const time = [];
        $("tbody tr").each((i, row) => {
            const arr = [];
            $(row).each((i, el) => {
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
            value.forEach((item, i) => {
                if (item.length <= 3) {
                    value[i] = item.replace(/(\w)(\w\w)/g, "0$1$2");
                }
                value[i] = value[i].replace(/(\w\w)(\w\w)/g, "$1:$2");
            });
            time.push(value);
        });
        util.inspect.defaultOptions.maxArrayLength = null;
        console.log(time);
    })
    .catch(error => console.error(error));
