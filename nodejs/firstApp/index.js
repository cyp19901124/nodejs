var express = require('express');
var app = express();

app.locals.title = 'my app';

app.get('/',function(req, res){
	res.send('hello world');
	
	})
	
app.listen(3000,function(){
	console.log('开始运行，3000端口');
	
});