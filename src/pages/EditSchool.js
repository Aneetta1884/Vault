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
  Upload,
  MapPin,
} from 'lucide-react';
import './EditSchool.css';

const EditSchool = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const { schoolId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [schoolInfo, setSchoolInfo] = useState({
    name: '',
    contactName: '',
    contactEmail: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState !== null) {
      setIsSidebarExpanded(savedSidebarState === 'false');
    }

    if (state?.school) {
      setSchoolInfo({
        name: state.school.name || '',
        contactName: state.school.contactName || '', 
        contactEmail: state.school.email || '',
        phone: state.school.contact || '',
        address: state.school.address || '',
        city: state.school.city || '',
        state: state.school.state || '',
        zipCode: state.school.zipCode || '',
        country: state.school.country || ''
      });
    }
  }, [schoolId, state]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchoolInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSchool = {
        ...state.school,
        name: schoolInfo.name,
        email: schoolInfo.contactEmail,
        contact: schoolInfo.phone,
        contactName: schoolInfo.contactName,
        address: schoolInfo.address,
        city: schoolInfo.city,
        state: schoolInfo.state,
        zipCode: schoolInfo.zipCode,
        country: schoolInfo.country
      };
      
      // Store the updated school data in sessionStorage to pass back
      sessionStorage.setItem('updatedSchool', JSON.stringify(updatedSchool));
      
      alert('School information updated successfully!');
      navigate('/schools', { 
        state: { 
          updatedSchool,
          schoolId: parseInt(schoolId)
        } 
      });
    } catch (error) {
      alert('Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/schools');
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
          <h2>Edit School Info - {schoolInfo.name}</h2>
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

        <div className="edit-school-fullwidth">
          <div className="school-header-fullwidth">
            <h2>{schoolInfo.name}</h2>
          </div>
          
          <form onSubmit={handleSaveChanges} className="edit-school-form-fullwidth">
            <div className="form-sections-container">
              <div className="form-section-fullwidth">
                <div className="section-header-fullwidth">
                  <Upload size={18} />
                  <h3>Basic Information</h3>
                </div>
                <p className="section-description-fullwidth">Update the school's primary contact details.</p>
                
                <div className="form-grid-fullwidth">
                  <div className="form-group-fullwidth">
                    <label htmlFor="name">School Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={schoolInfo.name}
                      onChange={handleInputChange}
                      placeholder="Enter school name"
                      required
                    />
                  </div>
                  
                  <div className="form-group-fullwidth">
                    <label htmlFor="contactName">Primary Contact Name</label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={schoolInfo.contactName}
                      onChange={handleInputChange}
                      placeholder="Enter contact name"
                    />
                  </div>
                  
                  <div className="form-group-fullwidth">
                    <label htmlFor="contactEmail">Contact Email</label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={schoolInfo.contactEmail}
                      onChange={handleInputChange}
                      placeholder="Enter contact email"
                      required
                    />
                  </div>
                  
                  <div className="form-group-fullwidth">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={schoolInfo.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-section-fullwidth">
                <div className="section-header-fullwidth">
                  <MapPin size={18} />
                  <h3>Address Details</h3>
                </div>
                <p className="section-description-fullwidth">Update the school's physical address.</p>
                
                <div className="form-grid-fullwidth">
                  <div className="form-group-fullwidth full-width">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={schoolInfo.address}
                      onChange={handleInputChange}
                      placeholder="Enter street address"
                    />
                  </div>
                  
                  <div className="form-group-fullwidth">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={schoolInfo.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                    />
                  </div>
                  
                  <div className="form-group-fullwidth">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={schoolInfo.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                    />
                  </div>
                  
                  <div className="form-group-fullwidth">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={schoolInfo.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                  
                  <div className="form-group-fullwidth">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={schoolInfo.country}
                      onChange={handleInputChange}
                      placeholder="Enter country"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-actions-fullwidth">
              <button type="button" className="cancel-btn-fullwidth" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="save-btn-fullwidth" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
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

export default EditSchool;