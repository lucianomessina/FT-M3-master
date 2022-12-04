// const bodyParser = require("body-parser");
const express = require("express");
let nextId = 1
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
 server.use(express.json());

// TODO: your code to handle requests
server.post('/posts', (req, res)=>{  //Hace un metodo post, le pasamos la ruta que queremos y una funcion de CB que recibe como parametro request y respond
    const {author, title, contents} = req.body; //Sacamos del body las tres variables haciendo destructuring
 if(!author || !title || !contents){ //Si alguna de esas tres variables no se endcuentra entonces arrojamos un error con el error status y en formato JSON
    return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
 } 
 //Si encontramos las 3, creamos un mnuevo objeto con esas 3 propiedades mas un id DISTITNO por cada objeto creado
 const newPost = {
    id: nextId,
    author,
    title,
    contents
 }
 posts.push(newPost) //pusheamos el objeto en nuestro array post
 nextId++ //Y aumentamos el id asi el proximo sea distinto
 res.json(newPost) //Imprimimos en formato JSON el objeto
});


server.post('/posts/author/:author',(req,res)=>{ //El procedimiento es exactamente el mismo con el anterior solo que cambia nuestra ruta y nuestro author lo sacamos del params, osea de lo que escribe el usuario
    const {title, contents} = req.body;
    const {author} = req.params;
    if( !author || !title || !contents){
       return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }  
    const newPost = {
        id: nextId,
        author,
        title,
        contents
     }
     posts.push(newPost)
     nextId++
     res.json(newPost)
})

//Hacemos un metodo get al servidor en la ruta /posts, por query le llego una propiedad term
server.get('/posts',(req,res)=>{
   const {term} = req.query; //Hacemos destructuring
   if(term){ //Si le llego la propiedad hacemos un filter de todos los titles y contents que contengan ese term en el array posts
      const filtrados = posts.filter(p=> p.title.includes(term) || p.contents.includes(term))
      return res.json(filtrados) //Y lo retornamos
   }
   res.json(posts) //Sino retornamos el array tal como esta
})

server.get('/posts/:author',(req,res)=>{ //Hacemos un metodo get en la URL posts: mas lo que escriba el usuario
   const {author} = req.params; //Sacamos esa propiedad del author que va a escribir el usuario por params
   const filtrados = posts.filter(p=> p.author === author) //Y hacemos un array con los posts que contienen ese autor
   if(filtrados.length === 0){ //Si ningun post contiene ese autor retornamos un error
      return res.status(STATUS_USER_ERROR).json({error:"No exite ningun post del autor indicado"})
   }
 res.json(filtrados) //Sino retornamos el arreglo con todos los post con ese autor
})

//Muy parecido al anterior pero con title tambien
server.get('/posts/:author/:title',(req,res)=>{
   const {author, title} = req.params;
   const filtrados = posts.filter(p=> p.author === author && p.title === title)
   if(filtrados.length === 0){
      return res.status(STATUS_USER_ERROR).json({"error": "No existe ningun post con dicho titulo y autor indicado"})
   }
 res.json(filtrados)
})


//Hacemos un metodo put para actualizar el recurso en la URL posts
server.put('/posts', (req,res)=>{ 
   const {id, title, contents} = req.body; //Hacemos destructuring de las propiedades id, contents y title del body
   if(!id || !title || !contents){ //Si alguna de esas 3 no esta lanzamos un error con el status
      return res.status(STATUS_USER_ERROR).json({error:'No se recibieron los parametros'})
   }
   const post = posts.find(p=> p.id === id) //Sino, guardamos en el array post todos los id que corresponden al arreglo postS
   if(!post){ //find agarra lo primero que encuentra por eso si post no tiene valor retornamos que no hay un post con ese id
      return res.status(STATUS_USER_ERROR).json({error:'No hay un post con ese id'})
   }
   //Si post si tiene valor le agregamos un tittle = al q hicimos destructuring y lo mismo con el contents
   post.title = title;
   post.contents = contents;
   res.json(post) //Y lo retornamos
})

//Hacemos un metodo de tipo delete en la ruta posts
server.delete('/posts',(req, res)=>{
   const {id} = req.body //Hacemos destructuring del body
   if(!id){ //Si no encontramos ningun id entonces el usuario no nos dijo que quiere borrar y por lo tanto devolvemos un error
      return res.status(STATUS_USER_ERROR).json({error:'Te olvidaste el id'})
   }
   const post = posts.find(p=> p.id === id) //Buscamos dentro del arreglo posts un post que matchee con ese id
   if(!post){ //Si no hay ninguno lo hacemos saber con un error
      return res.status(STATUS_USER_ERROR).json({error:'No hay un post con ese id'})
   }
   posts = posts.filter(p=> p.id !== id) //Si hay alguno aplicamos un filter para borrarlo
   res.json({success: true}) //Y retornamos que fue exitoso
})


server.delete('/author',(req, res)=>{ //Otro metodo de tipo delete, muy parecido al anterior pero en vez de id con author
   const {author} = req.body
   if(!author){
      return res.status(STATUS_USER_ERROR).json({error:'Te olvidaste el autor'})
   }
   const peAuthor = posts.filter(p=> p.author === author) //Utilizamos filter porque puede haber mas de un author a diferencia del id
   if(!peAuthor.length){ //Por lo tanto es un array, asique lo q tenemos q verificar es su longitud, si es igual a 0 devolvemos un error
      return res.status(STATUS_USER_ERROR).json({error:'No existe el autor indicado'})
   }

   posts = posts.filter(p=> p.author !== author) //Sino hacemos un filter de los autores
   res.json(peAuthor) //y retornamos todos los elementos filtrados
})



module.exports = { posts, server };
