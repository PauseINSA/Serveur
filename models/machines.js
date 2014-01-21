
module.exports = function(sequelize, DataTypes){
    var Machines = sequelize.define('Machines', {
        description:    DataTypes.STRING,
        qrcode:         DataTypes.STRING,
        coords:         DataTypes.STRING,
        type:           DataTypes.ENUM('cafe', 'canette'),
        status:         DataTypes.BOOLEAN
    }, {
        associate: function(models){
            Machines.belongsTo(models.Batiments);
        }
    });
    return Machines;
};
