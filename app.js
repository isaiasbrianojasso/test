const express =  require("express");
const bodyParser = require("body-parser");
var app = express();
const archivos = require('fs');
//DB Handler
var db = {
    //Indicar BD o abrir conexion
    initDB: function () {
        var fs = require("fs");
        var contents = fs.readFileSync("./youtubes.json");
        this.youtubes = JSON.parse(contents);
    },
/*
    //Busqueda Alumno
    getyoutubesBy: function (filter, forUsername) {
        console.log("filtro: " + filter + "forUsername: " + forUsername);
        var selected = null;
        this.youtubes.forEach(youtubes => {
            console.log(youtubes);
            console.log(youtubes[filter]);
            if (youtubes[filter] == forUsername) {
                selected = youtubes;
                return selected;
            }
        });
        return selected;
    },
*/
    saveyoutubes : function(){
      archivos.writeFileSync('youtubes.json', JSON.stringify(this.youtube),
        function (error) {
            if (error) {
                console.log('Hubo un error al escribir en el archivo')
                console.log(error);
            }
        });
    }
    
}

app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendfile("index.html" );
});

app.get('/youtubes', (req, res) => {
  db.initDB();
  res.json(db.youtubes);
});

app.get('/youtubes', (req, res) => {
  db.initDB();
  res.json(youtubes);
});

app.post('/youtubes',function(req,res){
  db.initDB();
  var youtubes = req.body;
  console.log("Objeto post recibido");
  console.log(youtubes);
  db.youtubes.push(youtubes);
  db.saveyoutubes();
  alert("Recibido");
  res.json({'status' : 'OK'});
});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})