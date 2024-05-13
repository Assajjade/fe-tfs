import React from 'react';
import './App.css';
import { getApp } from './utils/helpers';
import AppRouter from './routers/AppRouter';
import OrganizerRouter from './routers/OrganizerRouter';
import { AuthProvider } from './context/authContext'; // Adjust the import path as needed

function App() {
  const CurrentApp = getApp();

  return (
    <div className="App">
      <AuthProvider>
        {CurrentApp ? <AppRouter /> : <OrganizerRouter />}
      </AuthProvider>
    </div>
  );
}

export default App;
