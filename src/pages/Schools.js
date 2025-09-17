import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  School,
  HelpCircle,
  LogOut,
  Bell,
  User,
  Wallet,
  Menu,
  X,
  Download,
  Plus
} from 'lucide-react';
import './Schools.css';

const Schools = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [downloadingSchoolId, setDownloadingSchoolId] = useState(null);

  const [schools, setSchools] = useState([
    { id: 1, name: 'Oakridge High', students: 1200, plan: 'Premium', expiry: '2024-12-31', email: 'oakridge.high@example.com', contact: '(555) 123-4567' },
    { id: 2, name: 'Maplewood Academy', students: 850, plan: 'Basic', expiry: '2024-08-15', email: 'maplewood.academy@example.com', contact: '(555) 987-6543' },
    { id: 3, name: 'Riverdale Prep', students: 1500, plan: 'Basic', expiry: '2025-03-20', email: 'riverdale.prep@example.com', contact: '(555) 456-7890' },
    { id: 4, name: 'Northwood School', students: 600, plan: 'Basic', expiry: '2024-11-01', email: 'northwood@example.com', contact: '(555) 111-2222' },
    { id: 5, name: 'Southgate College', students: 2000, plan: 'Basic', expiry: '2025-01-10', email: 'southgate@example.com', contact: '(555) 333-4444' },
    { id: 6, name: 'Westwood Institute', students: 1100, plan: 'Basic', expiry: '2024-09-22', email: 'westwood@example.com', contact: '(555) 222-3333' },
    { id: 7, name: 'Eastside Grammar', students: 950, plan: 'Premium', expiry: '2025-02-18', email: 'eastside@example.com', contact: '(555) 444-5555' },
    { id: 8, name: 'Central Academy', students: 700, plan: 'Basic', expiry: '2024-10-05', email: 'central@example.com', contact: '(555) 666-7777' },
    { id: 9, name: 'Greenfield High', students: 1300, plan: 'Premium', expiry: '2024-12-01', email: 'greenfield@example.com', contact: '(555) 888-9999' },
    { id: 10, name: 'Hillcrest School', students: 550, plan: 'Basic', expiry: '2024-07-20', email: 'hillcrest@example.com', contact: '(555) 000-1111' },
  ]);

  // Mock student data for each school
  const mockStudentsData = {
    1: [
      { id: 1, name: 'John Smith', grade: '10th', email: 'john.smith@oakridge.edu', contact: '(555) 111-2222' },
      { id: 2, name: 'Sarah Johnson', grade: '11th', email: 'sarah.j@oakridge.edu', contact: '(555) 222-3333' },
      { id: 3, name: 'Michael Brown', grade: '9th', email: 'michael.b@oakridge.edu', contact: '(555) 333-4444' },
    ],
    2: [
      { id: 1, name: 'Emily Davis', grade: '8th', email: 'emily.d@maplewood.edu', contact: '(555) 444-5555' },
      { id: 2, name: 'David Wilson', grade: '12th', email: 'david.w@maplewood.edu', contact: '(555) 555-6666' },
    ],
  };

  useEffect(() => {
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState !== null) {
      setIsSidebarExpanded(savedSidebarState === 'false');
    }
    
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode && JSON.parse(savedDarkMode)) {
      document.body.classList.add('dark-mode');
    }

    // Check for updated school data from EditSchool page
    if (location.state?.updatedSchool && location.state?.schoolId) {
      const { updatedSchool, schoolId } = location.state;
      setSchools(prevSchools => 
        prevSchools.map(school => 
          school.id === schoolId ? updatedSchool : school
        )
      );
      // Clear the state to prevent re-applying on refresh
      window.history.replaceState({}, document.title);
    }

    // Also check sessionStorage for updated school data
    const updatedSchoolData = sessionStorage.getItem('updatedSchool');
    if (updatedSchoolData) {
      const updatedSchool = JSON.parse(updatedSchoolData);
      setSchools(prevSchools => 
        prevSchools.map(school => 
          school.id === updatedSchool.id ? updatedSchool : school
        )
      );
      sessionStorage.removeItem('updatedSchool');
    }
  }, [location.state]);

  const [newSchool, setNewSchool] = useState({
    name: '',
    students: '',
    address: '',
    contact: '',
    teachers: '',
    schoolEmail: '',
    adminEmail: '',
    gstNumber: '',
    accountNumber: '',
    ifscCode: '',
    branch: '',
    plan: 'Basic',
    startDate: '',
    endDate: '',
  });

  const isExpired = (expiryDate) => {
    const today = new Date();
    return new Date(expiryDate) < today;
  };

  const filteredSchools = schools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === 'All' || school.plan === planFilter;
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Active' && !isExpired(school.expiry)) ||
      (statusFilter === 'Expired' && isExpired(school.expiry));
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const notifications = [
    { id: 1, message: 'New message from Principal about school event', time: '2 hours ago' },
    { id: 2, message: 'Parent-Teacher meeting scheduled for Oct 15', time: '1 day ago' },
  ];

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
    setNotificationDropdownOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
    setProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    setShowLogoutModal(false);
    window.location.href = '/login';
  };

  const handleSchoolClick = (school) => {
    navigate(`/schooldetail/${school.id}`, { state: { school } });
  };

  const handleCreateSchool = () => {
    if (!newSchool.name || !newSchool.plan || !newSchool.endDate) {
      alert('Please fill all required fields');
      return;
    }

    const newId = Math.max(...schools.map((school) => school.id), 0) + 1;

    const schoolToAdd = {
      id: newId,
      name: newSchool.name,
      students: newSchool.students ? parseInt(newSchool.students) : 0,
      plan: newSchool.plan,
      expiry: newSchool.endDate,
      email: newSchool.schoolEmail,
      contact: newSchool.contact,
    };

    setSchools([...schools, schoolToAdd]);
    setShowModal(false);
    setNewSchool({
      name: '',
      students: '',
      address: '',
      contact: '',
      teachers: '',
      schoolEmail: '',
      adminEmail: '',
      gstNumber: '',
      accountNumber: '',
      ifscCode: '',
      branch: '',
      plan: 'Basic',
      startDate: '',
      endDate: '',
    });
  };

  const handleNewSchoolChange = (e) => {
    const { name, value } = e.target;
    setNewSchool((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSidebar = () => {
    const newState = !isSidebarExpanded;
    setIsSidebarExpanded(newState);
    localStorage.setItem('sidebarCollapsed', (!newState).toString());
  };

  const handleDownloadReport = async (school, e) => {
    e.stopPropagation();
    setDownloadingSchoolId(school.id);
    
    try {
      // Using mock data for demonstration
      const studentData = mockStudentsData[school.id] || [];
      
      // Generate CSV content
      const csvContent = generateStudentReportCSV(school, studentData);
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${school.name.replace(/\s+/g, '_')}_Student_Report_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      alert(`Student report for ${school.name} downloaded successfully!`);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download student report. Please try again.');
    } finally {
      setDownloadingSchoolId(null);
    }
  };

  const generateStudentReportCSV = (school, students) => {
    // CSV header
    let csv = `School: ${school.name}\n`;
    csv += `Total Students: ${school.students}\n`;
    csv += `Subscription Plan: ${school.plan}\n`;
    csv += `Expiration Date: ${school.expiry}\n`;
    csv += `Contact Email: ${school.email}\n`;
    csv += `Contact Phone: ${school.contact}\n\n`;
    
    // Student data header
    csv += 'Student ID,Name,Grade,Email,Contact\n';
    
    // Student data rows
    students.forEach(student => {
      csv += `${student.id},${student.name},${student.grade},${student.email},${student.contact}\n`;
    });
    
    return csv;
  };

  return (
    <div className="container">
      <aside className={`sidebar ${isSidebarExpanded ? 'expanded' : 'compressed'}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarExpanded ? <X size={18} /> : <Menu size={18} />}
        </button>
        <Link to="/dashboard" className="sidebar-item">
          <LayoutDashboard size={18} />
          {isSidebarExpanded && <span>Dashboard</span>}
        </Link>
        <Link to="/schools" className="sidebar-item active">
          <School size={18} />
          {isSidebarExpanded && <span>Schools</span>}
        </Link>
        <Link to="/finance" className="sidebar-item">
          <Wallet size={18} />
          {isSidebarExpanded && <span>Finance</span>}
        </Link>
        <Link to="/support" className="sidebar-item">
          <HelpCircle size={18} />
          {isSidebarExpanded && <span>Support</span>}
        </Link>
        <div className="sidebar-item logout" onClick={() => setShowLogoutModal(true)}>
          <LogOut size={18} />
          {isSidebarExpanded && <span>Logout</span>}
        </div>
      </aside>

      <div 
        className="main-content"
        style={{ 
          marginLeft: isSidebarExpanded ? '220px' : '60px', 
          transition: 'margin-left 0.3s ease',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <header 
          className="header"
          style={{ 
            width: isSidebarExpanded ? 'calc(100% - 220px)' : 'calc(100% - 60px)',
            left: isSidebarExpanded ? '220px' : '60px',
            transition: 'all 0.3s ease',
            position: 'fixed',
            top: 0,
            zIndex: 1000
          }}
        >
          <h2>Schools</h2>
          <div className="header-right">
            <input
              type="text"
              className="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="icon-wrapper" onClick={toggleNotificationDropdown}>
              <Bell size={18} />
              {notifications.length > 0 && (
                <span className="notification-count">{notifications.length}</span>
              )}
              {notificationDropdownOpen && (
                <div className="notification-dropdown-box">
                  <div className="notification-header">
                    <h4>Notifications</h4>
                  </div>
                  <div className="notification-list">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div key={notification.id} className="notification-item">
                          <p className="notification-message">{notification.message}</p>
                          <p className="notification-time">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <p className="no-notifications">No new notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="user-info">
              <div
                className="user-avatar"
                onClick={toggleProfileDropdown}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <User size={16} />
                {profileDropdownOpen && (
                  <div className="profile-dropdown-box">
                    <div className="profile-header">
                      <h4>Sarah Johnson</h4>
                      <p>sarha.j@example.com</p>
                    </div>
                    <div className="profile-options">
                      <Link to="/settings" className="profile-option">
                        <span className="icon">
                          <i className="fas fa-cog"></i>
                        </span>{' '}
                        Settings
                      </Link>
                      {/* <Link to="/profilesetting" className="profile-option">
                        <span className="icon">
                          <i className="fas fa-edit"></i>
                        </span>{' '}
                        Edit
                      </Link> */}
                      <div
                        className="profile-option logout"
                        onClick={() => setShowLogoutModal(true)}
                      >
                        <span className="icon">
                          <i className="fas fa-sign-out-alt"></i>
                        </span>{' '}
                        Log out
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <span className="user-name">Super Admin</span>
            </div>
          </div>
        </header>

        <div 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            paddingTop: '80px' 
          }}
        >
          <div className="schools-container">
            <div className="schools-header" style={{ marginTop: '-70px' }}>
              <h2>Schools</h2>
              <button className="add-student-btn" onClick={() => setShowModal(true)}>
                <Plus size={16} />
                Add School
              </button>
            </div>

            <div className="schools-filters">
              <input
                type="text"
                placeholder="🔍 Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
              >
                <option value="All">All Plans</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <table className="schools-table">
              <thead>
                <tr>
                  <th>School Name</th>
                  <th>Number of Students</th>
                  <th>Subscription Plan</th>
                  <th>Expiration Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((school) => (
                  <tr
                    key={school.id}
                    onClick={() => handleSchoolClick(school)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{school.name}</td>
                    <td>{school.students}</td>
                    <td>
                      <span className={`badge ${school.plan.toLowerCase()}`}>
                        {school.plan}
                      </span>
                    </td>
                    <td>{school.expiry}</td>
                    <td>
                      <button
                        className="download-btn"
                        onClick={(e) => handleDownloadReport(school, e)}
                        disabled={downloadingSchoolId === school.id}
                      >
                        {downloadingSchoolId === school.id ? (
                          'Downloading...'
                        ) : (
                          <>
                            <Download size={14} style={{ marginRight: '5px' }} />
                            Download
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add School Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content-wide">
              <div className="modal-header-wide">
                <h3>Add New School</h3>
                <button onClick={() => setShowModal(false)} className="close-btn">
                  <X size={20} />
                </button>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>School Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={newSchool.name}
                    onChange={handleNewSchoolChange}
                    placeholder="Enter school name"
                  />
                </div>
                <div className="form-group">
                  <label>Number of Students</label>
                  <input
                    type="number"
                    name="students"
                    value={newSchool.students}
                    onChange={handleNewSchoolChange}
                    placeholder="Enter number of students"
                  />
                </div>
                <div className="form-group">
                  <label>School Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newSchool.address}
                    onChange={handleNewSchoolChange}
                    placeholder="Enter school address"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number (Admin)</label>
                  <input
                    type="text"
                    name="contact"
                    value={newSchool.contact}
                    onChange={handleNewSchoolChange}
                    placeholder="Enter contact number"
                  />
                </div>
                <div className="form-group">
                  <label>Number of Teachers</label>
                  <input
                    type="number"
                    name="teachers"
                    value={newSchool.teachers}
                    onChange={handleNewSchoolChange}
                    placeholder="Enter number of teachers"
                  />
                </div>
                <div className="form-group">
                  <label>School Email ID</label>
                  <input
                    type="email"
                    name="schoolEmail"
                    value={newSchool.schoolEmail}
                    onChange={handleNewSchoolChange}
                    placeholder="Enter school email"
                  />
                </div>
                <div className="form-group">
                  <label>Admin Email ID</label>
                  <input
                    type="email"
                    name="adminEmail"
                    value={newSchool.adminEmail}
                    onChange={handleNewSchoolChange}
                    placeholder="Enter admin email"
                  />
                </div>
                <div className="form-group">
                  <label>GST Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={newSchool.gstNumber}
                    onChange={handleNewSchoolChange}
                    placeholder="Enter GST number"
                  />
                </div>
                <div className="form-group">
                  <label>Bank Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={newSchool.accountNumber}
                    onChange={handleNewSchoolChange}
                    placeholder="Enter account number"
                  />
                </div>
                <div className="form-group">
                  <label>IFSC Code</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={newSchool.ifscCode}
                    onChange={handleNewSchoolChange}
                    placeholder="Enter IFSC code"
                  />
                </div>
                <div className="form-group">
                  <label>Branch</label>
                  <input
                    type="text"
                    name="branch"
                    value={newSchool.branch}
                    onChange={handleNewSchoolChange}
                    placeholder="Enter branch name"
                  />
                </div>
                <div className="form-group">
                  <label>Subscription Plan *</label>
                  <select
                    name="plan"
                    value={newSchool.plan}
                    onChange={handleNewSchoolChange}
                    className="form-select"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={newSchool.startDate}
                    onChange={handleNewSchoolChange}
                  />
                </div>
                <div className="form-group">
                  <label>End Date *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={newSchool.endDate}
                    onChange={handleNewSchoolChange}
                  />
                </div>
              </div>
              <div className="modal-actions-wide">
                <button onClick={() => setShowModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={handleCreateSchool} className="submit-btn">
                  Add School
                </button>
              </div>
            </div>
          </div>
        )}

        {showLogoutModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-icon">
                <LogOut size={32} color="red" />
              </div>
              <h2>Are you sure you want to logout?</h2>
              <p>You will need to log in again to access your dashboard.</p>
              <div className="modal-actions">
                <button
                  className="btn cancel"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button className="btn logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schools;