// src/App.js - النسخة الصحيحة للفرونت إند
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import BotList from './components/Bot/BotList';
import BotForm from './components/Bot/BotForm';
import Settings from './components/Settings/Settings';
import ApiSettings from './components/Settings/ApiSettings';
import Profile from './components/Settings/Profile';
import Header from './components/Common/Header';
import Sidebar from './components/Common/Sidebar';

// Actions
import { checkAuthState } from './store/actions/authActions';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

// Private route component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isAuthenticated && !loading && (
          <>
            <Header />
            <Sidebar />
          </>
        )}
        <div style={{ marginTop: isAuthenticated ? '64px' : '0', marginLeft: isAuthenticated ? '240px' : '0' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            <Route path="/bots" element={
              <PrivateRoute>
                <BotList />
              </PrivateRoute>
            } />
            
            <Route path="/bots/new" element={
              <PrivateRoute>
                <BotForm />
              </PrivateRoute>
            } />
            
            <Route path="/bots/:id" element={
              <PrivateRoute>
                <BotForm />
              </PrivateRoute>
            } />
            
            <Route path="/settings" element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            } />
            
            <Route path="/settings/api" element={
              <PrivateRoute>
                <ApiSettings />
              </PrivateRoute>
            } />
            
            <Route path="/settings/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;