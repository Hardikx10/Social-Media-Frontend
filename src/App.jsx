import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SubmissionForm from './components/SubmissionForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 shadow-md">
          <div className="container mx-auto">
            <ul className="flex justify-between space-x-4 text-white">
              <li className="hover:underline">
                <Link to="/">Submission Form</Link>
              </li>
              <li className="hover:underline">
                <Link to="/admin">Admin Dashboard</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<SubmissionForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

