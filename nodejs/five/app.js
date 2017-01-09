const express = require('express');
let app = express();

app.get('/', function(req, res){
    res.send('hello world!');
});

app.listen(3000, function(){
    let port = this.address().port;

    console.log(`app port: ${port}`);
});