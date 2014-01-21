
module.exports = function(sequelize, DataTypes){
    var Boissons = sequelize.define('Boissons', {
        nom: DataTypes.STRING,
        status: DataTypes.BOOLEAN
    }, {
        associate: function(models) {
            Boissons.belongsTo(models.Machines);
        }
    });
    return Boissons;
};
