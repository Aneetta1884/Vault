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
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './Finance.css';

const Finance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [transactionSearchTerm, setTransactionSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

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

  const notifications = [
    { id: 1, message: 'New message from Principal about school event', time: '2 hours ago' },
    { id: 2, message: 'Parent-Teacher meeting scheduled for Oct 15', time: '1 day ago' },
  ];

  const data = [
    {
      school: "Brightwood Academy",
      percent: "15%",
      revenue: "₹250,000",
      commission: "₹37,500",
      history: "#",
    },
    {
      school: "Greenfield High",
      percent: "12%",
      revenue: "₹300,000",
      commission: "₹36,000",
      history: "#",
    },
    {
      school: "Lakeside Prep",
      percent: "18%",
      revenue: "₹200,000",
      commission: "₹36,000",
      history: "#",
    },
    {
      school: "Riverdale School",
      percent: "10%",
      revenue: "₹350,000",
      commission: "₹35,000",
      history: "#",
    },
    {
      school: "Hilltop Academy",
      percent: "14%",
      revenue: "₹220,000",
      commission: "₹30,800",
      history: "#",
    },
  ];

  // Transaction data for the modal - 15 items to test pagination
  const transactionData = [
    { date: "2024-07-20", id: "TXN123456", amount: "¥25,000", type: "Revenue", status: "Completed" },
    { date: "2024-07-15", id: "TXN789012", amount: "¥10,000", type: "Commission", status: "Completed" },
    { date: "2024-07-10", id: "TXN345678", amount: "¥15,000", type: "Revenue", status: "Completed" },
    { date: "2024-07-05", id: "TXNB01234", amount: "¥5,000", type: "Commission", status: "Completed" },
    { date: "2024-06-30", id: "TXN587890", amount: "¥20,000", type: "Revenue", status: "Completed" },
    { date: "2024-06-25", id: "TXN234567", amount: "¥7,500", type: "Commission", status: "Completed" },
    { date: "2024-06-20", id: "TXNB90123", amount: "¥12,500", type: "Revenue", status: "Completed" },
    { date: "2024-06-15", id: "TXN456789", amount: "¥2,500", type: "Commission", status: "Completed" },
    { date: "2024-06-10", id: "TXN012345", amount: "¥17,500", type: "Revenue", status: "Completed" },
    { date: "2024-06-05", id: "TXN678901", amount: "¥15,000", type: "Commission", status: "Completed" },
    { date: "2024-05-28", id: "TXN111213", amount: "¥18,000", type: "Revenue", status: "Pending" },
    { date: "2024-05-20", id: "TXN141516", amount: "¥9,500", type: "Commission", status: "Pending" },
    { date: "2024-05-15", id: "TXN171819", amount: "¥22,000", type: "Revenue", status: "Failed" },
    { date: "2024-05-10", id: "TXN202122", amount: "¥6,800", type: "Commission", status: "Completed" },
    { date: "2024-05-05", id: "TXN232425", amount: "¥19,500", type: "Revenue", status: "Completed" },
  ];

  // Define activityData for the chart
  const activityData = [
    { month: "Jan", students: 1000 },
    { month: "Feb", students: 1100 },
    { month: "Mar", students: 1050 },
    { month: "Apr", students: 1200 },
    { month: "May", students: 1150 },
    { month: "Jun", students: 1300 },
    { month: "Jul", students: 1250 },
    { month: "Aug", students: 1400 },
    { month: "Sep", students: 1350 },
    { month: "Oct", students: 1500 },
    { month: "Nov", students: 1450 },
    { month: "Dec", students: 1600 },
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

  const openTransactionModal = (schoolName) => {
    setSelectedSchool(schoolName);
    setFilteredTransactions(transactionData);
    setTransactionSearchTerm('');
    setTypeFilter('All');
    setStatusFilter('All');
    setCurrentPage(1);
    setShowTransactionModal(true);
  };

  // Handle transaction search and filtering
  useEffect(() => {
    let filtered = transactionData;
    
    // Apply search filter
    if (transactionSearchTerm.trim() !== '') {
      filtered = filtered.filter(transaction => 
        transaction.date.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
        transaction.amount.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
        transaction.status.toLowerCase().includes(transactionSearchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (typeFilter !== 'All') {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(transaction => transaction.status === statusFilter);
    }
    
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [transactionSearchTerm, typeFilter, statusFilter]);

  // Export transaction data to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Transaction ID', 'Amount', 'Type', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(transaction => 
        `${transaction.date},${transaction.id},${transaction.amount},${transaction.type},${transaction.status}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedSchool.replace(/\s+/g, '_')}_transactions.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        // Show first 4 pages and last page
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page and last 4 pages
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show pages around current page
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  // Get unique types and statuses for dropdowns
  const transactionTypes = ['All', ...new Set(transactionData.map(t => t.type))];
  const transactionStatuses = ['All', ...new Set(transactionData.map(t => t.status))];

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
        <Link to="/schools" className="sidebar-item">
          <School size={18} />
          {isSidebarExpanded && <span>Schools</span>}
        </Link>
        <Link to="/finance" className="sidebar-item active">
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
          <h2>Finance</h2>
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

        <div className="finance-stats-wrapper">
          {/* Left Side - Cards */}
          <div className="finance-stats">
            <div className="finance-card">
              <p>Total commissions paid</p>
              <h3>120</h3>
            </div>

            <div className="finance-card">
              <p>pending commissions</p>
              <h3>15</h3>
            </div>

            <div className="finance-card">
              <p>pending payment</p>
              <h3>95</h3>
            </div>

            <div className="finance-card wide">
              <p>revenue</p>
              <h3>10</h3>
            </div>
          </div>

          {/* Right Side - Revenue Graph */}
          <div className="finance-card large">
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
          </div>
        </div>

        {/* Add Manage Payouts heading */}
        <h1 className="section-heading">Manage Payouts</h1>

        <div className="school-table-container">
          <table className="school-table">
            <thead>
              <tr>
                <th>School Details</th>
                <th>Percent</th>
                <th>Revenue</th>
                <th>Commission Revenue</th>
                <th>Transaction History</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.school}</td>
                  <td>{row.percent}</td>
                  <td>{row.revenue}</td>
                  <td>{row.commission}</td>
                  <td>
                    <button 
                      className="history-link"
                      onClick={() => openTransactionModal(row.school)}
                    >
                      View History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Transaction History Modal */}
        {showTransactionModal && (
          <div className="modal-overlay">
            <div className="transaction-modal">
              <div className="modal-header">
                <h2>Transaction History for {selectedSchool}</h2>
                <button 
                  className="close-modal"
                  onClick={() => setShowTransactionModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="modal-toolbar">
                <div className="search-container">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="search-input"
                    value={transactionSearchTerm}
                    onChange={(e) => setTransactionSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="filter-dropdowns">
                  <div className="dropdown-container">
                    <button 
                      className="dropdown-btn"
                      onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                    >
                      {typeFilter} <ChevronDown size={16} />
                    </button>
                    {typeDropdownOpen && (
                      <div className="dropdown-menu">
                        {transactionTypes.map((type, index) => (
                          <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => {
                              setTypeFilter(type);
                              setTypeDropdownOpen(false);
                            }}
                          >
                            {type}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="dropdown-container">
                    <button 
                      className="dropdown-btn"
                      onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    >
                      {statusFilter} <ChevronDown size={16} />
                    </button>
                    {statusDropdownOpen && (
                      <div className="dropdown-menu">
                        {transactionStatuses.map((status, index) => (
                          <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => {
                              setStatusFilter(status);
                              setStatusDropdownOpen(false);
                            }}
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="toolbar-buttons">
                  <button className="toolbar-btn" onClick={exportToCSV}>
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="transaction-table-container">
                <table className="transaction-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transaction ID</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.date}</td>
                          <td>{transaction.id}</td>
                          <td>{transaction.amount}</td>
                          <td>
                            <span className={`type-badge ${transaction.type.toLowerCase()}`}>
                              {transaction.type}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-results">
                          No transactions found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="modal-footer">
                <div className="pagination-info">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </div>
                {totalPages > 1 && (
                  <div className="pagination-controls">
                    <button 
                      className="pagination-btn prev-next" 
                      onClick={prevPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    
                    {getPageNumbers().map((pageNumber, index) => (
                      pageNumber === '...' ? (
                        <span key={index} className="pagination-ellipsis">...</span>
                      ) : (
                        <button
                          key={index}
                          className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                          onClick={() => paginate(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      )
                    ))}
                    
                    <button 
                      className="pagination-btn prev-next" 
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
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

export default Finance;