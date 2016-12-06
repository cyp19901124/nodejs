var fn_index = async (ctx, next) => {
    ctx.render('index.html',{
        title:'Welcome'
    });
};

var to_regist = async (ctx, next) => {
    ctx.render('regist.html');
};

module.exports = {
    'GET /': fn_index,
    'GET /toRegist': to_regist
};