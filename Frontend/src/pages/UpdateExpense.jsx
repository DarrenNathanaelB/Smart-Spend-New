import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateExpense = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expense, setExpense] = useState(null);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState('');
    const [date, setDate] = useState('');
    const [isFormDirty, setIsFormDirty] = useState(false);

    useEffect(() => {
        fetchExpense();
    }, []);

    useEffect(() => {
        if (expense) {
            const isDirty =
                title !== expense.title ||
                amount !== expense.amount ||
                description !== expense.description ||
                categories !== expense.categories ||
                date !== expense.date;
            setIsFormDirty(isDirty);
        }
    }, [title, amount, description, categories, date, expense]);

    const fetchExpense = async () => {
        try {
            const response = await axios.get(`/getExpense/${id}`);
            const expenseData = response.data;
            setExpense(expenseData);
            setTitle(expenseData.title);
            setAmount(expenseData.amount);
            setDescription(expenseData.description);
            setCategories(expenseData.categories);
            setDate(expenseData.date);
            setIsFormDirty(false);
        } catch (error) {
            console.error('Error fetching expense:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedExpense = {
                title,
                amount,
                description,
                categories,
                date,
            };
            await axios.put(`/updateExpense/${id}`, updatedExpense);
            navigate('/');
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-800 to-purple-900 min-h-screen">
            <div className="text-xl font-bold mb-4 text-center text-white mt-4">Update Expense</div>
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
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        disabled={!isFormDirty}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateExpense;
