var request = require('request');
var chalk = require('chalk');
var log = console.log

function api(location = 'shanghai') {
    var url = "https://free-api.heweather.com/s6/weather?location=" + location + "&key=03b97a7bdb854f0984441eb437793985"
    log("丁盛即将为您播报天气预报，请稍等。。。。。。")
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            let cent = JSON.parse(body);
            let data = cent.HeWeather6[0]
            if(data.status!='ok'){
                console.log('没找到你输入的城市，请输入正确的城市')
                return;
            }
            let city = data.basic.parent_city;
            let daily_forecast = data.daily_forecast; // 三天天气
            let lifestyle = data.lifestyle; // 生活指数
            let tianqi = ''; // 天气 
            let text = ''; // 生活指数
            daily_forecast.forEach(function(item, index) {
                if (index == 0) {
                    tianqi += '今天温度' + item.tmp_min + "~" + item.tmp_max + '摄氏度,白天' + item.cond_txt_d + ',夜间' + item.cond_txt_n + '\n\n未来两天\n'
                } else {
                    tianqi += item.date + '号温度' + item.tmp_min + "~" + item.tmp_min + '摄氏度,白天' + item.cond_txt_d + ',夜间' + item.cond_txt_n + "\n"
                }
            })
            lifestyle.forEach(function(item, index) {
                text += item.txt + '\n';
            })
            log(chalk.red('你查询的是' + city+'天气'));
            log(chalk.green.bold(tianqi))
            log(chalk.blue.bold('下面为您播报生活指数\n'))
            log(chalk.hex('#DEADED').bold(text));
        } else {
            console.log('服务器出现小差请稍后再试')
        }
    });
}
module.exports = {
    api
}