import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
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
  ChevronLeft,
  Edit,
} from 'lucide-react';
import './SupportTicket.css';

const SupportTicket = () => {
  const { schoolId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [editingTicket, setEditingTicket] = useState(null);
  const [tickets, setTickets] = useState([]);

  const schoolName = state?.schoolName || state?.school?.name || `School ${schoolId}`;

  useEffect(() => {
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState !== null) {
      setIsSidebarExpanded(savedSidebarState === 'false');
    }

    const allTickets = {
      '1': [
        { id: '#12345', subject: 'Issue with student login', status: 'New', updated: '2023-09-20' },
        { id: '#12346', subject: 'Request for new software installation', status: 'Solved', updated: '2023-09-19' },
        { id: '#12347', subject: 'Network connectivity problem', status: 'In Progress', updated: '2023-09-18' },
      ],
      '2': [
        { id: '#22348', subject: 'Password reset for teacher account', status: 'Solved', updated: '2023-09-17' },
        { id: '#22349', subject: 'Hardware malfunction in lab', status: 'New', updated: '2023-09-16' },
        { id: '#22350', subject: 'Software update required', status: 'In Progress', updated: '2023-09-15' },
      ],
      '3': [
        { id: '#32351', subject: 'Issue with student login', status: 'New', updated: '2023-09-14' },
        { id: '#32352', subject: 'Request for new software installation', status: 'Solved', updated: '2023-09-13' },
        { id: '#32353', subject: 'Network connectivity problem', status: 'In Progress', updated: '2023-09-12' },
      ],
    };

    setTickets(allTickets[schoolId] || [
      { id: '#12354', subject: 'Password reset for teacher account', status: 'Solved', updated: '2023-09-11' },
      { id: '#12355', subject: 'General support inquiry', status: 'New', updated: '2023-09-10' },
    ]);
  }, [schoolId]);

  const notifications = [
    { id: 1, message: 'New message from Principal about school event', time: '2 hours ago' },
    { id: 2, message: 'Parent-Teacher meeting scheduled for Oct 15', time: '1 day ago' },
  ];

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(ticket => ticket.status === 'New' || ticket.status === 'In Progress').length;
  const solvedTickets = tickets.filter(ticket => ticket.status === 'Solved').length;

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

  const handleEditStatus = (ticketId) => {
    setEditingTicket(ticketId);
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: newStatus, updated: new Date().toISOString().split('T')[0] }
          : ticket
      )
    );
    setEditingTicket(null);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchTerm === '' || 
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.updated.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
        <Link to="/support" className="sidebar-item ">
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
          <h2>Support Ticket</h2>
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

        <div className="back-button" onClick={() => navigate(`/schooldetail/${schoolId}`, { state })}>
          <ChevronLeft size={18} />
        </div>

        <div className="support-tickets">
          <h2>Support Tickets</h2>
          <p>{schoolName}</p>

          <div className="ticket-controls">
            <input 
              type="text" 
              className="ticket-search" 
              placeholder="Search by ID, Subject, Status, or Date" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="ticket-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Solved">Solved</option>
            </select>
          </div>

          <div className="ticket-summary">
            <div className="ticket-card">
              <h3>Total Tickets</h3>
              <p>{totalTickets}</p>
            </div>
            <div className="ticket-card">
              <h3>Open Tickets</h3>
              <p>{openTickets}</p>
            </div>
            <div className="ticket-card">
              <h3>Solved Tickets</h3>
              <p>{solvedTickets}</p>
            </div>
          </div>

          <table className="ticket-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.subject}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {editingTicket === ticket.id ? (
                        <select 
                          value={ticket.status}
                          onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                          onBlur={() => setEditingTicket(null)}
                          autoFocus
                          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Solved">Solved</option>
                        </select>
                      ) : (
                        <>
                          <span 
                            className={`status-badge ${ticket.status.toLowerCase().replace(" ", "-")}`}
                          >
                            {ticket.status}
                          </span>
                          <button 
                            onClick={() => handleEditStatus(ticket.id)}
                            title="Edit Status"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '2px',
                              borderRadius: '3px',
                              display: 'flex',
                              alignItems: 'center',
                              color: '#6c757d',
                              transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#495057'}
                            onMouseLeave={(e) => e.target.style.color = '#6c757d'}
                          >
                            <Edit size={12} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  <td>{ticket.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default SupportTicket;