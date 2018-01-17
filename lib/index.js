var request = require('request');
var out = require('./output');



function api(query) {
    request('http://fanyi.youdao.com/openapi.do?keyfrom=node-translator&key=2058911035&type=data&doctype=json&version=1.1&q='+query, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let text = JSON.parse(body)
            out(text)
        }else{
            console.log('服务器出错请稍后再试');
        }
    });
}

module.exports={
    api
}