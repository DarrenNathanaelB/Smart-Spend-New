import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState('');
    const [date, setDate] = useState('');

    const handleAddExpense = async () => {
        try {
            const newExpense = {
                title: title,
                amount: amount,
                description: description,
                categories: categories,
                date: date,
            };
            await axios.post('/addExpense', newExpense);
            navigate('/');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-800 to-purple-900 min-h-screen">
            <div className="text-xl font-bold mb-4 text-center text-white mt-4">Add Expense</div>
            <div className="flex justify-center">
                <div className="bg-gray-800 rounded-lg p-4 w-full max-w-md">
                    <div className="mb-4">
                        <label htmlFor="title" className="text-white font-bold">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="text-white font-bold">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="text-white font-bold">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categories" className="text-white font-bold">Categories</label>
                        <input
                            type="text"
                            id="categories"
                            value={categories}
                            onChange={(e) => setCategories(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="text-white font-bold">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <button
                        onClick={handleAddExpense}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                        Add Expense
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddExpense;
