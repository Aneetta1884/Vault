import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  School,
  HelpCircle,
  LogOut,
  Bell,
  User,
  Wallet,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react';
import './StudentList.css';

const StudentList = () => {
  const { schoolId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [schoolInfo, setSchoolInfo] = useState({
    schoolId: null,
    schoolName: '',
    totalStudents: 0,
    studentsWithPlanCount: 0,
  });
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

  const [students, setStudents] = useState({
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
  });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalType, setModalType] = useState('');
  const [newPlan, setNewPlan] = useState('');
  const [upgradeReason, setUpgradeReason] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const currentStudents = students[schoolId] || [];
  const filteredStudents = currentStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredStudents.slice(indexOfFirstRecord, indexOfLastRecord);

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

  const openModal = (student, type) => {
    setSelectedStudent(student);
    setModalType(type);
    setNewPlan(student.plan);
    setUpgradeReason('');
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalType('');
    setNewPlan('');
    setUpgradeReason('');
  };

  const confirmChange = () => {
    setStudents((prev) => ({
      ...prev,
      [schoolId]: prev[schoolId].map((s) =>
        s.id === selectedStudent.id ? { ...s, plan: newPlan } : s
      ),
    }));
    closeModal();
  };

  const confirmUpgrade = () => {
    console.log('Upgrade reason for', selectedStudent.name, ':', upgradeReason);
    closeModal();
  };

  const confirmSuspend = () => {
    console.log('Suspended account for', selectedStudent.name);
    closeModal();
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

  useEffect(() => {
    if (location.state) {
      setSchoolInfo({
        schoolId: location.state.schoolId || null,
        schoolName: location.state.schoolName || '',
        totalStudents: location.state.totalStudents || 0,
        studentsWithPlanCount: location.state.studentsWithPlanCount || 0,
      });
    }
  }, [location.state]);

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

        <div className="back-button" onClick={() =>
          navigate(`/schooldetail/${schoolId}`, {
            state: {
              school: {
                id: schoolInfo.schoolId,
                name: schoolInfo.schoolName,
                students: schoolInfo.totalStudents,
              },
            },
          })
        }>
          <ChevronLeft size={18} />
        </div>

        <div className="students-container">
          <h2 className="title">
            {schoolInfo.schoolName ? `Students - ${schoolInfo.schoolName}` : 'Total Students'}
          </h2>
          {schoolInfo.totalStudents > 0 && (
            <p className="student-count">
              Total: {schoolInfo.totalStudents} students | 
              With Plan: {schoolInfo.studentsWithPlanCount || currentStudents.length} students
            </p>
          )}
          <input
            type="text"
            placeholder="Search students"
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="students-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Plan</th>
                <th>Class/Section</th>
                <th>Subscription Expiry</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td className={`plan ${student.plan.toLowerCase()}`}>{student.plan}</td>
                    <td>{student.class}</td>
                    <td>{student.expiry}</td>
                    <td className="actions">
                      <div onClick={() => openModal(student, 'change')}>Change Plan</div>
                      <div onClick={() => openModal(student, 'upgrade')}>Upgrade</div>
                      <div onClick={() => openModal(student, 'suspend')}>Suspend</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No students found for this school.</td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="page-btn"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Logout Modal */}
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

        {/* Student Action Modal */}
        {selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content">
              {modalType === 'change' && (
                <div>
                  <h3>Change Plan for {selectedStudent.name}</h3>
                  <label>Select New Plan</label>
                  <select value={newPlan} onChange={(e) => setNewPlan(e.target.value)}>
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                  </select>
                  <div className="modal-actions">
                    <button onClick={closeModal} className="cancel-btn">
                      Cancel
                    </button>
                    <button onClick={confirmChange} className="confirm-btn">
                      Confirm Change
                    </button>
                  </div>
                </div>
              )}
              {modalType === 'upgrade' && (
                <div className="upgrade-modal">
                  <h3>Upgrade Reason for {selectedStudent.name}</h3>
                  <label>Reason for Upgrade</label>
                  <textarea
                    rows="4"
                    placeholder="Enter reason here..."
                    value={upgradeReason}
                    onChange={(e) => setUpgradeReason(e.target.value)}
                  />
                  <div className="modal-actions">
                    <button onClick={closeModal} className="cancel-btn">
                      Cancel
                    </button>
                    <button onClick={confirmUpgrade} className="confirm-btn">
                      Submit Reason
                    </button>
                  </div>
                </div>
              )}
              {modalType === 'suspend' && (
                <div>
                  <h3>Suspend Account for {selectedStudent.name}</h3>
                  <p>
                    Are you sure you want to suspend the account for{' '}
                    <b>{selectedStudent.name}</b>? This action will temporarily disable access to
                    the platform.
                  </p>
                  <div className="modal-actions">
                    <button onClick={closeModal} className="cancel-btn">
                      Cancel
                    </button>
                    <button onClick={confirmSuspend} className="suspend-btn">
                      Suspend Account
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-backdrop" onClick={closeModal}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;