
import React, { useState, useEffect } from 'react';
import { Search, Plus, Heart, MessageCircle, Filter, ChevronLeft, ChevronRight, Send, User, Clock, Bookmark } from 'lucide-react';
import useForumAPI from '../hooks/useForumAPI'; // Adjust path as needed

const TutorifyForum = () => {
  const { 
    posts, 
    loading, 
    error, 
    fetchPosts, 
    fetchPostById, 
    createPost, 
    addFeedback, 
    likePost, 
    clearError 
  } = useForumAPI();

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newFeedback, setNewFeedback] = useState('');
  const [selectedPostDetails, setSelectedPostDetails] = useState(null);
  const [loadingPostDetails, setLoadingPostDetails] = useState(false);
  
  const postsPerPage = 6;

  // Update filtered posts when posts change
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  // Filter and sort posts
  useEffect(() => {
    let filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.numberOfLikes - a.numberOfLikes);
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, sortBy, posts]);

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    return `${Math.floor(diffInHours / 24)} ngày trước`;
  };

  const handleCreatePost = async () => {
    if (newPost.title && newPost.content) {
      const success = await createPost({
        title: newPost.title,
        content: newPost.content
      });
      
      if (success) {
        setNewPost({ title: '', content: '' });
        setShowCreatePost(false);
      }
    }
  };

  const handleLike = async (postId) => {
    await likePost(postId);
  };

  const handleAddFeedback = async (postId) => {
    if (newFeedback.trim()) {
      const success = await addFeedback(postId, {
        reply: newFeedback
      });
      
      if (success) {
        setNewFeedback('');
        // Refresh post details if we're viewing the post
        if (selectedPost && selectedPost._id === postId) {
          const updatedPost = await fetchPostById(postId);
          if (updatedPost) {
            setSelectedPostDetails(updatedPost);
          }
        }
      }
    }
  };

  const handleViewPost = async (post) => {
    setSelectedPost(post);
    setLoadingPostDetails(true);
    
    // Fetch detailed post data
    const postDetails = await fetchPostById(post._id);
    if (postDetails) {
      setSelectedPostDetails(postDetails);
    }
    setLoadingPostDetails(false);
  };

  const handleClosePostDetail = () => {
    setSelectedPost(null);
    setSelectedPostDetails(null);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Clear error when user interacts
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div style={styles.container}>
      {/* Error Display */}
      {error && (
        <div style={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={clearError} style={styles.errorClose}>×</button>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            Tutorify Forum
            <span style={styles.subtitle}>Cộng đồng học tập & chia sẻ kiến thức</span>
          </h1>
          <button 
            style={styles.createButton}
            onClick={() => setShowCreatePost(true)}
          >
            <Plus size={18} />
            Tạo bài viết
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div style={styles.searchContainer}>
        <div style={styles.searchBox}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết, tác giả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.filterContainer}>
          <Filter size={18} style={styles.filterIcon} />
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="popular">Phổ biến</option>
          </select>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <span>Đang tải...</span>
        </div>
      )}

      {/* Posts Grid */}
      <div style={styles.postsGrid}>
        {currentPosts.map(post => (
          <div key={post._id} style={styles.postCard}>
            <div style={styles.postHeader}>
              <div style={styles.authorInfo}>
                <div style={styles.avatar}>
                  {getInitials(post.fullName)}
                </div>
                <div style={styles.authorDetails}>
                  <h4 style={styles.authorName}>{post.fullName}</h4>
                  <span style={styles.postTime}>
                    <Clock size={14} />
                    {formatTime(post.createdAt)}
                  </span>
                </div>
              </div>
              <button style={styles.bookmarkBtn}>
                <Bookmark size={16} />
              </button>
            </div>
            
            <div style={styles.postContent}>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postText}>
                {post.content.length > 150 
                  ? post.content.substring(0, 150) + '...' 
                  : post.content}
              </p>
            </div>

            <div style={styles.postFooter}>
              <div style={styles.postStats}>
                <button 
                  style={styles.statButton}
                  onClick={() => handleLike(post._id)}
                  disabled={loading}
                >
                  <Heart size={16} />
                  <span>{post.numberOfLikes}</span>
                </button>
                <button 
                  style={styles.statButton}
                  onClick={() => handleViewPost(post)}
                >
                  <MessageCircle size={16} />
                  <span>{post.feedback ? post.feedback.length : 0}</span>
                </button>
              </div>
              <button 
                style={styles.readMoreBtn}
                onClick={() => handleViewPost(post)}
              >
                Đọc thêm
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && filteredPosts.length === 0 && (
        <div style={styles.emptyState}>
          <MessageCircle size={48} style={styles.emptyIcon} />
          <h3>Không có bài viết nào</h3>
          <p>Hãy tạo bài viết đầu tiên để bắt đầu thảo luận!</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={{...styles.paginationBtn, ...(currentPage === 1 ? styles.disabled : {})}}
          >
            <ChevronLeft size={16} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              style={{
                ...styles.paginationBtn,
                ...(currentPage === i + 1 ? styles.activePage : {})
              }}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{...styles.paginationBtn, ...(currentPage === totalPages ? styles.disabled : {})}}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Tạo bài viết mới</h2>
              <button 
                style={styles.closeBtn}
                onClick={() => setShowCreatePost(false)}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <input
                type="text"
                placeholder="Tiêu đề bài viết..."
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                style={styles.modalInput}
              />
              <textarea
                placeholder="Nội dung bài viết..."
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                style={styles.modalTextarea}
                rows="6"
              />
              <div style={styles.modalFooter}>
                <button 
                  style={styles.cancelBtn}
                  onClick={() => setShowCreatePost(false)}
                >
                  Hủy
                </button>
                <button 
                  style={styles.submitBtn}
                  onClick={handleCreatePost}
                  disabled={!newPost.title || !newPost.content || loading}
                >
                  {loading ? 'Đang đăng...' : 'Đăng bài'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{selectedPost.title}</h2>
              <button 
                style={styles.closeBtn}
                onClick={handleClosePostDetail}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              {loadingPostDetails ? (
                <div style={styles.loadingContainer}>
                  <div style={styles.spinner}></div>
                  <span>Đang tải chi tiết...</span>
                </div>
              ) : (
                <>
                  <div style={styles.postDetailHeader}>
                    <div style={styles.authorInfo}>
                      <div style={styles.avatar}>
                        {getInitials(selectedPost.fullName)}
                      </div>
                      <div style={styles.authorDetails}>
                        <h4 style={styles.authorName}>{selectedPost.fullName}</h4>
                        <span style={styles.postTime}>
                          <Clock size={14} />
                          {formatTime(selectedPost.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div style={styles.postActions}>
                      <button 
                        style={styles.likeBtn}
                        onClick={() => handleLike(selectedPost._id)}
                        disabled={loading}
                      >
                        <Heart size={16} />
                        {selectedPostDetails ? selectedPostDetails.numberOfLikes : selectedPost.numberOfLikes}
                      </button>
                    </div>
                  </div>
                  
                  <div style={styles.postDetailContent}>
                    <p style={styles.postDetailText}>{selectedPost.content}</p>
                  </div>

                  <div style={styles.feedbackSection}>
                    <h3 style={styles.feedbackTitle}>
                      Phản hồi ({selectedPostDetails ? selectedPostDetails.feedback.length : selectedPost.feedback?.length || 0})
                    </h3>
                    
                    <div style={styles.feedbackInput}>
                      <input
                        type="text"
                        placeholder="Thêm phản hồi..."
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                        style={styles.feedbackTextInput}
                      />
                      <button 
                        style={styles.sendBtn}
                        onClick={() => handleAddFeedback(selectedPost._id)}
                        disabled={loading || !newFeedback.trim()}
                      >
                        <Send size={16} />
                      </button>
                    </div>

                    <div style={styles.feedbackList}>
                      {(selectedPostDetails ? selectedPostDetails.feedback : selectedPost.feedback || []).map(feedback => (
                        <div key={feedback._id} style={styles.feedbackItem}>
                          <div style={styles.feedbackAvatar}>
                            {getInitials(feedback.fullName)}
                          </div>
                          <div style={styles.feedbackContent}>
                            <div style={styles.feedbackHeader}>
                              <span style={styles.feedbackAuthor}>{feedback.fullName}</span>
                              <span style={styles.feedbackTime}>
                                {formatTime(feedback.createdAt)}
                              </span>
                            </div>
                            <p style={styles.feedbackText}>{feedback.reply}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    background: 'linear-gradient(135deg, rgb(0,119,255) 0%, rgba(0,119,255,0.8) 100%)',
    color: 'white',
    padding: '2rem 0',
    boxShadow: '0 4px 20px rgba(0,119,255,0.3)'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
  },
  subtitle: {
    display: 'block',
    fontSize: '1rem',
    fontWeight: '300',
    opacity: '0.9',
    marginTop: '0.5rem'
  },
  createButton: {
    background: 'white',
    color: 'rgb(0,119,255)',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255,255,255,0.3)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(255,255,255,0.4)'
    }
  },
  searchContainer: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 2rem',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  searchBox: {
    flex: 1,
    position: 'relative'
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#666'
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    ':focus': {
      outline: 'none',
      borderColor: 'rgb(0,119,255)',
      boxShadow: '0 4px 20px rgba(0,119,255,0.2)'
    }
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '25px',
    border: '2px solid #e0e0e0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  filterIcon: {
    color: '#666'
  },
  filterSelect: {
    border: 'none',
    background: 'transparent',
    fontSize: '1rem',
    cursor: 'pointer',
    outline: 'none',
    color: '#333'
  },
  postsGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '2rem'
  },
  postCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    border: '1px solid #f0f0f0',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 30px rgba(0,119,255,0.2)'
    }
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgb(0,119,255), rgba(0,119,255,0.7))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '1.1rem'
  },
  authorDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  authorName: {
    margin: '0',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#333'
  },
  postTime: {
    fontSize: '0.8rem',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem'
  },
  bookmarkBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    padding: '0.5rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#f0f0f0',
      color: 'rgb(0,119,255)'
    }
  },
  postContent: {
    marginBottom: '1.5rem'
  },
  postTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 0.75rem 0',
    lineHeight: '1.4'
  },
  postText: {
    fontSize: '0.95rem',
    color: '#666',
    lineHeight: '1.6',
    margin: '0'
  },
  postFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid #f0f0f0'
  },
  postStats: {
    display: 'flex',
    gap: '1rem'
  },
  statButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#666',
    fontSize: '0.9rem',
    padding: '0.5rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#f0f0f0',
      color: 'rgb(0,119,255)'
    }
  },
  readMoreBtn: {
    background: 'rgb(0,119,255)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(0,119,255,0.8)',
      transform: 'scale(1.05)'
    }
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '3rem 0 2rem 0'
  },
  paginationBtn: {
    background: 'white',
    border: '2px solid #e0e0e0',
    padding: '0.5rem 0.75rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '40px',
    height: '40px',
    ':hover': {
      borderColor: 'rgb(0,119,255)',
      color: 'rgb(0,119,255)'
    }
  },
  activePage: {
    background: 'rgb(0,119,255)',
    color: 'white',
    borderColor: 'rgb(0,119,255)'
  },
  disabled: {
    opacity: '0.5',
    cursor: 'not-allowed'
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem'
  },
  modalContent: {
    background: 'white',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #f0f0f0'
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
    margin: '0'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#666',
    padding: '0',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#f0f0f0'
    }
  },
  modalBody: {
    padding: '2rem'
  },
  modalInput: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '1rem',
    marginBottom: '1rem',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: 'rgb(0,119,255)'
    }
  },
  modalTextarea: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '1rem',
    resize: 'vertical',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: 'rgb(0,119,255)'
    }
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  cancelBtn: {
    background: '#f0f0f0',
    color: '#666',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#e0e0e0'
    }
  },
  submitBtn: {
    background: 'rgb(0,119,255)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(0,119,255,0.8)'
    },
    ':disabled': {
      opacity: '0.5',
      cursor: 'not-allowed'
    }
  },
  postDetailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  postActions: {
    display: 'flex',
    gap: '1rem'
  },
  likeBtn: {
    background: 'none',
    border: '2px solid #e0e0e0',
    padding: '0.5rem 1rem',
    borderRadius: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#666',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: 'rgb(0,119,255)',
      color: 'rgb(0,119,255)',
      background: 'rgba(0,119,255,0.1)'
    }
  },
  postDetailContent: {
    marginBottom: '2rem'
  },
  postDetailText: {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    color: '#333',
    margin: '0'
  },
  feedbackSection: {
    borderTop: '1px solid #f0f0f0',
    paddingTop: '1.5rem'
  },
  feedbackTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 1rem 0'
  },
  feedbackInput: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    alignItems: 'center'
  },
  feedbackTextInput: {
    flex: 1,
    padding: '0.75rem',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: 'rgb(0,119,255)'
    }
  },
  sendBtn: {
    background: 'rgb(0,119,255)',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    width: '45px',
    height: '45px',
    ':hover': {
      background: 'rgba(0,119,255,0.8)',
      transform: 'scale(1.05)'
    }
  },
  feedbackList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  feedbackItem: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1rem',
    background: '#f9f9f9',
    borderRadius: '15px',
    border: '1px solid #f0f0f0'
  },
  feedbackAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgb(0,119,255), rgba(0,119,255,0.7))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '0.9rem',
    flexShrink: 0
  },
  feedbackContent: {
    flex: 1
  },
  feedbackHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  feedbackAuthor: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#333'
  },
  feedbackTime: {
    fontSize: '0.8rem',
    color: '#666'
  },
  feedbackText: {
    fontSize: '0.95rem',
    color: '#555',
    lineHeight: '1.5',
    margin: '0'
  }
};

export default TutorifyForum;