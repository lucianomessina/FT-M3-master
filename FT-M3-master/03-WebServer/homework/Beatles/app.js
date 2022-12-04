var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]


var fs  = require("fs")
var http  = require("http")
//Nos traemos los comandos que necesitamos
// Escribí acá tu servidor

//Creamos un server http, le pasamos un solo parametro que es un metodo que recibe el request y el response
http.createServer(function(req, res){ //Creamos un server
 if(req.url === '/api'){ //Si el usuario quiere entrar en /api
  res.writeHead(200, {'Content-Type': 'application/json'}) //Pasamos los datos de los beatles a json y retornamos eso en /api
  return res.end(JSON.stringify(beatles))
 }
 //Nuestro listen del servidor en el puerto 3000


if(req.url.substr(0, 5)==='/api/'){ //Si el request empieza con api
  const beatle = req.url.split('/').pop() //Dividimos en un array lo que hay despues y antes de cada "/" y lo ultimo lo metemos en el array beatle
  const found = beatle.find(b=> encodeURI(b.name) === beatle) //Buscamos en el array el beatle que coincida con el beatle que busca el cliente

  if(found){ //Si existe ese beatle lo pasamos a formato json y devolvemos los datos
    res.writeHead(200, {'Content-Type': 'application/json'})
    return res.end(JSON.stringify(found))
  }
  //Sino mostramos el error
  res.writeHead(404, {'Content-Type': 'text-plain'})
  return res.end(`${decodeURI(beatle)} is not a beatle`)
}}).listen(3000,'127.0.0.1')



if(req.url === '/'){
  fs.readFile('./index.html'),function(err,data){
    if(err){
      res.writeHead(404,{'Content-Type': 'text-plain'})
      return res.end('Lo siento amigo')
    }
    res.writeHead(200,{'Content.Type': 'text/html'})
    return res.end(data)
  }

if(req.url.length > 1){
  const beatle = req.url.split('/').pop();
  const found = beatle.find (b => encodeURI(b.name)===beatle)
  if(found){
    fs.readFile('./beatle.html', 'utf-8', function(err, data){
      if(err){
        res.writeHead(404,{'Content-Type': 'text-plain'})
      return res.end('Lo siento amigo')
      }
      data = data.replace('{name}', found.name)
      data = data.replace('{birthday}', found.birthdate)
      data = data.replace('{profilePic}', found.profilePic)

      res.writeHead(200,{'Content.Type': 'text/html'})
    return res.end(data)
    })

  }else{
    res.writeHead(404,{'Content-Type': 'text-plain'})
    return res.end('Lo siento amigo')
  }
}

}