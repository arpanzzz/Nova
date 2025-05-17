require('dotenv').config();
const sequelize = require('./sequelize');
sequelize.sync({ force: false }) // Sync the database (do not use force: true in production unless necessary)
const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth'); // Import the login and auth-related logic
const tablesRoute = require('./routes/tables');// Import the users route for admin (protected)
const manageEmployee = require('./routes/manageEmployee'); // Import the update table route
const manageVendors = require('./routes/manageVendor'); // Import the vendors route
const manageCompany = require('./routes/manageCompany'); // Import the company route
const manageDepartment = require('./routes/manageDepartment'); // Import the department route
const manageCustomer = require('./routes/manageCustomer'); // Import the customer route
const manageAsset = require('./routes/manageAsset'); // Import the asset route
const manageIssueRegister = require('./routes/manageIssueRegister'); // Import the issue register route
const manageAssetTransfer = require('./routes/manageAssetTransfer'); // Import the asset transfer route
const manageCallLog = require('./routes/manageCallLog'); // Import the call log route
const manageUser = require('./routes/manageUser'); // Import the user route
const TransferAssetFunction = require('./routes/transferAssetFunction'); // Import the transfer asset function route
const utils = require('./routes/utils'); // Import the utils route
const register  = require('./register'); // Import the register route
const services = require('./routes/manageServices'); // Import the services route
const support = require('./routes/manageSupport'); // Import the support route

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

app.post('/login', authRoutes); // Login route for authentication
app.post('/register', register); // Login route for authentication
app.use('/protected', tablesRoute);  // Users route for admin (protected)
app.use('/manage-employees', manageEmployee); // Route for updating the table
app.use('/manage-vendors', manageVendors); // Route for getting the tables
app.use('/manage-company', manageCompany); // Route for getting the tables
app.use('/manage-department', manageDepartment); // Route for getting the tables
app.use('/manage-customer', manageCustomer); // Route for getting the tables
app.use('/manage-asset', manageAsset); // Route for getting the tables
app.use('/manage-issue-register', manageIssueRegister); // Route for getting the tables
app.use('/manage-asset-transfer', manageAssetTransfer); // Route for getting the tables
app.use('/manage-call-log', manageCallLog); // Route for getting the tables
app.use('/manage-user', manageUser); // Route for getting the tables
app.use('/transfer-asset-function', TransferAssetFunction); // Route for getting the tables
app.use('/manage-services', services); // Route for getting the tables
app.use('/utils', utils); // Route for getting the tables
app.use('/manage-support', support); // Route for getting the tables


// Start the server
app.listen(PORT, () => {
  console.log(`🟢 Server running at http://localhost:${PORT}`);
});
