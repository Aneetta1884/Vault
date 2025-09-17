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
import './Support.css';

const Support = () => {
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
    
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode && JSON.parse(savedDarkMode)) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Sample notifications data
  const notifications = [
    { id: 1, message: 'New message from Principal about school event', time: '2 hours ago' },
    { id: 2, message: 'Parent-Teacher meeting scheduled for Oct 15', time: '1 day ago' },
  ];
  
  const tickets = [
    { id: '#12345', subject: 'Issue with login', school: 'Maplewood High', status: 'Open', date: '2024-01-15' },
    { id: '#12346', subject: 'Report generation error', school: 'Oakridge Elementary', status: 'Closed', date: '2024-01-14' },
    { id: '#12347', subject: 'User account creation', school: 'Pinecrest Academy', status: 'In Progress', date: '2024-01-13' },
    { id: '#12348', subject: 'Password reset request', school: 'Willow Creek School', status: 'Open', date: '2024-01-12' },
    { id: '#12349', subject: 'Data synchronization issue', school: 'Cedar Grove High', status: 'Closed', date: '2024-01-11' },
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

  // Function to generate and download the report
  const downloadReport = () => {
    // Create report content
    const reportData = {
      generatedDate: new Date().toLocaleDateString(),
      totalTickets: 120,
      solvedTickets: 95,
      newTickets: 15,
      queuedTickets: 10,
      recentTickets: tickets
    };

    // Convert to CSV format
    const csvContent = convertToCSV(reportData);
    
    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `support_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    // Add to document, trigger click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to convert report data to CSV format
  const convertToCSV = (data) => {
    let csv = '';
    
    // Add header
    csv += 'Support Ticket Report\n';
    csv += `Generated on: ${data.generatedDate}\n\n`;
    
    // Add summary section
    csv += 'SUMMARY\n';
    csv += 'Metric,Value\n';
    csv += `Total Tickets,${data.totalTickets}\n`;
    csv += `Solved Tickets,${data.solvedTickets}\n`;
    csv += `New Tickets,${data.newTickets}\n`;
    csv += `Tickets in Queue,${data.queuedTickets}\n\n`;
    
    // Add recent tickets section
    csv += 'RECENT TICKETS\n';
    csv += 'Ticket ID,Subject,School Name,Status,Date\n';
    
    data.recentTickets.forEach(ticket => {
      csv += `${ticket.id},${ticket.subject},${ticket.school},${ticket.status},${ticket.date}\n`;
    });
    
    return csv;
  };

  // Alternative: PDF report generation (if you prefer PDF format)
  const downloadPDFReport = () => {
    // This would require a PDF generation library like jsPDF
    // For now, we'll use the CSV version
    downloadReport();
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarExpanded ? 'expanded' : 'compressed'}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarExpanded ? <X size={18} /> : <Menu size={18} />}
        </button>
        <Link to="/dashboard" className="sidebar-item">
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
        <Link to="/support" className="sidebar-item active">
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
        <header 
          className="header"
          style={{ 
            width: isSidebarExpanded ? 'calc(100% - 220px)' : 'calc(100% - 60px)',
            left: isSidebarExpanded ? '220px' : '60px',
            transition: 'all 0.3s ease'
          }}
        >
          <h2>Support</h2>
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
                      {/* <Link to="/profilesetting" className="profile-option">
                        <span className="icon"><i className="fas fa-edit"></i></span> Edit
                      </Link> */}
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
          <div className="dashboard-container">
            <h1 className="dashboard-title">Ticket Summary</h1>
            <p> Overview </p>
            <div className="date-info">Date: {new Date().toLocaleDateString()}</div>
            <div className="stats-grid">
              <div className="stat-card blue">
                <h2 className="stat-title">Total Tickets Raised</h2>
                <p className="stat-value">120</p>
              </div>
              <div className="stat-card green">
                <h2 className="stat-title">Solved</h2>
                <p className="stat-value">95</p>
              </div>
              <div className="stat-card yellow">
                <h2 className="stat-title">New Tickets</h2>
                <p className="stat-value">15</p>
              </div>
              <div className="stat-card red">
                <h2 className="stat-title">Tickets in Queue</h2>
                <p className="stat-value">10</p>
              </div>
            </div>
            <h2 className="table-title">Recent Tickets</h2>
            <div className="ticket-table-container">
              <table className="ticket-table">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Subject</th>
                    <th>School Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.id}</td>
                      <td>{ticket.subject}</td>
                      <td>{ticket.school}</td>
                      <td>
                        <span className={`status ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                          {ticket.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card">
              {/* Left side - text */}
              <div>
                <h3 className="card-title">Reports & Downloads</h3>
                <p className="card-subtitle">Download support reports</p>
              </div>

              {/* Right side - button */}
              <div className="button-container">
                <button className="download-button" onClick={downloadReport}>
                  Download Report
                </button>
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

export default Support;