import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
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
  Check,
  ChevronLeft,
} from 'lucide-react';
import './RenewSubscription.css';

const RenewSubscription = () => {
  const navigate = useNavigate();
  const { schoolId } = useParams();
  const { state } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null); // Changed to null initially
  const [paymentMethod, setPaymentMethod] = useState('');

  const schoolName = state?.schoolName || state?.school?.name || 'School';
  const currentPlan = state?.school?.plan || 'Premium';

  useEffect(() => {
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState !== null) {
      setIsSidebarExpanded(savedSidebarState === 'false');
    }
    
    // Don't auto-select the current plan - let user choose
    // This is the key change - we're removing the auto-selection
  }, [currentPlan]);

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

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleRenewSubscription = () => {
    if (!selectedPlan) {
      alert('Please select a plan first');
      return;
    }
    
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    // Here you would typically make an API call to process the subscription renewal
    alert(`Renewing subscription for ${schoolName} with ${selectedPlan} plan using ${paymentMethod}`);
    
    // After successful renewal, you might navigate back or show a success message
    // navigate(`/schools/${schoolId}`);
  };

  // Define plan details
  const planDetails = {
    Basic: {
      price: '¥799 /year',
      features: [
        'Up to 500 students',
        'Basic reporting',
        'Email support'
      ]
    },
    Premium: {
      price: '¥1499 /year',
      features: [
        'Up to 1000 students',
        'Advanced reporting',
        'Priority email support'
      ]
    }
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
          <h2>Renew Subscription</h2>
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

        <div 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            paddingTop: '80px' 
          }}
        >
          <div className="back-button" onClick={() => navigate(-1)} style={{ marginTop: '-60px' }}>
            <ChevronLeft size={18} />
          </div>
          <div className="renew-subscription-fullwidth">
            <div className="school-header-fullwidth" style={{ marginTop: '-25px' }}>
              <h2>{schoolName}</h2>
              <p>Current Plan: {currentPlan}</p>
            </div>
            
            <div className="renew-content-fullwidth">
              <div className="renew-grid-fullwidth">
                <div className="current-plan-fullwidth">
                  <h3>Current Plan Summary</h3>
                  <div className="plan-details-fullwidth">
                    <div className="detail-item-fullwidth">
                      <span className="label">Plan</span>
                      <span className="value">{currentPlan}</span>
                    </div>
                    <div className="detail-item-fullwidth">
                      <span className="label">Billing Cycle</span>
                      <span className="value">Annual</span>
                    </div>
                    <div className="detail-item-fullwidth">
                      <span className="label">Next Billing Date</span>
                      <span className="value">July 15, 2024</span>
                    </div>
                  </div>
                </div>
                
                <div className="plan-selection-fullwidth">
                  <h3>Select Renewal Plan</h3>
                  <p className="selection-help">Choose a plan to renew your subscription</p>
                  <div className="plan-cards-fullwidth">
                    {['Basic', 'Premium'].map(plan => (
                      <div 
                        key={plan} 
                        className={`plan-card-fullwidth ${selectedPlan === plan ? 'selected' : ''}`}
                        onClick={() => handlePlanSelect(plan)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="plan-header-fullwidth">
                          <h4>{plan}</h4>
                          <p className="price">{planDetails[plan].price}</p>
                          <button 
                            className="select-btn-fullwidth"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent double trigger
                              handlePlanSelect(plan);
                            }}
                          >
                            {selectedPlan === plan ? 'Selected' : 'Select'}
                          </button>
                        </div>
                        <ul className="plan-features-fullwidth">
                          {planDetails[plan].features.map((feature, index) => (
                            <li key={index}>
                              <Check size={14} /> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="payment-section-fullwidth">
                <h3>Confirmation & Payment</h3>
                <div className="payment-details-fullwidth">
                  {selectedPlan ? (
                    <>
                      <div className="selected-plan-summary-fullwidth">
                        <div className="summary-item-fullwidth">
                          <span className="label">Selected Plan</span>
                          <span className="value">{selectedPlan}</span>
                        </div>
                        <div className="summary-item-fullwidth">
                          <span className="label">Total Cost</span>
                          <span className="value">
                            {selectedPlan === 'Basic' ? '¥799/year' : '¥1499/year'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="payment-method-fullwidth">
                        <h4>Payment Method</h4>
                        <select 
                          value={paymentMethod} 
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="payment-select-fullwidth"
                        >
                          <option value="">Select payment method</option>
                          <option value="credit-card">Credit Card</option>
                          <option value="paypal">PayPal</option>
                          <option value="bank-transfer">Bank Transfer</option>
                        </select>
                      </div>
                      
                      <button 
                        className="renew-btn-fullwidth"
                        onClick={handleRenewSubscription}
                        disabled={!paymentMethod}
                      >
                        Renew Subscription
                      </button>
                    </>
                  ) : (
                    <div className="no-plan-selected">
                      <p>Please select a plan above to proceed with renewal</p>
                    </div>
                  )}
                </div>
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

export default RenewSubscription;