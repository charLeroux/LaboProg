/* 
Auteur: Charles Leroux
Date: 10/04/2024
Fichier: index.js
Description: Fichier serveur pour le labo5
*/

var express = require('express');
var router = express.Router();
var { Item, itemList } = require('../public/javascripts/class');
var { io } = require('../socketApi');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1:1883');
client.subscribe('ITEM/MODULE/#');
let clientTable = "";
list = new itemList();
list.add(new Item(1, "patate", 2000));
list.add(new Item(2, "ta mere", 1));
list.add(new Item(3, "hot dog", 12));
creationTableau();

client.on('connect', function () {
  console.log("MQTT connecté !");
});





io.sockets.on('connection', function (socket) {
  socket.emit('liste', clientTable)
  console.log('Un client est connecté !');
});

io.sockets.on('connection', function (socket) {
  socket.on('messageDeleteName', function (message) {
    list.removeByName(message);
    creationTableau();
    client.publish('ITEM/WEB/DELETE/ID', message);
    console.log('Un client me parle ! Il me dit : ' + message);
    socket.emit('liste', clientTable);

  })

  client.on('message', function (topic, message) {
    if (topic.toString() == "ITEM/MODULE/NEW") {
      list.add(new Item(cnt++, message.toString().split('\n')[0], message.toString().split('\n')[1]));
      creationTableau();
      socket.emit('liste', clientTable);
    }
  });


  client.on('message', function (topic, message) {
    if (topic.toString() == "ITEM/MODULE/DELETE/ID") {
      if (message > list.getLenght())
        console.log("error ID not found")
      else {
        list.removeItemById(message.toString());
        creationTableau();
        socket.emit('liste', clientTable);
      }
    }
  });

  client.on('message', function (topic, message) {
    if (topic.toString() == "ITEM/MODULE/DELETE/NAME") {
      list.removeByName(message.toString());
      creationTableau();
      socket.emit('liste', clientTable);
    }
  });


  socket.on('messageDeleteId', function (message) {
    if (message > list.getLenght())
      console.log("error ID not found")
    else {
      list.removeItemById(message);
      creationTableau();
      client.publish('ITEM/WEB/DELETE/ID', message);
      console.log('Un client me parle ! Il me dit : ' + message);
      socket.emit('liste', clientTable);
    }
  })

  socket.on('messageAdd', function (message) {
    list.add(new Item(cnt++, message.split('/')[0], message.split('/')[1]));
    creationTableau();
    console.log('Un client me parle ! Il me dit : ' + message);
    mqttAdd = "";
    mqttAdd += " id :" + list.tab[list.getLastItemID() - 1]._id + '\n' + " nom : " + list.tab[list.getLastItemID() - 1]._nom + '\n' + " date : " + list.tab[list.getLastItemID() - 1].dateCreation + '\n' + " prix : " + list.tab[list.getLastItemID() - 1]._prix;
    client.publish('ITEM/WEB/NEW', mqttAdd);
    socket.emit('liste', clientTable);
  })
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

function creationTableau() {
  clientTable = ""
  cnt = 1;
  for (let x = 0; x <= list.getLenght() - 1; x++) {
    clientTable += "<tr>";
    clientTable += "<td>";
    list.tab[x]._id = cnt++;
    clientTable += list.tab[x]._id;
    clientTable += "</td>";

    clientTable += "<td>";
    clientTable += list.tab[x].dateCreation;
    clientTable += "</td>";

    clientTable += "<td>";
    clientTable += list.tab[x]._nom;
    clientTable += "</td>";

    clientTable += "<td>";
    clientTable += list.tab[x]._prix;
    clientTable += "</td>";

    clientTable += "</tr>";
  };
}

module.exports = router;

