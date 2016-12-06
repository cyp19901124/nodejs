

function call(name){
    console.log('hello '+ ','+name);

}

function func(){

    console.log('func');
}

function func2(){
    console.log('func2');
}

module.exports = {
    call:call,
    func:func,
    func2:func2
};