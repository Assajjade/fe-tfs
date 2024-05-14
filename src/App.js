import React from 'react';
import './App.css';
import { getApp } from './utils/helpers';
import AppRouter from './routers/AppRouter';
import OrganizerRouter from './routers/OrganizerRouter';
import { AuthProvider } from './context/authContext'; // Adjust the import path as needed
import { useLocation } from 'react-router-dom';

function App() {
  const CurrentApp = getApp();
  const location = useLocation();
  
  // Check if the current route path contains '/organizer'
  const isOrganizerRoute = location.pathname.includes('/organizer');
  console.log(isOrganizerRoute)

  return (
    <div className="App">
      <AuthProvider>
        {isOrganizerRoute ? <OrganizerRouter /> : <AppRouter />}
      </AuthProvider>
    </div>
  );
}

export default App;
