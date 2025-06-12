import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Sidebar from '../components/SidebarAdmin';
import { useGetAllTutors } from '../hooks/tutorsApi';
import { 
  Users, CheckCircle, XCircle, Search, Award, Eye, Mail, PhoneIcon, 
  Calendar as CalendarIcon, GraduationCap 
} from 'lucide-react';

const TutorCard = ({ tutor }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <div className="tutor-card">
      <div className="tutor-card-header">
        <div className="tutor-avatar"><Users size={24} /></div>
        <div className="tutor-info">
          <h3 className="tutor-name">{tutor.account.fullName}</h3>
          <div className="tutor-status">
            <span className={`status-badge ${tutor.account.status.toLowerCase()}`}>
              {tutor.account.status === 'Active' ? <CheckCircle size={14} /> : <XCircle size={14} />}
              {tutor.account.status}
            </span>
          </div>
        </div>
        <button className="view-details-btn" onClick={() => setShowDetails(!showDetails)}>
          <Eye size={16} /> Details
        </button>
      </div>

      <div className="tutor-meta">
        <div className="meta-item"><Mail size={14} /><span>{tutor.account.email}</span></div>
        <div className="meta-item"><PhoneIcon size={14} /><span>{tutor.account.phone}</span></div>
        <div className="meta-item"><CalendarIcon size={14} /><span>Joined {formatDate(tutor.account.createdAt)}</span></div>
      </div>

      <div className="certifications-summary">
        <div className="cert-count"><GraduationCap size={16} /><span>{tutor.certifications.length} Certification{tutor.certifications.length !== 1 ? 's' : ''}</span></div>
        {tutor.certifications.length > 0 && (
          <div className="cert-preview">
            {tutor.certifications.slice(0, 2).map((cert, index) => (
              <span key={cert._id} className="cert-tag">{cert.name}</span>
            ))}
            {tutor.certifications.length > 2 && <span className="cert-more">+{tutor.certifications.length - 2} more</span>}
          </div>
        )}
      </div>

      {showDetails && (
        <div className="tutor-details">
          <div className="details-section">
            <h4>Account Details</h4>
            <div className="details-grid">
              <div className="detail-item"><strong>ID:</strong> {tutor.account._id}</div>
              <div className="detail-item"><strong>Role:</strong> {tutor.account.role}</div>
            </div>
          </div>
          {tutor.certifications.length > 0 && (
            <div className="details-section">
              <h4>Certifications</h4>
              <div className="certifications-list">
                {tutor.certifications.map((cert) => (
                  <div key={cert._id} className="certification-item">
                    <div className="cert-header">
                      <h5>{cert.name}</h5>
                      <div className="cert-badges">
                        {cert.isChecked && <span className="badge verified">Verified</span>}
                        {cert.isCanTeach && <span className="badge can-teach">Can Teach</span>}
                      </div>
                    </div>
                    <p className="cert-description">{cert.description}</p>
                    <div className="cert-meta">
                      <span className="experience"><Award size={14} />{cert.experience} years experience</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AdminTutorsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [certFilter, setCertFilter] = React.useState('All');
  
  const { data, isLoading, error } = useGetAllTutors();

  const filteredTutors = data?.data?.tutors?.filter(tutor => {
    const matchesSearch = tutor.account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tutor.account.status === statusFilter;
    const matchesCert = certFilter === 'All' || 
                       (certFilter === 'With Certifications' && tutor.certifications.length > 0) ||
                       (certFilter === 'No Certifications' && tutor.certifications.length === 0);
    return matchesSearch && matchesStatus && matchesCert;
  }) || [];

  const totalActive = data?.data?.tutors?.filter(t => t.account.status === 'Active').length || 0;
  const totalInactive = data?.data?.tutors?.filter(t => t.account.status === 'Inactive').length || 0;
  const totalWithCerts = data?.data?.tutors?.filter(t => t.certifications.length > 0).length || 0;

  if (isLoading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error loading tutors: {error.message}</div>;

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <main className="main-content">
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Tutors Management</h1>
            <p className="page-subtitle">Manage and view all registered tutors</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total"><Users size={24} /></div>
            <div className="stat-content"><h3>{data?.data?.tutors?.length || 0}</h3><p>Total Tutors</p></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active"><CheckCircle size={24} /></div>
            <div className="stat-content"><h3>{totalActive}</h3><p>Active Tutors</p></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon inactive"><XCircle size={24} /></div>
            <div className="stat-content"><h3>{totalInactive}</h3><p>Inactive Tutors</p></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon certified"><Award size={24} /></div>
            <div className="stat-content"><h3>{totalWithCerts}</h3><p>Certified Tutors</p></div>
          </div>
        </div>

        <div className="filters-section">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search tutors by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select value={certFilter} onChange={(e) => setCertFilter(e.target.value)} className="filter-select">
              <option value="All">All Certifications</option>
              <option value="With Certifications">With Certifications</option>
              <option value="No Certifications">No Certifications</option>
            </select>
          </div>
        </div>

        <div className="results-info">
          <span>Showing {filteredTutors.length} of {data?.data?.tutors?.length || 0} tutors</span>
        </div>

        <div className="tutors-grid">
          {filteredTutors.map((tutor) => (
            <TutorCard key={tutor.account._id} tutor={tutor} />
          ))}
        </div>

        {filteredTutors.length === 0 && (
          <div className="empty-state">
            <Users size={48} />
            <h3>No tutors found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

        <style jsx>{`

                .admin-layout {
        display: flex;
        min-height: 100vh;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        width: 100%;
        max-width: 100vw;
        overflow-x: hidden;
        }

        /* Main content container với scroll */
        .main-content {
        flex: 1;
        margin-left: 20px;
        padding: 1rem;
        background: transparent;
        height: 100vh; /* Fixed height */
        width: calc(100% - 280px);
        box-sizing: border-box;
        overflow-y: auto; /* Vertical scroll */
        overflow-x: hidden;
        }

        .page-header {
        margin-bottom: 1.5rem;
        }

        .header-content {
        background: linear-gradient(135deg, white 0%, #f8fafc 100%);
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(226, 232, 240, 0.5);
        }

        .page-title {
        font-size: 2rem;
        font-weight: 800;
        color: #1e293b;
        margin: 0;
        background: linear-gradient(135deg, #1a73e9, #0f5fd4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        word-break: break-word;
        }

        .page-subtitle {
        color: #64748b;
        margin: 0.75rem 0 0;
        font-size: 1rem;
        font-weight: 500;
        }

        /* Stats grid alignment - 4 equal columns */
        .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
        }

        /* Stat card consistent sizing with fixed height */
        .stat-card {
        background: linear-gradient(135deg, white 0%, #f8fafc 100%);
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: all 0.3s ease;
        border: 1px solid rgba(226, 232, 240, 0.5);
        min-width: 0;
        height: 100px; /* Fixed height for alignment */
        }

        .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
        }

        .stat-icon.total { background: linear-gradient(135deg, #1a73e9, #0f5fd4); }
        .stat-icon.active { background: linear-gradient(135deg, #10b981, #059669); }
        .stat-icon.inactive { background: linear-gradient(135deg, #ef4444, #dc2626); }
        .stat-icon.certified { background: linear-gradient(135deg, #f59e0b, #d97706); }

        .stat-content {
        min-width: 0;
        flex: 1;
        }

        .stat-content h3 {
        font-size: 1.8rem;
        font-weight: 800;
        color: #1e293b;
        margin: 0;
        line-height: 1;
        }

        .stat-content p {
        color: #64748b;
        margin: 0.5rem 0 0;
        font-size: 0.9rem;
        font-weight: 500;
        }

        /* Filters section alignment */
        .filters-section {
        background: linear-gradient(135deg, white 0%, #f8fafc 100%);
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        margin-bottom: 1.5rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: nowrap; /* Prevent wrapping on larger screens */
        border: 1px solid rgba(226, 232, 240, 0.5);
        }

        /* Search bar flex improvements */
        .search-bar {
        flex: 2; /* Take more space */
        position: relative;
        min-width: 300px;
        }

        .search-bar svg {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #64748b;
        z-index: 2;
        }

        .search-bar input {
        width: 100%;
        padding: 0.875rem 1rem 0.875rem 3rem;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        background: white;
        font-weight: 500;
        box-sizing: border-box;
        }

        .search-bar input:focus {
        outline: none;
        border-color: #1a73e9;
        box-shadow: 0 0 0 3px rgba(26, 115, 233, 0.1);
        }

        /* Filters container */
        .filters {
        height: 100%;
        display: flex;
        gap: 0.75rem;
        flex-shrink: 0; /* Don't shrink */
        align-items: flex-start;
        }

        /* Filter select consistent sizing */
        .filter-select {
        padding: 0.875rem 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 0.95rem;
        background: white;
        width: 160px; /* Fixed width for consistency */
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        }

        .filter-select:focus {
        outline: none;
        border-color: #1a73e9;
        box-shadow: 0 0 0 3px rgba(26, 115, 233, 0.1);
        }

        /* Results info alignment */
        .results-info {
        color: #64748b;
        font-size: 0.95rem;
        margin-bottom: 1rem;
        font-weight: 500;
        padding-left: 0.25rem; /* Align with grid */
        }

        /* Tutors grid - 3 columns fixed */
        .tutors-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Always 3 columns */
        gap: 1.25rem;
        width: 100%;
        max-height: none; /* Remove height constraint */
        padding-bottom: 2rem; /* Add padding at bottom */
        }

        /* Tutor card improvements */
        .tutor-card {
        background: linear-gradient(135deg, white 0%, #f8fafc 100%);
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: all 0.3s ease;
        border: 1px solid rgba(226, 232, 240, 0.5);
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-height: 280px; /* Minimum height for consistency */
        }

        .tutor-card:hover {
        box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
        }

        /* Header alignment fixes */
        .tutor-card-header {
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-bottom: 1px solid rgba(226, 232, 240, 0.5);
        background: linear-gradient(135deg, #fafbfc 0%, white 100%);
        min-height: 80px; /* Fixed height for alignment */
        }

        .tutor-avatar {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1a73e9, #0f5fd4);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 4px 6px -1px rgba(26, 115, 233, 0.3);
        flex-shrink: 0;
        }

        /* Info section alignment */
        .tutor-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        }

        .tutor-name {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 0.5rem;
        word-break: break-word;
        }

        .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.5rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 600;
        }

        .status-badge.active {
        background: linear-gradient(135deg, #dcfce7, #bbf7d0);
        color: #166534;
        border: 1px solid #22c55e;
        }

        .status-badge.inactive {
        background: linear-gradient(135deg, #fee2e2, #fecaca);
        color: #991b1b;
        border: 1px solid #ef4444;
        }

        /* Ensure cards maintain aspect ratio */
        .tutor-card-header .view-details-btn {
        white-space: nowrap;
        flex-shrink: 0;
        }

        .view-details-btn {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.625rem 1rem;
        background: linear-gradient(135deg, #1a73e9, #0f5fd4);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(26, 115, 233, 0.2);
        flex-shrink: 0;
        }

        .view-details-btn:hover {
        background: linear-gradient(135deg, #0f5fd4, #0c4cbd);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(26, 115, 233, 0.3);
        }

        /* Meta section consistent height */
        .tutor-meta {
        padding: 1.25rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        background: rgba(248, 250, 252, 0.5);
        border-bottom: 1px solid rgba(226, 232, 240, 0.5);
        min-height: 100px; /* Fixed height for alignment */
        justify-content: center;
        }

        /* Meta items consistent spacing */
        .meta-item {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        color: #64748b;
        font-size: 0.85rem;
        font-weight: 500;
        min-height: 20px; /* Consistent line height */
        }

        .meta-item svg {
        color: #1a73e9;
        flex-shrink: 0;
        }

        /* Certifications section */
        .certifications-summary {
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid rgba(226, 232, 240, 0.5);
        flex-grow: 1; /* Take remaining space */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        }

        .cert-count {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        margin-bottom: 0.75rem;
        color: #1e293b;
        font-weight: 600;
        font-size: 0.9rem;
        }

        .cert-count svg {
        color: #f59e0b;
        }

        /* Certification preview alignment */
        .cert-preview {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        align-items: center;
        min-height: 24px; /* Prevent layout shift */
        }

        .cert-tag {
        background: linear-gradient(135deg, #dbeafe, #bfdbfe);
        color: #1e40af;
        padding: 0.25rem 0.5rem;
        border-radius: 6px;
        font-size: 0.7rem;
        font-weight: 600;
        border: 1px solid #3b82f6;
        }

        .cert-more {
        background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
        color: #64748b;
        padding: 0.25rem 0.5rem;
        border-radius: 6px;
        font-size: 0.7rem;
        font-weight: 600;
        border: 1px solid #cbd5e1;
        }

        .tutor-details {
        padding: 1.5rem;
        background: linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%);
        animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
        }

        .details-section {
        margin-bottom: 1.5rem;
        }

        .details-section:last-child {
        margin-bottom: 0;
        }

        .details-section h4 {
        font-size: 1rem;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.375rem;
        }

        .details-section h4::before {
        content: '';
        width: 3px;
        height: 16px;
        background: linear-gradient(135deg, #1a73e9, #0f5fd4);
        border-radius: 2px;
        }

        .details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.75rem;
        }

        .detail-item {
        background: white;
        padding: 0.875rem;
        border-radius: 8px;
        border: 1px solid rgba(226, 232, 240, 0.8);
        font-size: 0.8rem;
        word-break: break-word;
        }

        .detail-item strong {
        color: #1e293b;
        display: block;
        margin-bottom: 0.25rem;
        }

        .certifications-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        }

        .certification-item {
        background: white;
        padding: 1.25rem;
        border-radius: 12px;
        border: 1px solid rgba(226, 232, 240, 0.8);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .cert-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.625rem;
        gap: 0.75rem;
        }

        .cert-header h5 {
        font-size: 0.95rem;
        font-weight: 700;
        color: #1e293b;
        margin: 0;
        flex: 1;
        word-break: break-word;
        }

        .cert-badges {
        display: flex;
        gap: 0.375rem;
        flex-shrink: 0;
        flex-wrap: wrap;
        }

        .badge {
        padding: 0.1875rem 0.5rem;
        border-radius: 6px;
        font-size: 0.65rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        }

        .badge.verified {
        background: linear-gradient(135deg, #dcfce7, #bbf7d0);
        color: #166534;
        border: 1px solid #22c55e;
        }

        .badge.can-teach {
        background: linear-gradient(135deg, #dbeafe, #bfdbfe);
        color: #1e40af;
        border: 1px solid #3b82f6;
        }

        .cert-description {
        color: #64748b;
        font-size: 0.8rem;
        margin: 0 0 0.75rem;
        line-height: 1.5;
        }

        .cert-meta {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        }

        .experience {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        color: #f59e0b;
        font-size: 0.8rem;
        font-weight: 600;
        }

        .experience svg {
        color: #f59e0b;
        }

        /* Empty state full width */
        .empty-state {
        text-align: center;
        padding: 3rem 1.5rem;
        color: #64748b;
        background: linear-gradient(135deg, white 0%, #f8fafc 100%);
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(226, 232, 240, 0.5);
        grid-column: 1 / -1; /* Span all columns */
        }

        .empty-state svg {
        color: #cbd5e1;
        margin-bottom: 1rem;
        }

        .empty-state h3 {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 0.5rem;
        }

        .empty-state p {
        margin: 0;
        font-size: 0.95rem;
        }

        .loading-spinner, .error-message {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        font-size: 1.1rem;
        font-weight: 600;
        color: #64748b;
        background: white;
        border-radius: 16px;
        margin: 2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Custom scrollbar for main content */
        .main-content::-webkit-scrollbar {
        width: 8px;
        }

        .main-content::-webkit-scrollbar-track {
        background: rgba(241, 245, 249, 0.5);
        border-radius: 4px;
        }

        .main-content::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #1a73e9, #0f5fd4);
        border-radius: 4px;
        }

        .main-content::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #0f5fd4, #0c4cbd);
        }

        /* Custom Scrollbar for general use */
        ::-webkit-scrollbar {
        width: 6px;
        }

        ::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #1a73e9, #0f5fd4);
        border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #0f5fd4, #0c4cbd);
        }

        /* Focus states for accessibility */
        .view-details-btn:focus,
        .filter-select:focus,
        .search-bar input:focus {
        outline: 2px solid #1a73e9;
        outline-offset: 2px;
        }

        /* Responsive adjustments */
        @media (max-width: 1400px) {
        .tutors-grid {
            grid-template-columns: repeat(2, 1fr); /* 2 columns on smaller screens */
        }
        
        .search-bar {
            min-width: 250px;
        }
        }

        @media (max-width: 1200px) {
        .main-content {
            padding: 0.75rem;
        }
        }

        @media (max-width: 1024px) {
        .main-content {
            margin-left: 0;
            width: 100%;
            padding: 1rem;
        }
        
        .tutors-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .filters-section {
            flex-wrap: wrap;
        }
        
        .search-bar {
            flex: 1;
            min-width: 200px;
        }
        
        .filters {
            width: 100%;
            justify-content: stretch;
        }
        
        .filter-select {
            flex: 1;
            width: auto;
        }
        }

        @media (max-width: 768px) {
        .tutors-grid {
            grid-template-columns: 1fr; /* Single column on mobile */
        }
        
        .tutor-card-header {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
        }
        
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
        }
        
        .stat-card {
            flex-direction: column;
            text-align: center;
            padding: 1.25rem;
        }
        
        .page-title {
            font-size: 1.5rem;
        }
        
        .filters-section {
            flex-direction: column;
            align-items: stretch;
        }
        
        .search-bar {
            width: 100%;
            min-width: auto;
        }
        
        .filters {
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .cert-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .cert-badges {
            align-self: flex-start;
        }
        }

        @media (max-width: 480px) {
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .tutor-card-header, 
        .tutor-meta, 
        .certifications-summary, 
        .tutor-details {
            padding: 1rem;
        }
        
        .header-content {
            padding: 1.5rem;
        }
        
        .page-title {
            font-size: 1.25rem;
        }
        
        .search-bar input {
            font-size: 0.9rem;
        }
        
        .tutors-grid {
            gap: 1rem;
        }
        }
          
        `}</style>
    </div>
  );
}
export default AdminTutorsPage;
