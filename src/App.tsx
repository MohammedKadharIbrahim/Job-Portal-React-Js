
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './features/auth/signup';
import Login from './features/auth/login';
import ProtectedRoute from './features/auth/ProtectedRoute';
import JobList from './components/joblist';
import { Profile } from './components/Profile';

import { Message } from './components/message';
import { MyJobs } from './components/myJobs';
import ApplyJob from './components/applyjob';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/joblist" 
          element={
            <ProtectedRoute>
              <JobList />
            </ProtectedRoute>
          } 
        />
       <Route path="/applyjob/:jobId" element={<ApplyJob />} />

        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/message" 
          element={
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/myjob" 
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
