
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var settings = require('../config/settings');
var Sequelize = require('sequelize-sqlite').sequelize;
var sequelize = new Sequelize('database', 'name', 'username', {
    'dialect': 'sqlite',
    'storage': settings.database
});
var db = {};

// On scan tous les fichiers pour les ajouter dans l'ORM.
fs
    .readdirSync(__dirname)
    .filter(function(file){
        return (file.indexOf('.') !== 0 && (file != 'index.js'))
    })
    .forEach(function(file){
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName){
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
});

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);
