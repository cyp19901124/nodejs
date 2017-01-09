const koa = require('koa');
const session = require('koa-session')
const convert = require('koa-convert');

const app = new koa();
app.keys = ['some secret hurr'];
var CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
};

app.use(convert(session(CONFIG,app)));

app.use(async (ctx, next)=>{
     // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  var n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});

app.listen(3000);
console.log('listening on port 3000');