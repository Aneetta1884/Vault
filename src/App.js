import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Schools from './pages/Schools';
import Support from './pages/Support';
import Finance from './pages/Finance';
import SchoolDetail from './pages/SchoolDetail';
import StudentList from './pages/StudentList';
import SupportTicket from './pages/SupportTicket';
import RenewSubscription from './pages/RenewSubscription';
import EditSchoool from './pages/EditSchool';
function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/support" element={<Support />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/schooldetail/:schoolId" element={<SchoolDetail />} />
          <Route path="/studentlist/:schoolId" element={<StudentList />} />
          <Route path="/supportticket/:schoolId" element={<SupportTicket />} />
          <Route path="/renewsubscription/:schoolId" element={<RenewSubscription />} />
          <Route path="/editschool/:schoolId" element={<EditSchoool />} />


        </Routes>
      
    </Router>
  );
}

export default App;