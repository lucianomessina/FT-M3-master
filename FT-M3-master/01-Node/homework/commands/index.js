const fs = require('fs');
const { request } = require('http');


module.exports = {
    pwd: function(args,done) {done(process.pwd())},
    date: function(args,done) { done(Date()); },


    ls: function(args,done){
fs.readdir('.', function(err, files) {
    if (err) throw err;
    var out = ''
    out = out + files + '\n'
    // files.forEach(function(file) {
    //   process.stdout.write(file.toString() + "\n" );
    // })
    done(out)
    // process.stdout.write("prompt > ");
  });
},
echo: function(args,done){
    done(args.join(' '));
},
cat: function(file,done){
    fs.readFile(file[0], 'utf-8', function(err,data){
        if(err) throw err;
        const lines = data.split('\n').slice(0,9).join('\n')
        // process.stdout.write(lines);
        // process.stdout.write('\nprompt <');
        done(lines)
    }
    )
   
},
tail: function(file,done){
    fs.readFile(file[0], 'utf-8', function(err,data){
        if(err) throw err;
        const lines = data.split('\n').slice(-10).join('\n')
        // process.stdout.write(lines);
        // process.stdout.write('\nprompt <');
        done(lines)
    }
    )
},
curl:function(url,done){
    request(url[0],function(err,response,body){
        if(err) throw err;
        // process.stdout.write(body)
        // process.stdout.write('\prompt >')
        done(body)
    })
}
}
 // ...