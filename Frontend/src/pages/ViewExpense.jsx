// src/pages/ViewExpense.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

function ViewExpense() {
    const { id } = useParams();
    const [expense, setExpense] = useState(null);

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await axios.get(`/getExpense/${id}`);
                setExpense(response.data);
            } catch (error) {
                console.error('Error fetching expense:', error);
            }
        };

        fetchExpense();
    }, [id]);

    if (!expense) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gradient-to-r from-indigo-800 to-purple-900 min-h-screen text-white p-4">
            <h1 className="text-2xl font-bold mb-4">Expense Details</h1>
            <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-white font-bold mb-1">Title: {expense.title}</p>
                <p className="text-sm text-gray-400">Description: {expense.description}</p>
                <p className="text-sm text-gray-400">Categories: {expense.categories}</p>
                <p className="text-sm text-gray-400">Date: {new Date(expense.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-400">Amount: Rp.{expense.amount}</p>
            </div>
        </div>
    );
}

export default ViewExpense;