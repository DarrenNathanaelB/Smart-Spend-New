const Expense = require('../models/Expense.models');

// Tambahkan pengeluaran baru
exports.addExpense = async (req, res) => {
    try {
        const { title, amount, description, categories, date } = req.body;
        const expense = new Expense({
            title,
            amount,
            description,
            categories,
            date,
        });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Dapatkan semua pengeluaran
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Dapatkan pengeluaran berdasarkan ID
exports.getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Dapatkan pengeluaran berdasarkan kategori
exports.getExpensesByCategory = async (req, res) => {
    try {
        const expenses = await Expense.find({ categories: req.params.category });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Dapatkan total pengeluaran
exports.getTotalExpense = async (req, res) => {
    try {
        const totalAmount = await Expense.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        res.status(200).json({ total: totalAmount[0]?.total || 0 });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Perbarui pengeluaran
exports.updateExpense = async (req, res) => {
    try {
        const { title, amount, description, categories, date } = req.body;
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { title, amount, description, categories, date },
            { new: true }
        );
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Hapus pengeluaran
exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};