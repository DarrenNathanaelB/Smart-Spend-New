// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import UpdateExpense from './pages/UpdateExpense';
import Login from "./pages/login";
import Register from "./pages/register";
import ViewExpense from './pages/ViewExpense';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(loggedInStatus);
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/addExpense"
                    element={isLoggedIn ? <AddExpense /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/updateExpense/:id"
                    element={isLoggedIn ? <UpdateExpense /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/viewExpense/:id"
                    element={isLoggedIn ? <ViewExpense /> : <Navigate to="/login" replace />}
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;