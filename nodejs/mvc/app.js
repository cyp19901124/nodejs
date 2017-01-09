// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

var session = require('koa-session');
const convert = require('koa-convert');

//注意require('koa-router')返回的是函数
const router = require('koa-router')();

// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.keys = ['hahaha'];

var CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
};

app.use(convert(session(CONFIG,app)));

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

//权限验证
app.use(async (ctx, next) =>{
    console.log(ctx.session.user);
    let user = ctx.session.user || '';
    
    if(user === ''){
        console.log('用户未登录');

        ctx.redirect('/');

    }else{
        console.log(`用户登录${user.name}`);
    }

    //next();
});

app.on('error', function(err, ctx){
    console.log('err');
    log.error('server error', err, ctx);
    ctx.render('error.html',{
            error:err
        });
});

app.listen(3000);
console.log('app started at port 3000...');