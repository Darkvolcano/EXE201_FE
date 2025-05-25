import { useState } from 'react';
import '../style/Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Search, Bell, TrendingUp, Award, BookOpen, User 
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useDashboardData } from '../hooks/dashboardApi';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState('2025');
  
  // Using our custom hook to fetch dashboard data
  const { 
    revenueData, 
    accountsStatus, 
    coursesStatus, 
    topAccount, 
    isLoading, 
    isError 
  } = useDashboardData(selectedYear);

  // Transform the month from number to name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Transform revenue data to include month names
  const transformedRevenueData = revenueData.map(item => ({
    ...item,
    monthName: monthNames[item.month - 1]
  }));

  if (isLoading) return (
    <div className="dashboard-container">
      <div className="loading-container">
        <LoadingSpinner />
        <p>Loading dashboard data...</p>
      </div>
    </div>
  );
  
  if (isError) return (
    <div className="dashboard-container">
      <div className="error-container">
        <ErrorMessage message="Failed to load dashboard data" />
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    </div>
  );

  // Calculate total values for summary cards
  const totalAccounts = accountsStatus.Active + accountsStatus.Inactive;
  const totalCourses = coursesStatus.Active + coursesStatus.Inactive;
  const totalRevenue = transformedRevenueData.reduce((sum, month) => sum + month.revenue, 0);

  // Calculate percentages safely
  const activeAccountPercentage = totalAccounts ? Math.round((accountsStatus.Active / totalAccounts) * 100) : 0;
  const activeCoursePercentage = totalCourses ? Math.round((coursesStatus.Active / totalCourses) * 100) : 0;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input 
                type="text" 
                placeholder="Search" 
                className="search-input"
              />
            </div>
            
            <div className="header-actions">
              <div className="notification-icon">
                <Bell size={20} />
                <span className="notification-badge"></span>
              </div>
              <div className="language-selector">
                <img src="/api/placeholder/24/24" alt="English" className="language-flag" />
                <span className="language-label">English</span>
              </div>
              <div className="user-profile">
                <img src="/api/placeholder/32/32" alt="User Avatar" className="user-avatar" />
                <div>
                  <p className="user-info">Mert Roy</p>
                  <p className="user-role">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back! Here's an overview of your tutoring platform.</p>
          </div>
          
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card revenue">
              <div className="summary-icon">
                <TrendingUp size={24} />
              </div>
              <div className="summary-content">
                <h3>Total Revenue</h3>
                <p className="summary-value">{totalRevenue.toLocaleString()} VND</p>
                <p className="summary-period">in {selectedYear}</p>
              </div>
            </div>
            
            <div className="summary-card accounts">
              <div className="summary-icon">
                <User size={24} />
              </div>
              <div className="summary-content">
                <h3>Accounts</h3>
                <p className="summary-value">{totalAccounts}</p>
                <p className="summary-period">{accountsStatus.Active} active, {accountsStatus.Inactive} inactive</p>
              </div>
            </div>
            
            <div className="summary-card courses">
              <div className="summary-icon">
                <BookOpen size={24} />
              </div>
              <div className="summary-content">
                <h3>Courses</h3>
                <p className="summary-value">{totalCourses}</p>
                <p className="summary-period">{coursesStatus.Active} active, {coursesStatus.Inactive} inactive</p>
              </div>
            </div>
            
            <div className="summary-card top-user">
              <div className="summary-icon">
                <Award size={24} />
              </div>
              <div className="summary-content">
                <h3>Top Account</h3>
                <p className="summary-value">{topAccount.fullName || "No data"}</p>
                <p className="summary-period">{topAccount.completedCourses || 0} completed courses</p>
              </div>
            </div>
          </div>
          
          {/* Revenue Chart */}
          <div className="revenue-card">
            <div className="revenue-header">
              <div>
                <h2 className="revenue-title">Revenue by Month</h2>
                <p className="revenue-subtitle">Monthly revenue breakdown for {selectedYear}</p>
              </div>
              <div className="year-selector">
                <select 
                  className="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
            </div>
            
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={transformedRevenueData} 
                  margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="monthName" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666', fontSize: 12 }}
                    tickFormatter={(value) => value === 0 ? '0' : `${value / 1000000}M`}
                    domain={[0, 'dataMax + 1000000']}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()} VND`, "Revenue"]}
                    labelFormatter={(label) => `${label} ${selectedYear}`}
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: 'none',
                      padding: '12px'
                    }}
                    cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#4F46E5" 
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                    animationDuration={1500}
                    name="Revenue"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Detailed Stats - 2 column layout */}
          <div className="detailed-stats-container">
            {/* Left Column - Account & Course Status */}
            <div className="stats-column">
              {/* Account Status */}
              <div className="detail-card">
                <h2 className="detail-title">Account Status</h2>
                <div className="detail-content">
                  <div className="status-chart">
                    <div 
                      className="status-bar active" 
                      style={{ 
                        width: `${(accountsStatus.Active / (totalAccounts || 1)) * 100}%`,
                        opacity: totalAccounts ? 1 : 0.5
                      }}
                    ></div>
                    <div 
                      className="status-bar inactive" 
                      style={{ 
                        width: `${(accountsStatus.Inactive / (totalAccounts || 1)) * 100}%`,
                        opacity: totalAccounts ? 1 : 0.5
                      }}
                    ></div>
                  </div>
                  <div className="status-info">
                    <div className="status-legend">
                      <div className="legend-item">
                        <span className="legend-color active"></span>
                        <span>Active: {accountsStatus.Active}</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color inactive"></span>
                        <span>Inactive: {accountsStatus.Inactive}</span>
                      </div>
                    </div>
                    <div className="status-percentage">
                      <div className="percentage-circle">
                        <span className="percentage-value">{activeAccountPercentage}%</span>
                      </div>
                      <span className="percentage-label">Active Accounts</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Status */}
              <div className="detail-card">
                <h2 className="detail-title">Course Status</h2>
                <div className="detail-content">
                  <div className="status-chart">
                    <div 
                      className="status-bar active" 
                      style={{ 
                        width: `${(coursesStatus.Active / (totalCourses || 1)) * 100}%`,
                        opacity: totalCourses ? 1 : 0.5
                      }}
                    ></div>
                    <div 
                      className="status-bar inactive" 
                      style={{ 
                        width: `${(coursesStatus.Inactive / (totalCourses || 1)) * 100}%`,
                        opacity: totalCourses ? 1 : 0.5
                      }}
                    ></div>
                  </div>
                  <div className="status-info">
                    <div className="status-legend">
                      <div className="legend-item">
                        <span className="legend-color active"></span>
                        <span>Active: {coursesStatus.Active}</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color inactive"></span>
                        <span>Inactive: {coursesStatus.Inactive}</span>
                      </div>
                    </div>
                    <div className="status-percentage">
                      <div className="percentage-circle">
                        <span className="percentage-value">{activeCoursePercentage}%</span>
                      </div>
                      <span className="percentage-label">Active Courses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Top Account */}
            <div className="stats-column">
              <div className="detail-card top-performer-card">
                <h2 className="detail-title">Top Performer</h2>
                <div className="detail-content">
                  {topAccount._id ? (
                    <div className="top-account-profile">
                      <div className="profile-header">
                        <div className="profile-avatar">
                          <img src="/api/placeholder/80/80" alt="Profile" />
                        </div>
                        <div className="profile-info">
                          <h3>{topAccount.fullName}</h3>
                          <p className="profile-email">{topAccount.email}</p>
                        </div>
                      </div>
                      <div className="profile-stats">
                        <div className="stat-item">
                          <span className="stat-value">{topAccount.completedCourses || 0}</span>
                          <span className="stat-label">Courses Completed</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-value">{topAccount.totalHours || 0}</span>
                          <span className="stat-label">Total Hours</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-value">{topAccount.rating || 4.8}</span>
                          <span className="stat-label">Rating</span>
                        </div>
                      </div>
                      <button className="view-profile-btn">View Full Profile</button>
                    </div>
                  ) : (
                    <div className="no-data-message">
                      <p>No top account data available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}