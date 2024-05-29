const account = require('../models/Account.models');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newAccount = new account({
            username,
            password,
        });
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await account.findOne({ username, password });    
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}     
