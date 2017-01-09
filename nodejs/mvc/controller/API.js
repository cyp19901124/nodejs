const model = require('../model');

let User = model.User;

var fn_findAll = async (ctx, next) => {
    try {
        await next();
        let users = JSON.stringify(await User.findAll());
        ctx.response.body = users;
    } catch (err) {
         console.log('failed: ' + err);
         ctx.response.body = err;
        //console.log('created.' + JSON.stringify(user));
        
    }
    
};

module.exports = {
    'GET /API/findAll': fn_findAll
};