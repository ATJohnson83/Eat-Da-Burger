module.exports = function(sequelize, DataTypes) {
  var Daburger = sequelize.define("Daburger", {
    name: DataTypes.STRING,
    devour: DataTypes.BOOLEAN
  });
  return Daburger;
};