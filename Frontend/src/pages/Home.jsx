import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3001';

function Home() {
    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        checkLoginStatus();
        fetchExpenses();
        fetchTotalExpense();
    }, []);

    const checkLoginStatus = () => {
        // Assuming you store login status in local storage or cookies
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    };

    const fetchExpenses = async () => {
        try {
            let url = '/getExpenses';
            if (selectedCategory) {
                url = `/getExpensesByCategory/${selectedCategory}`;
            }
            const response = await axios.get(url);
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const fetchTotalExpense = async () => {
        try {
            const response = await axios.get('/getTotalExpense');
            setTotalExpense(response.data.total);
        } catch (error) {
            console.error('Error fetching total expense:', error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`/deleteExpense/${id}`);
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const handleMarkAsDone = async (id) => {
        try {
            await deleteExpense(id);
            window.location.reload();
        } catch (error) {
            console.error('Error marking expense as done:', error);
        }
    };

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleFilter = () => {
        fetchExpenses();
    };

    return (
        <div className="bg-gradient-to-r from-indigo-800 to-purple-900 min-h-screen">
            <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold">Smart Spend</div>
                <div className="flex space-x-4">
                    <Link to="/addExpense" className="hover:text-gray-400">Add Expense</Link>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
                    ) : (
                        <Link to="/login" className="hover:text-gray-400">Login</Link>
                    )}
                </div>
            </nav>
            <div className="text-xl font-bold mb-4 text-center text-white mt-4">Track Your Expenses!</div>
            <div className="text-lg font-bold text-center text-white">Total Expense: Rp.{totalExpense}</div>
            <div className="flex items-center justify-center mt-4">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none mr-2"
                >
                    <option value="">All Expenses</option>
                    <option value="Makan">Makan</option>
                    <option value="Kuliah">Kuliah</option>
                    <option value="Hiburan">Hiburan</option>
                    <option value="Transportasi">Transportasi</option>
                    <option value="Perlengkapan">Perlengkapan</option>
                </select>
                <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">Filter</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {expenses.map((expense) => (
                    <div key={expense._id} className="bg-gray-800 rounded-lg p-4 transition duration-300 ease-in-out transform hover:bg-gray-700 hover:scale-105">
                        <div>
                            <div className="text-sm text-white font-bold mb-1">{expense.title}</div>
                            <p className="text-sm text-gray-400">Description: {expense.description}</p>
                            <p className="text-sm text-gray-400">Date: {expense.date}</p>
                            <p className="text-sm text-gray-400">Amount: Rp.{expense.amount}</p>
                            <div className="flex justify-between mt-2">
                                <button onClick={() => handleMarkAsDone(expense._id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Delete</button>
                                <Link to={`/updateExpense/${expense._id}`} className="bg-green-500 text-white px-4 py-2 rounded-lg">Update</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
