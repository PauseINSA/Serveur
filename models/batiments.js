
module.exports = function(sequelize, DataTypes){
    var Batiments = sequelize.define('Batiments', {
        nom: DataTypes.STRING
    });
    return Batiments;
};
