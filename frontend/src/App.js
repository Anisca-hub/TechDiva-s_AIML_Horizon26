import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TrafficPrediction from './components/TrafficPrediction';
import DeparturePlanning from './components/DeparturePlanning';
import ParkingIntelligence from './components/ParkingIntelligence';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/traffic" element={<TrafficPrediction />} />
            <Route path="/departure" element={<DeparturePlanning />} />
            <Route path="/parking" element={<ParkingIntelligence />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
