import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="flex h-screen w-full bg-pageBg overflow-hidden text-textPrimary">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
