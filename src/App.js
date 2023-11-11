import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import HomePage from './homePage';
import SignUp from './SignUp';
import usersData from './users.json';
import ComputerProgramming from './board/ComputerProgramming/ComputerProgramming'
import Writer from'./board/ComputerProgramming/writer'
import Postview from'./board/ComputerProgramming/PostView'

function App() {
  const [users, setUsers] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  // 회원 가입 처리 함수
  const handleSignUp = (newUser) => {setUsers([...users, newUser]); setIsSignUpSuccess(true);};

  useEffect(() => { setUsers(usersData);}, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={authenticated ? (<HomePage />) : ( <Login Loginuser={setAuthenticated} users={users} />)}/>
          <Route path="/signup" element={isSignUpSuccess ? (<Login Loginuser={setAuthenticated} users={users} />) : (<SignUp onSignUp={handleSignUp} />)}/>
          <Route path ="/main" element={<HomePage />}></Route>
          <Route path="/ComputerProgramming" element = {<ComputerProgramming /> } />
          <Route path="/ComputerProgramming/writer" element = {<Writer /> } />
          <Route path="/ComputerProgramming/:idx" element = {<Postview /> } />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
