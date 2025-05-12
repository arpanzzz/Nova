const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('AlnabaITAdmin', 'arpandaskr', 'Arpan@123', {
  host: 'ARPAN\\SQLEXPRESS', // Replace with your host and server details
  dialect: 'mssql', // Dialect for SQL Server
  port: 3400, // Replace with the correct port
  dialectOptions: {
    encrypt: false, // Set to true if encryption is needed
  },
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function syncDatabase() {
    try {
      // Sync models with the database (do not use force: true in production unless necessary)
      await sequelize.sync({ force: false });
      console.log('Database synced successfully');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }
  
syncDatabase();
testConnection();

module.exports = sequelize;
