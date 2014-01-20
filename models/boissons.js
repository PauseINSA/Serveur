
module.exports = function(sequelize, DataTypes){
    var Boissons = sequelize.define('Boissons', {
        nom: DataTypes.STRING
    }, {
        associate: function(models){
            Boissons.hasMany(models.Machines);
        }
    });
    return Boissons;
};
