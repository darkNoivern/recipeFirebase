import React, { useState } from 'react';
import Navbar from './Navbar';
import Chat from './Chat';
import Recipe from './Recipe';
import SignIn from './SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Leaderboard from './Leaderboard';

const Index = () => {
    const substituteData = useSelector(state => state);
    const [user, setUser] = useState(substituteData.loggedin)

    const toggleUser = (set) => {
        setUser(set)
    }

    return (
        <>
            <Router>
                <Navbar user={user} toggleUser={toggleUser}/>
                <Routes>
                    <Route path="/" element={user===true ? <Recipe /> : <SignIn toggleUser={toggleUser} />} />
                    <Route exact path="/chat" element={user===true ? <Chat /> : <SignIn toggleUser={toggleUser} />} />  
                    <Route exact path="/leaderboard" element={user===true ? <Leaderboard /> : <SignIn toggleUser={toggleUser} />} />  
                    <Route exact path="/signin" element={<SignIn toggleUser={toggleUser} />} />    
                </Routes>
            </Router>
        </>
    );
};

export default Index;
