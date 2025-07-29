import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Heart,
  MessageCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
  Send,
  User,
  Clock,
  Bookmark,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import useForumAPI from "../hooks/useForumAPI"; // Adjust path as needed
import useAuthStore from "../hooks/authenStoreApi"; // Import authentication store

const TutorifyForum = () => {
  const {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    createPost,
    updatePost,
    deletePost,
    addFeedback,
    likePost,
    clearError,
  } = useForumAPI();

  // Authentication store
  const { user, token } = useAuthStore();

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editPost, setEditPost] = useState({ title: "", content: "" });
  const [newFeedback, setNewFeedback] = useState("");
  const [selectedPostDetails, setSelectedPostDetails] = useState(null);
  const [loadingPostDetails, setLoadingPostDetails] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(null);

  const postsPerPage = 6;

  // Check if current user is the owner of the post
  const isPostOwner = (post) => {
    return user && post.accountId === user.id;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user && token;
  };

  // Update filtered posts when posts change
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  // Filter and sort posts
  useEffect(() => {
    let filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => b.numberOfLikes - a.numberOfLikes);
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, sortBy, posts]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Vừa xong";
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    return `${Math.floor(diffInHours / 24)} ngày trước`;
  };

  const handleCreatePost = async () => {
    if (!isAuthenticated()) {
      alert("Vui lòng đăng nhập để tạo bài viết");
      return;
    }

    if (newPost.title && newPost.content) {
      const success = await createPost({
        title: newPost.title,
        content: newPost.content,
      });

      if (success) {
        setNewPost({ title: "", content: "" });
        setShowCreatePost(false);
      }
    }
  };

  const handleEditPost = async () => {
    if (!isAuthenticated()) {
      alert("Vui lòng đăng nhập để chỉnh sửa bài viết");
      return;
    }

    if (!isPostOwner(editingPost)) {
      alert("Bạn chỉ có thể chỉnh sửa bài viết của mình");
      return;
    }

    if (editPost.title && editPost.content && editingPost) {
      const success = await updatePost(editingPost._id, {
        title: editPost.title,
        content: editPost.content,
      });

      if (success) {
        setEditPost({ title: "", content: "" });
        setShowEditPost(false);
        setEditingPost(null);

        // If we're viewing the post details, refresh them
        if (selectedPost && selectedPost._id === editingPost._id) {
          const updatedPost = await fetchPostById(editingPost._id);
          if (updatedPost) {
            setSelectedPost(updatedPost);
            setSelectedPostDetails(updatedPost);
          }
        }
      }
    }
  };

  const handleDeletePost = async () => {
    if (!isAuthenticated()) {
      alert("Vui lòng đăng nhập để xóa bài viết");
      return;
    }

    if (!isPostOwner(postToDelete)) {
      alert("Bạn chỉ có thể xóa bài viết của mình");
      return;
    }

    if (postToDelete) {
      const success = await deletePost(postToDelete._id);

      if (success) {
        setShowDeleteConfirm(false);
        setPostToDelete(null);

        // If we're viewing the deleted post, close the modal
        if (selectedPost && selectedPost._id === postToDelete._id) {
          setSelectedPost(null);
          setSelectedPostDetails(null);
        }
      }
    }
  };

  const handleLike = async (postId) => {
    if (!isAuthenticated()) {
      alert("Vui lòng đăng nhập để thích bài viết");
      return;
    }
    await likePost(postId);
  };

  const handleAddFeedback = async (postId) => {
    if (!isAuthenticated()) {
      alert("Vui lòng đăng nhập để phản hồi");
      return;
    }

    if (newFeedback.trim()) {
      const success = await addFeedback(postId, {
        reply: newFeedback,
      });

      if (success) {
        setNewFeedback("");
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

  const handleShowEditModal = (post) => {
    if (!isPostOwner(post)) {
      alert("Bạn chỉ có thể chỉnh sửa bài viết của mình");
      return;
    }
    setEditingPost(post);
    setEditPost({ title: post.title, content: post.content });
    setShowEditPost(true);
    setShowPostMenu(null);
  };

  const handleShowDeleteConfirm = (post) => {
    if (!isPostOwner(post)) {
      alert("Bạn chỉ có thể xóa bài viết của mình");
      return;
    }
    setPostToDelete(post);
    setShowDeleteConfirm(true);
    setShowPostMenu(null);
  };

  const handlePostMenuToggle = (postId) => {
    setShowPostMenu(showPostMenu === postId ? null : postId);
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

  // CSS Styles
  const styles = {
    container: {
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    errorBanner: {
      backgroundColor: "#dc3545",
      color: "white",
      padding: "12px 20px",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    errorClose: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "20px",
      cursor: "pointer",
    },
    header: {
      marginBottom: "30px",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    headerContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#333",
      margin: "0",
    },
    subtitle: {
      display: "block",
      fontSize: "14px",
      color: "#666",
      fontWeight: "normal",
      marginTop: "4px",
    },
    createButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "16px",
      fontWeight: "500",
      transition: "background-color 0.3s",
    },
    searchContainer: {
      display: "flex",
      gap: "20px",
      marginBottom: "30px",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    searchBox: {
      flex: 1,
      position: "relative",
    },
    searchIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#666",
    },
    searchInput: {
      width: "100%",
      padding: "12px 12px 12px 40px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "16px",
      outline: "none",
    },
    filterContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    filterIcon: {
      color: "#666",
    },
    filterSelect: {
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "16px",
      outline: "none",
      backgroundColor: "white",
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "12px",
      padding: "40px",
      color: "#666",
    },
    spinner: {
      width: "20px",
      height: "20px",
      border: "2px solid #f3f3f3",
      borderTop: "2px solid #007bff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    postsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    },
    postCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "box-shadow 0.3s",
    },
    postHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
    },
    authorInfo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#007bff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "14px",
      fontWeight: "bold",
    },
    authorDetails: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    },
    authorName: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#333",
      margin: "0",
    },
    postTime: {
      fontSize: "12px",
      color: "#666",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    postActions: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    bookmarkBtn: {
      background: "none",
      border: "none",
      color: "#666",
      cursor: "pointer",
      padding: "8px",
      borderRadius: "6px",
      transition: "background-color 0.3s",
    },
    postMenuContainer: {
      position: "relative",
    },
    postMenuBtn: {
      background: "none",
      border: "none",
      color: "#666",
      cursor: "pointer",
      padding: "8px",
      borderRadius: "6px",
      transition: "background-color 0.3s",
    },
    postMenu: {
      position: "absolute",
      top: "100%",
      right: "0",
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: 1000,
      minWidth: "120px",
      overflow: "hidden",
    },
    postMenuItem: {
      width: "100%",
      padding: "12px 16px",
      border: "none",
      background: "none",
      textAlign: "left",
      cursor: "pointer",
      fontSize: "14px",
      color: "#333",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "background-color 0.3s",
    },
    postContent: {
      marginBottom: "15px",
    },
    postTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "8px",
      lineHeight: "1.4",
    },
    postText: {
      fontSize: "14px",
      color: "#666",
      lineHeight: "1.5",
      margin: "0",
    },
    postFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "15px",
      borderTop: "1px solid #eee",
    },
    postStats: {
      display: "flex",
      gap: "16px",
    },
    statButton: {
      background: "none",
      border: "none",
      color: "#666",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "14px",
      padding: "6px 8px",
      borderRadius: "6px",
      transition: "background-color 0.3s",
    },
    readMoreBtn: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.3s",
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#666",
    },
    emptyIcon: {
      marginBottom: "16px",
      opacity: 0.5,
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      marginTop: "30px",
    },
    paginationBtn: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      backgroundColor: "white",
      color: "#333",
      cursor: "pointer",
      borderRadius: "6px",
      transition: "all 0.3s",
    },
    activePage: {
      backgroundColor: "#007bff",
      color: "white",
      borderColor: "#007bff",
    },
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "12px",
      width: "90%",
      maxWidth: "600px",
      maxHeight: "80vh",
      overflow: "auto",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 24px",
      borderBottom: "1px solid #eee",
    },
    modalTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#333",
      margin: "0",
    },
    closeBtn: {
      background: "none",
      border: "none",
      fontSize: "24px",
      color: "#666",
      cursor: "pointer",
      padding: "4px",
    },
    modalBody: {
      padding: "24px",
    },
    modalInput: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "16px",
      marginBottom: "16px",
      outline: "none",
    },
    modalTextarea: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "16px",
      resize: "vertical",
      outline: "none",
    },
    modalFooter: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "20px",
    },
    cancelBtn: {
      padding: "10px 20px",
      border: "1px solid #ddd",
      backgroundColor: "white",
      color: "#666",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
    },
    submitBtn: {
      padding: "10px 20px",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
    deleteBtn: {
      padding: "10px 20px",
      border: "none",
      backgroundColor: "#dc3545",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
    warningText: {
      color: "#dc3545",
      fontSize: "14px",
      marginTop: "8px",
    },
    postDetailHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      paddingBottom: "15px",
      borderBottom: "1px solid #eee",
    },
    postDetailContent: {
      marginBottom: "30px",
    },
    postDetailText: {
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#333",
    },
    likeBtn: {
      background: "none",
      border: "none",
      color: "#666",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "14px",
      padding: "6px 12px",
      borderRadius: "6px",
      transition: "background-color 0.3s",
    },
    feedbackSection: {
      borderTop: "1px solid #eee",
      paddingTop: "20px",
    },
    feedbackTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "16px",
    },
    feedbackInput: {
      display: "flex",
      gap: "12px",
      marginBottom: "20px",
    },
    feedbackTextInput: {
      flex: 1,
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
    },
    sendBtn: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "12px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    feedbackList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    feedbackItem: {
      display: "flex",
      gap: "12px",
      padding: "12px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
    },
    feedbackAvatar: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#007bff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "12px",
      fontWeight: "bold",
      flexShrink: 0,
    },
    feedbackContent: {
      flex: 1,
    },
    feedbackHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "6px",
    },
    feedbackAuthor: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#333",
    },
    feedbackTime: {
      fontSize: "12px",
      color: "#666",
    },
    feedbackText: {
      fontSize: "14px",
      color: "#333",
      lineHeight: "1.4",
      margin: "0",
    },
  };

  return (
    <div style={styles.container}>
      {/* Error Display */}
      {error && (
        <div style={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={clearError} style={styles.errorClose}>
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            Tutorify Forum
            <span style={styles.subtitle}>
              Cộng đồng học tập & chia sẻ kiến thức
            </span>
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
        {currentPosts.map((post) => (
          <div key={post._id} style={styles.postCard}>
            <div style={styles.postHeader}>
              <div style={styles.authorInfo}>
                <div style={styles.avatar}>{getInitials(post.fullName)}</div>
                <div style={styles.authorDetails}>
                  <h4 style={styles.authorName}>{post.fullName}</h4>
                  <span style={styles.postTime}>
                    <Clock size={14} />
                    {formatTime(post.createdAt)}
                  </span>
                </div>
              </div>
              <div style={styles.postActions}>
                <button style={styles.bookmarkBtn}>
                  <Bookmark size={16} />
                </button>
                {isAuthenticated() && isPostOwner(post) && (
                  <div style={styles.postMenuContainer}>
                    <button
                      style={styles.postMenuBtn}
                      onClick={() => handlePostMenuToggle(post._id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {showPostMenu === post._id && (
                      <div style={styles.postMenu}>
                        <button
                          style={styles.postMenuItem}
                          onClick={() => handleShowEditModal(post)}
                        >
                          <Edit size={14} />
                          Chỉnh sửa
                        </button>
                        <button
                          style={styles.postMenuItem}
                          onClick={() => handleShowDeleteConfirm(post)}
                        >
                          <Trash2 size={14} />
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div style={styles.postContent}>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postText}>
                {post.content.length > 150
                  ? post.content.substring(0, 150) + "..."
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
          <p>Hãy tạo bài viết đầu tiên của bạn!</p>
        </div>
      )}

      {/* Pagination */}
      {filteredPosts.length > 0 && (
        <div style={styles.pagination}>
          <button
            style={{
              ...styles.paginationBtn,
              ...(currentPage === 1 ? styles.disabled : {}),
            }}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              style={{
                ...styles.paginationBtn,
                ...(currentPage === index + 1 ? styles.activePage : {}),
              }}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            style={{
              ...styles.paginationBtn,
              ...(currentPage === totalPages ? styles.disabled : {}),
            }}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
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
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                style={styles.modalInput}
              />
              <textarea
                placeholder="Nội dung bài viết..."
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                rows="6"
                style={styles.modalTextarea}
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
                  disabled={!newPost.title || !newPost.content}
                >
                  Tạo bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {showEditPost && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Chỉnh sửa bài viết</h2>
              <button
                style={styles.closeBtn}
                onClick={() => setShowEditPost(false)}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <input
                type="text"
                placeholder="Tiêu đề bài viết..."
                value={editPost.title}
                onChange={(e) =>
                  setEditPost({ ...editPost, title: e.target.value })
                }
                style={styles.modalInput}
              />
              <textarea
                placeholder="Nội dung bài viết..."
                value={editPost.content}
                onChange={(e) =>
                  setEditPost({ ...editPost, content: e.target.value })
                }
                rows="6"
                style={styles.modalTextarea}
              />
              <div style={styles.modalFooter}>
                <button
                  style={styles.cancelBtn}
                  onClick={() => setShowEditPost(false)}
                >
                  Hủy
                </button>
                <button
                  style={styles.submitBtn}
                  onClick={handleEditPost}
                  disabled={!editPost.title || !editPost.content}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Xác nhận xóa</h2>
              <button
                style={styles.closeBtn}
                onClick={() => setShowDeleteConfirm(false)}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <p>Bạn có chắc chắn muốn xóa bài viết này?</p>
              <p style={styles.warningText}>
                Hành động này không thể hoàn tác!
              </p>
              <div style={styles.modalFooter}>
                <button
                  style={styles.cancelBtn}
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Hủy
                </button>
                <button style={styles.deleteBtn} onClick={handleDeletePost}>
                  Xóa bài viết
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
              <h2 style={styles.modalTitle}>Chi tiết bài viết</h2>
              <button style={styles.closeBtn} onClick={handleClosePostDetail}>
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              {loadingPostDetails ? (
                <div style={styles.loadingContainer}>
                  <div style={styles.spinner}></div>
                  <span>Đang tải...</span>
                </div>
              ) : selectedPostDetails ? (
                <>
                  <div style={styles.postDetailHeader}>
                    <div style={styles.authorInfo}>
                      <div style={styles.avatar}>
                        {getInitials(selectedPostDetails.fullName)}
                      </div>
                      <div style={styles.authorDetails}>
                        <h4 style={styles.authorName}>
                          {selectedPostDetails.fullName}
                        </h4>
                        <span style={styles.postTime}>
                          <Clock size={14} />
                          {formatTime(selectedPostDetails.createdAt)}
                        </span>
                      </div>
                    </div>
                    <button
                      style={styles.likeBtn}
                      onClick={() => handleLike(selectedPostDetails._id)}
                      disabled={loading}
                    >
                      <Heart size={16} />
                      <span>{selectedPostDetails.numberOfLikes}</span>
                    </button>
                  </div>

                  <div style={styles.postDetailContent}>
                    <h3 style={styles.postTitle}>
                      {selectedPostDetails.title}
                    </h3>
                    <div style={styles.postDetailText}>
                      {selectedPostDetails.content
                        .split("\n")
                        .map((paragraph, index) => (
                          <p key={index} style={{ marginBottom: "12px" }}>
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>

                  <div style={styles.feedbackSection}>
                    <h4 style={styles.feedbackTitle}>
                      Phản hồi (
                      {selectedPostDetails.feedback
                        ? selectedPostDetails.feedback.length
                        : 0}
                      )
                    </h4>

                    {isAuthenticated() && (
                      <div style={styles.feedbackInput}>
                        <input
                          type="text"
                          placeholder="Viết phản hồi..."
                          value={newFeedback}
                          onChange={(e) => setNewFeedback(e.target.value)}
                          style={styles.feedbackTextInput}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleAddFeedback(selectedPostDetails._id);
                            }
                          }}
                        />
                        <button
                          style={styles.sendBtn}
                          onClick={() =>
                            handleAddFeedback(selectedPostDetails._id)
                          }
                          disabled={!newFeedback.trim() || loading}
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    )}

                    <div style={styles.feedbackList}>
                      {selectedPostDetails.feedback &&
                        selectedPostDetails.feedback.map((feedback, index) => (
                          <div key={index} style={styles.feedbackItem}>
                            <div style={styles.feedbackAvatar}>
                              {getInitials(feedback.fullName)}
                            </div>
                            <div style={styles.feedbackContent}>
                              <div style={styles.feedbackHeader}>
                                <span style={styles.feedbackAuthor}>
                                  {feedback.fullName}
                                </span>
                                <span style={styles.feedbackTime}>
                                  {formatTime(feedback.createdAt)}
                                </span>
                              </div>
                              <p style={styles.feedbackText}>
                                {feedback.reply}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                <div style={styles.emptyState}>
                  <p>Không thể tải chi tiết bài viết</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .post-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .create-button:hover {
          background-color: #0056b3;
        }

        .read-more-btn:hover {
          background-color: #0056b3;
        }

        .stat-button:hover {
          background-color: #f8f9fa;
        }

        .bookmark-btn:hover {
          background-color: #f8f9fa;
        }

        .post-menu-btn:hover {
          background-color: #f8f9fa;
        }

        .post-menu-item:hover {
          background-color: #f8f9fa;
        }

        .pagination-btn:hover:not(.disabled) {
          background-color: #f8f9fa;
        }

        .like-btn:hover {
          background-color: #f8f9fa;
        }

        .send-btn:hover {
          background-color: #0056b3;
        }

        .submit-btn:hover {
          background-color: #0056b3;
        }

        .delete-btn:hover {
          background-color: #c82333;
        }

        .cancel-btn:hover {
          background-color: #f8f9fa;
        }

        .search-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        .filter-select:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        .modal-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        .modal-textarea:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        .feedback-text-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
      `}</style>
    </div>
  );
};

export default TutorifyForum;
