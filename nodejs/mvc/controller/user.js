const model = require('../model');

let User = model.User;

var fn_login = async (ctx, next) => {
    var 
        email = ctx.request.body.email || {},
        password = ctx.request.body.password || {};

    try {
        let user = await User.findOne({where : {email:email} });

        if(user.email == email && user.passwd == password){
            ctx.render('result.html',{
                success:true,
                user:user
            })
        }else{
            ctx.response.redirect('/');
        }

    } catch (err) {
        console.log(err);
        ctx.response.body=err;
    }
};

var fn_regist = async (ctx, next) => {
    try {
        await User.create({     //await 关键字 等待异步操作完成后再执行后续操作yes
            name: ctx.request.body.name,
            gender: ctx.request.body.gender,
            email: ctx.request.body.email,
            passwd: ctx.request.body.passwd
        });

        //console.log('created.' + JSON.stringify(user));
        ctx.response.redirect('/static/index.html');
    } catch (err) {
         console.log('failed: ' + err);
        //console.log('created.' + JSON.stringify(user));
        ctx.response.redirect('/static/index.html');
    }
    
};

var fn_findAll = async (ctx, next) => {
    try {
        let users = JSON.stringify(await User.findAll());
        ctx.response.body = users;
    } catch (err) {
         console.log('failed: ' + err);
         ctx.response.body = err;
        //console.log('created.' + JSON.stringify(user));
        
    }
    
};

module.exports = {
    'POST /login': fn_login,
    'POST /regist': fn_regist,
    'GET /getAll':fn_findAll
};