/* 
Auteur: Charles Leroux
Date: 10/04/2024
Fichier: class.js
Description: Fichier de la classe Item et de la classe itemList
*/

class Item {
    constructor(id, nom, prix) {
        this._id = id;
        var dateCreation = new Date;
        var mois = String(dateCreation.getMonth() + 1).padStart(2, '0');
        var annee = dateCreation.getFullYear();
        var jour = String(dateCreation.getDate()).padStart(2, '0');
        this._nom = nom;
        this._prix = prix;

        this.dateCreation = mois + '/' + jour + "/" + annee;
    }
}

class itemList {
    constructor() {
        this.tab = [];
    }
    add(item) {
        this.tab.push(item);
    }
    getLenght() {
        return this.tab.length;
    }
    removeItemById(id) {
        var index = this.tab.findIndex(a => a._id == id);
        if (index != -1) {
            this.tab.splice(index, 1);
            return 1;
        }
        else {
            return 0;
        }
    }

    removeByName(nom) {
        var index = this.tab.findIndex(x => x._nom == nom);
        if (index != -1) {
            this.tab.splice(index, 1);
            return 1;
        }
        else {
            return 0;
        }
    }

    getLastItemID() {
        return this.tab[this.tab.length - 1]._id
    }
}

module.exports = { Item, itemList };
