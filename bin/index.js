#!/usr/bin/env node

var {
    api
} = require('../lib');
var program = require('commander'),
    chalk = require('chalk');

var shell = require('shelljs')
var clone = require('git-clone')

program
    .version(require('../package').version)
    .description('一个可以翻译和快速创建vue和react项目的工具')

program
    .command('init')
    .option('--vue', '初始化vue项目')
    .option('--react', '初始化react项目')
    .description('初始化前端项目')
    .action(function(option) {
        let vue = option.vue;
        let react = option.react;
        if (vue) {
            downProject('https://github.com/BestDingSheng/ding-initVue.git',"vueproject");
        } else if (react) {
             downProject('https://github.com/BestDingSheng/react-redux-demo.git',"reactproject");
        } else {
            console.log(chalk.cyan('请输入正确的参数'));
            console.log(chalk.cyan('ding-cli init --vue'));
            console.log(chalk.cyan('ding-cli init --react'));
        }
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
function downProject(url,filename) {
    let pwd = shell.pwd()
    let project = filename
    console.log(chalk.blue('正在拉取模板代码'));
    console.log(`下载位置：${pwd}/${project}/ ...`)
    clone(`${url}`, pwd + `/${project}`, null, function() {
        shell.rm('-rf', pwd + `/${project}/.git`)
        console.log('模板工程建立完成')
    })
}