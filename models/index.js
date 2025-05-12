const { Sequelize } = require('sequelize');
const EmployeeMastModel = require('./EmployeeMast');
const AssetTransferRegisterModel = require('./AssetTransferRegister');

// Hardcoded Sequelize instance
const sequelize = new Sequelize({
  username: 'arpandaskr',
  password: 'Arpan@123',
  database: 'AlnabaITAdmin',
  host: 'ARPAN\\SQLEXPRESS',
  port: 3400, // Change to 1433 if that's the correct port
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false, // For local development
      trustServerCertificate: true
    }
  },
  logging: console.log // Logs all SQL queries to the console
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.AssetTransferRegister = require('./AssetTransferRegister')(sequelize, Sequelize);
db.EmployeeMast = EmployeeMastModel(sequelize, Sequelize.DataTypes);
db.Asset_Master = require('./Asset_Master')(sequelize, Sequelize);
db.Issue_Register = require('./Issue_Register')(sequelize, Sequelize);

module.exports = db;
