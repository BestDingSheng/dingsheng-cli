#!/usr/bin/env node

var {
    api
} = require('../lib');
var program = require('commander'),
    chalk = require('chalk');


program
    .version('1.0.0')
    .description('基于有道api的翻译工具')
program
    .command('init')
    .description('功能待开发')
    .action(function () {
      console.log('功能待开发')
    })
program
    .command('* <text>')
    .description('比如ding-cli node 会翻译node')
    .action(function (text) {
        if (text) {
            api(text)
        } else {
            console.log(chalk.cyan('请填写需要翻译的单词'));
        }

    })

program.parse(process.argv)


let query = process.argv[2];
if(!query){
    program.help();
}
