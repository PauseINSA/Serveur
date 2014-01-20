
module.exports = function(sequelize, DataTypes){
    var Machines = sequelize.define('Machines', {
        qrcode: DataTypes.STRING,
        coords: DataTypes.STRING,
        type:   DataTypes.ENUM('cafe', 'canette'),
        status: DataTypes.BOOLEAN
    }, {
        associate: function(models){
            Machines.belongsTo(models.Batiments);
            Machines.hasMany(models.Boissons);
        }
    });
    return Machines;
};
