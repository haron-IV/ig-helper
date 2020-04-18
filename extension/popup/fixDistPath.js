var fs = require('fs');

console.log("======================================");
fs.readFile('./dist/index.html', 'utf8', function (err, data){
    console.log("rewriting dist/index.html");
    if (err) {
        console.log("Check your path -> ", __dirname)
        return console.log(err);
    }

    var result = data;

    result = result.replace(/src=\//g, 'src=./');
    result = result.replace(/href=\//g, 'src=./');

    console.log("File string was replacet without erros");
    
    fs.writeFile('./dist/index.html', result, 'utf8', function(err) {
        if (err) console.log(err);
        console.log("File was overwrite withouts any problems");
    })
})