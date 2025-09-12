import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Menu, X } from 'lucide-react';
import {
  LayoutDashboard,
  School,
  HelpCircle,
  LogOut,
  Bell,
  User,
  Wallet,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import './SchoolDetail.css';

const SchoolDetail = () => {
  const navigate = useNavigate();
  const { schoolId } = useParams();
  const { state } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [studentsWithPlanCount, setStudentsWithPlanCount] = useState(0);
  
  const handleEditSchool = () => {
    if (!currentSchool) return;
    
    navigate(`/editschool/${schoolId}`, {
      state: {
        school: currentSchool
      }
    });
  };
  
  useEffect(() => {
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState !== null) {
      setIsSidebarExpanded(savedSidebarState === 'false');
    }

    // If school data is passed via state, use it
    if (state?.school) {
      setCurrentSchool(state.school);
    } else {
      // If not, fetch the school data based on schoolId
      fetchSchoolData(schoolId);
    }
    
    // Fetch students data for this school to count how many have plans
    fetchStudentsData(schoolId);
  }, [schoolId, state]);

  // Mock function to fetch school data - replace with actual API call
  const fetchSchoolData = (id) => {
    // This is a mock data fetch - in a real app, you would make an API call here
    const mockSchools = [
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
    ];

    const school = mockSchools.find(s => s.id === parseInt(id));
    if (school) {
      setCurrentSchool(school);
    } else {
      setCurrentSchool({
        id: schoolId,
        name: 'School Not Found',
        email: 'N/A',
        contact: 'N/A',
        plan: 'N/A',
        expiry: 'N/A',
        students: 0,
      });
    }
  };

  // Mock function to fetch students data - replace with actual API call
  const fetchStudentsData = (schoolId) => {
    // Mock students data - in a real app, you would make an API call here
    const mockStudents = {
      1: [
        { id: 1, schoolId: 1, name: 'Ethan Carter', plan: 'Premium', class: 'Grade 10 / A', expiry: '2024-08-15' },
        { id: 2, schoolId: 1, name: 'Olivia Bennett', plan: 'Basic', class: 'Grade 9 / B', expiry: '2024-07-20' },
        { id: 3, schoolId: 1, name: 'Noah Thompson', plan: 'Basic', class: 'Grade 11 / C', expiry: '2024-09-05' },
      ],
      2: [
        { id: 4, schoolId: 2, name: 'Ava Rodriguez', plan: 'Premium', class: 'Grade 12 / A', expiry: '2024-06-30' },
        { id: 5, schoolId: 2, name: 'James Smith', plan: 'Basic', class: 'Grade 8 / A', expiry: '2024-12-10' },
      ],
      3: [
        { id: 6, schoolId: 3, name: 'Sophia Davis', plan: 'Basic', class: 'Grade 7 / B', expiry: '2024-10-21' },
      ],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
    };

    const students = mockStudents[schoolId] || [];
    // Count students who have a plan (not empty or null)
    const count = students.filter(student => student.plan && student.plan !== 'None').length;
    setStudentsWithPlanCount(count);
  };

  const handleTotalStudentsClick = () => {
    if (!currentSchool) return;
    
    navigate(`/studentlist/${schoolId}`, {
      state: {
        schoolId,
        schoolName: currentSchool.name,
        totalStudents: currentSchool.students,
        studentsWithPlanCount: studentsWithPlanCount,
      },
    });
  };

  const handleViewSupportTickets = () => {
    if (!currentSchool) return;
    
    navigate(`/supportticket/${schoolId}`, {
      state: {
        schoolId,
        schoolName: currentSchool.name,
      },
    });
  };

  const handleRenewSubscription = () => {
    if (!currentSchool) return;
    
    navigate(`/renewsubscription/${schoolId}`, {
      state: {
        school: currentSchool
      }
    });
  };

  // Show loading state while fetching school data
  if (!currentSchool) {
    return (
      <div className="container">
        <div className="loading">Loading school data...</div>
      </div>
    );
  }

  const activityData = [
    { month: 'Jan', students: 200 },
    { month: 'Feb', students: 180 },
    { month: 'Mar', students: 220 },
    { month: 'Apr', students: 210 },
    { month: 'May', students: 250 },
    { month: 'Jun', students: 190 },
    { month: 'Jul', students: 240 },
  ];

  const improvementsData = [
    { subject: 'Math', value: 90 },
    { subject: 'Science', value: 60 },
    { subject: 'English', value: 75 },
    { subject: 'History', value: 40 },
    { subject: 'Arts', value: 30 },
    { subject: 'PE', value: 95 },
  ];

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

  const toggleSidebar = () => {
    const newState = !isSidebarExpanded;
    setIsSidebarExpanded(newState);
    localStorage.setItem('sidebarCollapsed', (!newState).toString());
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
                      <Link to="/profilesetting" className="profile-option">
                        <span className="icon">
                          <i className="fas fa-edit"></i>
                        </span>{' '}
                        Edit
                      </Link>
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
          <div className="back-button" onClick={() => navigate('/schools')} style={{ marginTop: '-60px' }}>
            <ChevronLeft size={18} />
          </div>

          <div className="dashboard-container">
            <div style={{ marginTop: '-25px' }}>
              <h1 className="dashboard-title">{currentSchool.name}</h1>
              <p className="dashboard-subtitle">
                Email: {currentSchool.email} | Contact: {currentSchool.contact} | Plan:{' '}
                {currentSchool.plan} | Expires: {currentSchool.expiry}
              </p>
            </div>

            <div className="stats-grids">
              <div
                className="stat-cards"
                onClick={handleTotalStudentsClick}
                style={{ cursor: 'pointer' }}
              >
                <p className="stat-label">Students with Plan</p>
                <h2 className="stat-value">{studentsWithPlanCount.toLocaleString()}</h2>
                <p className="stat-sub">of {currentSchool.students.toLocaleString()} total students</p>
              </div>
              <div className="stat-cards">
                <p className="stat-label">Last Year's Growth</p>
                <h2 className="stat-value growth">+15%</h2>
              </div>
            </div>

            <h2 className="section-title">Data Visualizations</h2>
            <div className="charts-grid">
              <div className="chart-card">
                <h3 className="chart-title">Subscription Plan Usage</h3>
                <h2 className="chart-value">60%</h2>
                <p className="chart-sub">Current</p>
                <div className="bar-group">
                  <div className="bar-item">
                    <div className="bar premium"></div>
                    <span className="bar-label">Premium</span>
                  </div>
                  <div className="bar-item">
                    <div className="bar basic"></div>
                    <span className="bar-label">Basic</span>
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3 className="chart-title">Student Activity Last 12 Months</h3>
                <h2 className="chart-value">1,250</h2>
                <p className="chart-sub">Last 12 Months</p>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis hide />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="students"
                        stroke="#6B46C1"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card">
                <h3 className="chart-title">Students Improvements</h3>
                <h2 className="chart-value">800</h2>
                <p className="chart-sub">Last 12 Months</p>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={improvementsData} margin={{ left: 50 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="subject" type="category" tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6B46C1" radius={[5, 5, 5, 5]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="actions-section">
              <h2 className="section-title">Actions</h2>
              <p className="actions-sub">
                View and manage all communication logs and notes related to {currentSchool.name}.
              </p>
              <div className="actions-buttons">
              <button className="action-btn" onClick={handleEditSchool}>Edit School Info</button>
                <button className="action-btn" onClick={handleViewSupportTickets}>View Support Tickets</button>
                <button className="action-btn" onClick={handleRenewSubscription}>Renew Subscription</button>
              </div>
            </div>
          </div>
        </div>

        {showLogoutModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-icon">
                <LogOut size={32} color="red" />
              </div>
              <h2>Are you sure you want to logout?</h2>
              <p>You will need to log in again to access your dashboard.</p>
              <div className="modal-actions">
                <button className="btn cancel" onClick={() => setShowLogoutModal(false)}>
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

export default SchoolDetail;