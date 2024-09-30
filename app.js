// Charles Leroux
// 16/09/24
// description : Page web permettant de vérifié l'état des modules 
var express = require('express')
var app = express();
var http = require('http');
app.set('view engine', 'ejs');
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1:1883');
var id1 = 0;
var id2 = 0;
var id3 = 0;
var id4 = 0;
var id5 = 0;
var id6 = 0;

app.get('/',function(req,res)
{
    res.render('./page/acceuil.ejs')
});

 app.get('/contact',function(req, res)
{
    let tableau = {1: 'Charles Leroux', 2: 'J7C 5C2', 3: 'CarlosNPepe@hotmail.com', 4: '444-444-4419'}
    let resultat = '<table>';
    for(let element in tableau){
        resultat+= "<tr><td>" + element+ ":" + "</td><td>"+ tableau[element] + "</td></tr>";
    }
    resultat += '<table>';
    res.send(resultat + "<a href= '/'>retour a l accueil</a>");

});

client.on('connect', function () {
    console.log("MQTT connecté !");
});


app.get('/module/:varModule',function(req,res)
{
    if(req.params.varModule>= 1 && req.params.varModule <= 6)
        {
            if(req.params.varModule == 1)
                {
                    if(id1 == 0)
                        id1 = 1;
                    else
                        id1 = 0;
                }
            if(req.params.varModule == 2)
                {
                    if(id2 == 0)
                        id2 = 1;
                        else
                        id2 = 0;
                }
            if(req.params.varModule == 3)
                {
                     if(id3 == 0)
                        id3 = 1;
                     else
                        id3 = 0;
                }
                if(req.params.varModule == 4)
                {
                    if(id4 == 0)
                        id4 = 1;
                    else
                        id4 = 0;
                }
                if(req.params.varModule == 5)
                    {
                        if(id5 == 0)
                            id5 = 1;
                        else
                            id5 = 0;
                    }
                if(req.params.varModule == 6)
                    {
                        if(id6 == 0)
                            id6 = 1;
                        else
                            id6 = 0;
                    }    
            res.render('./page/module',{valModule: req.params.varModule, module1 : id1, module2 : id2, module3 : id3, module4 : id4, module5 : id5, module6 : id6});
        }
        else
        {
            res.render('./page/module',{valModule: "MODULE INTROUVALE"});
        }
});

app.get('/controle',function (req, res)
{
    res.render('./page/controle', { controle1 : id1, controle2 : id2, controle3 : id3, controle4 : id4, controle5 : id5, controle6 : id6 }); 
});

app.get('/reset',function (req, res)
{
    id1 = 0;
    id2 = 0;
    id3 = 0;
    id4 = 0;
    id5 = 0;
    id6 = 0;

    res.render('./page/reset'); 
});

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.use(function(req,res)
{
    res.writeHead(404);
    res.end("ERROR 404 : page Introuvable")
});
app.listen(8080);

   
