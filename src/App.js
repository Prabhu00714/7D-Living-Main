// App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp'; // Import SignUp component
import CustomScrollbar from 'react-custom-scrollbars';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <CustomScrollbar style={{ width: '100%', height: '100vh' }}>
        <Routes>
          {/* Home route */}
          <Route
            exact
            path="/"
            element={
              <div>
                <Link to="/login" style={{ position: 'absolute', top: '10px', right: '10px', textDecoration: 'none' }}>
                  <button>Login</button>
                </Link>
                <Home />
              </div>
            }
          />

          {/* Login route */}
          <Route path="/login" element={<Login />} />

          {/* SignUp route */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </CustomScrollbar>
    </div>
  );
}

export default App;
