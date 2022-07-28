var http = require('http'); // подключение библиотек
var fs = require('fs')

var server = http.createServer(function(){ 
    //console.log(fs.readFileSync('text.txt', 'utf8')  )
    fs.writeFileSync('text.txt', `${Number(fs.readFileSync('text.txt', 'utf8'))+1}` ) 
    //console.log(fs.readFileSync('text.txt', 'utf8')  )
});

server.listen(3001,'127.0.0.1')
console.log("отслеживается порт 3001 ")
