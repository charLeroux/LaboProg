// Charles Leroux
// 16/09/24
// description : Page web permettant de vérifié l'état des modules 
const { on } = require('events');
const e = require('express');
var express = require('express')
var app = express();
var http = require('http');
app.set('view engine', 'ejs');
var mqtt = require('mqtt');
var nbModule = 0;
var isModule = "";

var client  = mqtt.connect('mqtt://127.0.0.1:1883');
client.subscribe('MODULE/#');
let id = [
    id1 = 0,
    id2 = 0,
    id3 = 0,
    id4 = 0,
    id5 = 0,
    id6 = 0
    ] 
    


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

client.publish('MODULE', 'le serveur js vous dit bonjour');
client.on('message', function (topic, message) {
    console.log(topic.toString());
    console.log(message.toString());
    if(topic.toString().split("/")[0] == "MODULE")
        {
           
            if(topic.toString().split("/")[1]>= 1 && topic.toString().split("/")[1] <=6 )
            {
                nbModule = topic.toString().split("/")[1];
                if(message == "on")
                    {
                        
                        id[nbModule-1] = 1;
                    }
                else if(message == "off")
                    {
                        id[nbModule-1] = 0;
                    }
                    console.log(id);
            }
            else
            {
                console.log("module non trouvable")
            }
             
        }
     
  });
  

app.get('/module/:varModule',function(req,res)
{
    for(var i = 0; i <= 5 ; i++)
        {
            if(req.params.varModule>= 1 && req.params.varModule <= 6)
                {
                    if(req.params.varModule == i)
                        {
                            if(id[i-1] == 1)
                                id[i-1] = 0;
                            else
                            {
                                id[i-1] = 1;
                            }
                            res.render('./page/module',{valModule: req.params.varModule, module1 : id[0], module2 : id[1], module3 : id[2], module4 : id[3], module5 : id[4], module6 : id[5]});
                        }
                       
                }
                else
                {
                    res.render('./page/module',{valModule: "MODULE INTROUVALE"});
                }
        }
});

app.get('/controle',function (req, res)
{
    res.render('./page/controle', { controle1 : id[0], controle2 : id[1], controle3 : id[2], controle4 : id[3], controle5 : id[4], controle6 : id[5] }); 
});

app.get('/reset',function (req, res)
{
   id[0] = 0;
   id[1] = 0;
   id[2] = 0;
   id[3] = 0;
   id[4] = 0;
   id[5] = 0;

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

   
