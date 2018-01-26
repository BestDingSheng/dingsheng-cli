#!/usr/bin/env node

var {
    api
} = require('../lib');
var program = require('commander'),
    chalk = require('chalk');
var shell = require('shelljs')
var clone = require('git-clone')
var inquirer =require('inquirer')
var weather = require('../lib/weather.js')

program
    .version(require('../package').version)
    .description('一个可以翻译,查询天气和快速创建vue和react项目的命令行工具')

program
    .command('ts [content]')
    .description('这是一个翻译命令，如 ding-cli ts chrome')
    .action(function(content) {
        if (content) {
            api(content)
        } else {
            console.log(chalk.cyan('请填写需要翻译的单词'));
        }
    })

program
    .command('weather [city]')
    .description('查询天气预报默认上海，ding-cli weather beijing')
    .action(function(city){
        if(city){
            weather.api(city)
        }else{
            console.log('请输入城市名称，如 ding-cli weather上海或者ding-cli weather shanghai')
            console.log('');
             weather.api()
        }
    })
program
    .command('init')
    .description('初始化前端项目')
    .action(function(option) {
        var promps = []
        promps.push({
            type: 'list',
            name: 'projectMode',
            message: '请选择项目模板',
            choices: [{
                    name: 'vue',
                    value: 'vue'
                },
                {
                    name: 'react',
                    value: 'react'
                }
            ]
        })
        promps.push({
            type: 'input',
            name: 'projectName',
            message: '请输入项目名称',
            validate: function(input) {
                if (!input) {
                    return '不能为空'
                }
                return true
            }
        })

        inquirer.prompt(promps).then(function(answers) {
            var {projectMode,projectName} = answers;
            if(projectMode=='vue'){
                downProject('https://github.com/BestDingSheng/ding-initVue.git',projectName);
            }else{
                downProject('https://github.com/BestDingSheng/react-redux-demo.git',projectName);
            }
        })
    })

program.parse(process.argv)
let query = process.argv[2];
if (!query) {
    program.help();
}
// 下载模板
function downProject(url, filename) {
    let pwd = shell.pwd()
    let project = filename
    console.log(chalk.blue('正在拉取模板代码'));
    console.log(`下载位置：${pwd}/${project}/ ...`)
    clone(`${url}`, pwd + `/${project}`, null, function() {
        shell.rm('-rf', pwd + `/${project}/.git`)
        console.log('模板工程建立完成')
    })
}