import { useState } from "react";
import "../style/Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Search, Bell, TrendingUp, Award, BookOpen, User } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useDashboardData } from "../hooks/dashboardApi";
import Sidebar from "../components/SidebarAdmin";

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState("2025");

  // Sử dụng hook tùy chỉnh để lấy dữ liệu bảng điều khiển
  const {
    revenueData,
    accountsStatus,
    coursesStatus,
    topAccount,
    isLoading,
    isError,
  } = useDashboardData(selectedYear);

  // Chuyển đổi tháng từ số sang tên
  const monthNames = [
    "Tháng Một",
    "Tháng Hai",
    "Tháng Ba",
    "Tháng Tư",
    "Tháng Năm",
    "Tháng Sáu",
    "Tháng Bảy",
    "Tháng Tám",
    "Tháng Chín",
    "Tháng Mười",
    "Tháng Mười Một",
    "Tháng Mười Hai",
  ];

  // Chuyển đổi dữ liệu doanh thu để bao gồm tên tháng
  const transformedRevenueData = revenueData.map((item) => ({
    ...item,
    monthName: monthNames[item.month - 1],
  }));

  if (isLoading)
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <LoadingSpinner />
          <p>Đang tải dữ liệu dashboard...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <ErrorMessage message="Không thể tải dữ liệu dashboard" />
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Thử lại
          </button>
        </div>
      </div>
    );

  // Tính tổng giá trị cho các thẻ tóm tắt
  const totalAccounts = accountsStatus.Active + accountsStatus.Inactive;
  const totalCourses = coursesStatus.Active + coursesStatus.Inactive;
  const totalRevenue = transformedRevenueData.reduce(
    (sum, month) => sum + month.revenue,
    0
  );

  // Tính phần trăm một cách an toàn
  const activeAccountPercentage = totalAccounts
    ? Math.round((accountsStatus.Active / totalAccounts) * 100)
    : 0;
  const activeCoursePercentage = totalCourses
    ? Math.round((coursesStatus.Active / totalCourses) * 100)
    : 0;

  return (
    <div className="dashboard-container">
      {/* Thanh bên */}
      <Sidebar />

      {/* Nội dung chính */}
      <div className="main-content" style={{ padding: "0" }}>
        {/* Tiêu đề */}
        {/* <header className="header">
          <div className="header-content">
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="search-input"
              />
            </div>

            <div className="header-actions">
              <div className="notification-icon">
                <Bell size={20} />
                <span className="notification-badge"></span>
              </div>
              <div className="language-selector">
                <img
                  src="/api/placeholder/24/24"
                  alt="Tiếng Việt"
                  className="language-flag"
                />
                <span className="language-label">Tiếng Việt</span>
              </div>
              <div className="user-profile">
                <img
                  src="/api/placeholder/32/32"
                  alt="Ảnh đại diện người dùng"
                  className="user-avatar"
                />
                <div>
                  <p className="user-info">Mert Roy</p>
                  <p className="user-role">Quản trị viên</p>
                </div>
              </div>
            </div>
          </div>
        </header> */}

        {/* Nội dung Bảng điều khiển */}
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">
              Chào mừng trở lại! Đây là tổng quan về nền tảng giảng dạy của bạn.
            </p>
          </div>

          {/* Thẻ tóm tắt */}
          <div className="summary-cards">
            <div className="summary-card revenue">
              <div className="summary-icon">
                <TrendingUp size={24} />
              </div>
              <div className="summary-content">
                <h3>Tổng doanh thu</h3>
                <p className="summary-value">
                  {totalRevenue.toLocaleString()} VND
                </p>
                <p className="summary-period">trong {selectedYear}</p>
              </div>
            </div>

            <div className="summary-card accounts">
              <div className="summary-icon">
                <User size={24} />
              </div>
              <div className="summary-content">
                <h3>Tài khoản</h3>
                <p className="summary-value">{totalAccounts}</p>
                <p className="summary-period">
                  {accountsStatus.Active} hoạt động, {accountsStatus.Inactive}{" "}
                  không hoạt động
                </p>
              </div>
            </div>

            <div className="summary-card courses">
              <div className="summary-icon">
                <BookOpen size={24} />
              </div>
              <div className="summary-content">
                <h3>Khóa học</h3>
                <p className="summary-value">{totalCourses}</p>
                <p className="summary-period">
                  {coursesStatus.Active} hoạt động, {coursesStatus.Inactive}{" "}
                  không hoạt động
                </p>
              </div>
            </div>

            <div className="summary-card top-user">
              <div className="summary-icon">
                <Award size={24} />
              </div>
              <div className="summary-content">
                <h3>Tài khoản hàng đầu</h3>
                <p className="summary-value">
                  {topAccount.fullName || "Không có dữ liệu"}
                </p>
                <p className="summary-period">
                  {topAccount.completedCourses || 0} khóa học đã hoàn thành
                </p>
              </div>
            </div>
          </div>

          {/* Biểu đồ Doanh thu */}
          <div className="revenue-card">
            <div className="revenue-header">
              <div>
                <h2 className="revenue-title">Doanh thu theo Tháng</h2>
                <p className="revenue-subtitle">
                  Phân tích doanh thu hàng tháng cho {selectedYear}
                </p>
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
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="monthName"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 12 }}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 12 }}
                    tickFormatter={(value) =>
                      value === 0 ? "0" : `${value / 1000000}M`
                    }
                    domain={[0, "dataMax + 1000000"]}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `${value.toLocaleString()} VND`,
                      "Doanh thu",
                    ]}
                    labelFormatter={(label) => `${label} ${selectedYear}`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                      padding: "12px",
                    }}
                    cursor={{ fill: "rgba(79, 70, 229, 0.1)" }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#4F46E5"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                    animationDuration={1500}
                    name="Doanh thu"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Thống kê Chi tiết - Bố cục 2 cột */}
          <div className="detailed-stats-container">
            {/* Cột trái - Trạng thái Tài khoản & Khóa học */}
            <div className="stats-column">
              {/* Trạng thái Tài khoản */}
              <div className="detail-card">
                <h2 className="detail-title">Trạng thái Tài khoản</h2>
                <div className="detail-content">
                  <div className="status-chart">
                    <div
                      className="status-bar active"
                      style={{
                        width: `${
                          (accountsStatus.Active / (totalAccounts || 1)) * 100
                        }%`,
                        opacity: totalAccounts ? 1 : 0.5,
                      }}
                    ></div>
                    <div
                      className="status-bar inactive"
                      style={{
                        width: `${
                          (accountsStatus.Inactive / (totalAccounts || 1)) * 100
                        }%`,
                        opacity: totalAccounts ? 1 : 0.5,
                      }}
                    ></div>
                  </div>
                  <div className="status-info">
                    <div className="status-legend">
                      <div className="legend-item">
                        <span className="legend-color active"></span>
                        <span>Hoạt động: {accountsStatus.Active}</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color inactive"></span>
                        <span>Không hoạt động: {accountsStatus.Inactive}</span>
                      </div>
                    </div>
                    <div className="status-percentage">
                      <div className="percentage-circle">
                        <span className="percentage-value">
                          {activeAccountPercentage}%
                        </span>
                      </div>
                      <span className="percentage-label">
                        Tài khoản Hoạt động
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trạng thái Khóa học */}
              <div className="detail-card">
                <h2 className="detail-title">Trạng thái Khóa học</h2>
                <div className="detail-content">
                  <div className="status-chart">
                    <div
                      className="status-bar active"
                      style={{
                        width: `${
                          (coursesStatus.Active / (totalCourses || 1)) * 100
                        }%`,
                        opacity: totalCourses ? 1 : 0.5,
                      }}
                    ></div>
                    <div
                      className="status-bar inactive"
                      style={{
                        width: `${
                          (coursesStatus.Inactive / (totalCourses || 1)) * 100
                        }%`,
                        opacity: totalCourses ? 1 : 0.5,
                      }}
                    ></div>
                  </div>
                  <div className="status-info">
                    <div className="status-legend">
                      <div className="legend-item">
                        <span className="legend-color active"></span>
                        <span>Hoạt động: {coursesStatus.Active}</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color inactive"></span>
                        <span>Không hoạt động: {coursesStatus.Inactive}</span>
                      </div>
                    </div>
                    <div className="status-percentage">
                      <div className="percentage-circle">
                        <span className="percentage-value">
                          {activeCoursePercentage}%
                        </span>
                      </div>
                      <span className="percentage-label">
                        Khóa học Hoạt động
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải - Tài khoản Hàng đầu */}
            <div className="stats-column">
              <div className="detail-card top-performer-card">
                <h2 className="detail-title">Người biểu diễn Hàng đầu</h2>
                <div className="detail-content">
                  {topAccount._id ? (
                    <div className="top-account-profile">
                      <div className="profile-header">
                        <div className="profile-avatar">
                          <img src="/api/placeholder/80/80" alt="Hồ sơ" />
                        </div>
                        <div className="profile-info">
                          <h3>{topAccount.fullName}</h3>
                          <p className="profile-email">{topAccount.email}</p>
                        </div>
                      </div>
                      <div className="profile-stats">
                        <div className="stat-item">
                          <span className="stat-value">
                            {topAccount.completedCourses || 0}
                          </span>
                          <span className="stat-label">
                            Khóa học Đã hoàn thành
                          </span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-value">
                            {topAccount.totalHours || 0}
                          </span>
                          <span className="stat-label">Tổng số giờ</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-value">
                            {topAccount.rating || 4.8}
                          </span>
                          <span className="stat-label">Đánh giá</span>
                        </div>
                      </div>
                      <button className="view-profile-btn">
                        Xem Hồ sơ Chi tiết
                      </button>
                    </div>
                  ) : (
                    <div className="no-data-message">
                      <p>Không có dữ liệu tài khoản hàng đầu</p>
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
