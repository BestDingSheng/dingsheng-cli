var request = require('request');
var chalk = require('chalk');
var log = console.log

function getWeather(data) {
    if (data) {
        debugger;
        var weathercity = "您好，您现在所在的城市为 " + data.results[0].currentCity;
        var weatherdegree = "";
        for (var i in data.results[0].index) {
            weatherdegree += data.results[0].index[i].tipt + ":" + data.results[0].index[i].title + " " + data.results[0].index[i].zs + " " + data.results[0].index[i].des;
        }
        var weatherdata = "今天是" + data.results[0].weather_data[0].date + ",天气" + data.results[0].weather_data[0].weather + " " + data.results[0].weather_data[0].wind + ",温度" + data.results[0].weather_data[0].temperature;
        var weather_fea = "未来三天\n";
        for (var i in data.results[0].weather_data) {
            if (i != 0) {
                weather_fea += data.results[0].weather_data[i].date + ",天气" + data.results[0].weather_data[i].weather + " " + data.results[0].weather_data[i].wind + ",温度" + data.results[0].weather_data[i].temperature + "\n";
            }

        }
        var weather = weathercity + weatherdegree + weatherdata + weather_fea;
        log(chalk.red(weathercity));
        log(chalk.green.underline.bold(weatherdata))
        log(chalk.blue.underline.bold(weather_fea))
        log(chalk.hex('#DEADED').bold(weatherdegree));
        // console.log(weather);  
    }
}

function api() {
    log("丁盛正在为您播报天气预报，请稍等。。。")
    request('http://api.jirengu.com/weather.php', function(error, response, body) {
        if (!error && response.statusCode == 200) {
                let cent  = JSON.parse(body);
                if(cent.status==302){
                      console.log(''+cent.message);
                      return;
                }
            getWeather(cent);
        } else {
            console.log('服务器出错请稍后再试');
        }
    });
}

module.exports={
    api
}
