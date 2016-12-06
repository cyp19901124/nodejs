// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

//注意require('koa-router')返回的是函数
const router = require('koa-router')();

// 创建一个Koa对象表示web app本身:
const app = new Koa();

const bodyParser = require('koa-bodyparser');

const templating = require('./templating');

const controller = require('./controller');

const isProduction = process.env.NODE_ENV === 'production';

if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(controller('controller'));  //扫描指定文件夹里的.js文件并注册url

app.listen(3000);
console.log('app started at port 3000...');