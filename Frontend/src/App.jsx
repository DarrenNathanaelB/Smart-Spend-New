import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import UpdateExpense from './pages/UpdateExpense';
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddExpense" element={<AddExpense />} />
            <Route path="/UpdateExpense/:id" element={<UpdateExpense />} />
            <Route path="/" element={<AddExpense />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        </Router>
    );
}

export default App;