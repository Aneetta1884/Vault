import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
} from "recharts";
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState !== null) {
      setIsSidebarExpanded(savedSidebarState === 'false');
    }
  }, []);

  // Dummy data
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 5200 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 2000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2500 },
    { month: "Apr", revenue: 3500 },
    { month: "May", revenue: 4000 },
    { month: "Jun", revenue: 6000 },
    { month: "Jul", revenue: 4500 },
    { month: "Aug", revenue: 7000 },
    { month: "Sep", revenue: 5000 },
    { month: "Oct", revenue: 5500 },
    { month: "Nov", revenue: 6000 },
    { month: "Dec", revenue: 6200 },
  ];

  const subscriptionData = [
    { plan: "Basic", users: 400 },
    { plan: "Premium", users: 600 },
  ];

  // Sample notifications data
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
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    const newState = !isSidebarExpanded;
    setIsSidebarExpanded(newState);
    localStorage.setItem('sidebarCollapsed', (!newState).toString());
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarExpanded ? 'expanded' : 'compressed'}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarExpanded ? <X size={18} /> : <Menu size={18} />}
        </button>
        <Link to="/dashboard" className="sidebar-item active">
          <LayoutDashboard size={18} />
          {isSidebarExpanded && <span>Dashboard</span>}
        </Link>
        <Link to="/schools" className="sidebar-item">
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

      {/* Main Content */}
      <div 
        className="main-content"
        style={{ marginLeft: isSidebarExpanded ? '220px' : '60px', transition: 'margin-left 0.3s ease' }}
      >
        <header className="header">
          <h2>Dashboard</h2>
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
                      notifications.map(notification => (
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
                        <span className="icon"><i className="fas fa-cog"></i></span> Settings
                      </Link>
                      <Link to="/profilesetting" className="profile-option">
                        <span className="icon"><i className="fas fa-edit"></i></span> Edit
                      </Link>
                      <div className="profile-option logout" onClick={() => setShowLogoutModal(true)}>
                        <span className="icon"><i className="fas fa-sign-out-alt"></i></span> Log out
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <span className="user-name">Super Admin</span>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          <div className="stats-container">
            <div className="stat-card">
              <p className="stat-title">Total Schools</p>
              <h2 className="stat-value">1,250</h2>
              <span className="stat-change">+10%</span>
            </div>

            <div className="stat-card">
              <p className="stat-title">Total Students</p>
              <h2 className="stat-value">45,000</h2>
              <span className="stat-change">+5%</span>
            </div>

            <div className="stat-card">
              <p className="stat-title">Total Sales</p>
              <h2 className="stat-value">15,000</h2>
              <span className="stat-change">+8%</span>
            </div>

            <div className="stat-card wide">
              <p className="stat-title">Total Revenue</p>
              <h2 className="stat-value">$2,500,000</h2>
              <span className="stat-change">+12%</span>
            </div>
          </div>

          <div className="analytics-container">
            {/* Subscription Distribution */}
            <div className="analytics-card">
              <p className="card-title">Subscription Plan Distribution</p>
              <h2 className="card-value">60%</h2>
              <p className="card-subtext">
                Current <span className="positive">+10%</span>
              </p>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={subscriptionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="plan" />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Total Sales Last Year */}
            <div className="analytics-card">
              <p className="card-title">Total Sales Last year</p>
              <h2 className="card-value">15,000</h2>
              <p className="card-subtext">
                <span className="positive">+8%</span>
              </p>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis hide />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Growth */}
            <div className="analytics-card full-width">
              <p className="card-title">Revenue Growth</p>
              <h2 className="card-value">$2,500,000</h2>
              <p className="card-subtext">
                Last 12 Months <span className="positive">+12%</span>
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis hide />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
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
                <button
                  className="btn cancel"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn logout"
                  onClick={handleLogout}
                >
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

export default Dashboard;