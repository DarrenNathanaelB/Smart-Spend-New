const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db.config');
const expenseController = require('./src/controllers/expenseController');
const userController = require('./src/controllers/accountControllers');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
connectDB();

// CRUD operations for expenses
app.post('/addExpense', expenseController.addExpense);
app.get('/getExpenses', expenseController.getExpenses);
app.get('/getExpense/:id', expenseController.getExpenseById);
app.get('/getExpensesByCategory/:category', expenseController.getExpensesByCategory);
app.get('/getTotalExpense', expenseController.getTotalExpense);
app.put('/updateExpense/:id', expenseController.updateExpense);
app.delete('/deleteExpense/:id', expenseController.deleteExpense);

// CRUD operations for users
app.post('/register', userController.register);
app.post('/login', userController.login);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
