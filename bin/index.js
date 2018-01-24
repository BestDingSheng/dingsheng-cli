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
    .command('weather')
    .description('查看本地天气情况')
    .action(function(){
        weather.api()
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
program
    .command('* <text>')
    .description('比如ding-cli node 会翻译node')
    .action(function(text) {
        if (text) {
            api(text)
        } else {
            console.log(chalk.cyan('请填写需要翻译的单词'));
        }
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