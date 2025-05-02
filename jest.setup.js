const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// 设置全局 DOM 环境
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// 设置全局 p5.js 模拟函数
global.createCanvas = jest.fn();
global.createButton = jest.fn();
global.loadJsonData = jest.fn();
global.image = jest.fn();
global.background = jest.fn();
global.text = jest.fn();
global.textSize = jest.fn();
global.fill = jest.fn();
global.width = 800;
global.height = 600; 