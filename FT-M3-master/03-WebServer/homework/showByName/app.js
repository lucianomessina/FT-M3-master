var fs  = require("fs")
var http  = require("http")
//Nos traemos los comandos que necesitamos
// Escribí acá tu servidor

//Creamos un server http, le pasamos un solo parametro que es un metodo que recibe el request y el response
http.createServer(function(req,res){
    //Ese metodo lee el request que le llega y ejecuta segun lo que necesite, 
fs.readFile(`./images${req.url}.jpg`, function(err,data){

if(err){
    res.writeHead(404,{'Content-Type': 'text-plain'})
    res.end('img not found')
}else{
    res.writeHead(200,{'Content-Type': 'image/jpeg'})
    res.end(data)
}
})
}).listen(3000,'127.0.0.1')