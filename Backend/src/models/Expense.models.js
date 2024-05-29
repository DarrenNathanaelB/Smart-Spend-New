const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categories: { 
        type: String, 
        required: true, 
        enum: ['Makan', 'Kuliah', 'Hiburan', 'Transportasi', 'Perlengkapan'] },
    date: {
        type: Date,
        required: true,
    },
});

const expense = mongoose.model('Expense', expenseSchema);

module.exports = expense;