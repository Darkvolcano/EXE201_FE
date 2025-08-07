import React, { useState, useEffect } from "react";
import {
  Search, Plus, Heart, MessageCircle, Filter,
  ChevronLeft, ChevronRight, Send, Clock,
  Bookmark, Edit, Trash2, MoreVertical
} from "lucide-react";
import useForumAPI from "../hooks/useForumAPI";
import useAuthStore from "../hooks/authenStoreApi";
import "../style/Forum.css";

const Forum = () => {
  const {
    posts, loading, error,
    fetchPosts, fetchPostById, createPost, updatePost, deletePost,
    addFeedback, likePost, clearError
  } = useForumAPI();

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

  const isPostOwner = (post) => user && post.accountId === user.id;
  const isAuthenticated = () => user && token;

  useEffect(() => setFilteredPosts(posts), [posts]);

  useEffect(() => {
    let filtered = posts.filter(
      post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortBy === "newest") filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === "oldest") filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (sortBy === "popular") filtered.sort((a, b) => b.numberOfLikes - a.numberOfLikes);
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, sortBy, posts]);

  const getInitials = (name) => name
    .split(" ").map((word) => word[0]).join("").toUpperCase();

  const formatTime = (dateString) => {
    const date = new Date(dateString), now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Vừa xong";
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    return `${Math.floor(diffInHours / 24)} ngày trước`;
  };

  // --- Handlers: (These are unchanged! Copy your own logic as needed) ---
  const handleCreatePost = async () => {
    if (!isAuthenticated()) return alert("Vui lòng đăng nhập để tạo bài viết");
    if (newPost.title && newPost.content) {
      const success = await createPost({ title: newPost.title, content: newPost.content });
      if (success) {
        setNewPost({ title: "", content: "" }); setShowCreatePost(false);
      }
    }
  };

  const handleEditPost = async () => {
    if (!isAuthenticated()) return alert("Vui lòng đăng nhập để chỉnh sửa bài viết");
    if (!isPostOwner(editingPost)) return alert("Bạn chỉ có thể chỉnh sửa bài viết của mình");
    if (editPost.title && editPost.content && editingPost) {
      const success = await updatePost(editingPost._id, { title: editPost.title, content: editPost.content });
      if (success) {
        setEditPost({ title: "", content: "" }); setShowEditPost(false); setEditingPost(null);
        if (selectedPost && selectedPost._id === editingPost._id) {
          const updatedPost = await fetchPostById(editingPost._id);
          if (updatedPost) { setSelectedPost(updatedPost); setSelectedPostDetails(updatedPost);}
        }
      }
    }
  };

  const handleDeletePost = async () => {
    if (!isAuthenticated()) return alert("Vui lòng đăng nhập để xóa bài viết");
    if (!isPostOwner(postToDelete)) return alert("Bạn chỉ có thể xóa bài viết của mình");
    if (postToDelete) {
      const success = await deletePost(postToDelete._id);
      if (success) {
        setShowDeleteConfirm(false); setPostToDelete(null);
        if (selectedPost && selectedPost._id === postToDelete._id) {
          setSelectedPost(null); setSelectedPostDetails(null);
        }
      }
    }
  };

  const handleLike = async (postId) => {
    if (!isAuthenticated()) return alert("Vui lòng đăng nhập để thích bài viết");
    await likePost(postId);
  };

  const handleAddFeedback = async (postId) => {
    if (!isAuthenticated()) return alert("Vui lòng đăng nhập để phản hồi");
    if (newFeedback.trim()) {
      const success = await addFeedback(postId, { reply: newFeedback });
      if (success) {
        setNewFeedback("");
        if (selectedPost && selectedPost._id === postId) {
          const updatedPost = await fetchPostById(postId);
          if (updatedPost) setSelectedPostDetails(updatedPost);
        }
      }
    }
  };

  const handleViewPost = async (post) => {
    setSelectedPost(post); setLoadingPostDetails(true);
    const postDetails = await fetchPostById(post._id);
    if (postDetails) setSelectedPostDetails(postDetails);
    setLoadingPostDetails(false);
  };

  const handleClosePostDetail = () => {
    setSelectedPost(null); setSelectedPostDetails(null);
  };

  const handleShowEditModal = (post) => {
    if (!isPostOwner(post)) return alert("Bạn chỉ có thể chỉnh sửa bài viết của mình");
    setEditingPost(post); setEditPost({ title: post.title, content: post.content }); setShowEditPost(true); setShowPostMenu(null);
  };

  const handleShowDeleteConfirm = (post) => {
    if (!isPostOwner(post)) return alert("Bạn chỉ có thể xóa bài viết của mình");
    setPostToDelete(post); setShowDeleteConfirm(true); setShowPostMenu(null);
  };

  const handlePostMenuToggle = (postId) => setShowPostMenu(showPostMenu === postId ? null : postId);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div className="forum-root">
      {error && (
        <div className="forum-error-banner">
          <span>{error}</span>
          <button className="forum-error-close" onClick={clearError}>×</button>
        </div>
      )}

      <header className="forum-header">
        <div className="forum-header-content">
          <div>
            <h1 className="forum-title">Tutorify Forum</h1>
            <span className="forum-subtitle">Cộng đồng học tập & chia sẻ kiến thức</span>
          </div>
          <button className="forum-create-btn" onClick={() => setShowCreatePost(true)}>
            <Plus size={18} /> Tạo bài viết
          </button>
        </div>
      </header>

      <section className="forum-controls">
        <div className="forum-search">
          <Search size={20} className="forum-search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết, tác giả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="forum-search-input"
          />
        </div>
        <div className="forum-sort">
          <Filter size={18} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="forum-sort-select">
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="popular">Phổ biến</option>
          </select>
        </div>
      </section>

      {loading && (
        <div className="forum-loading">
          <div className="forum-spinner"></div>
          <span>Đang tải...</span>
        </div>
      )}

      {!loading && (
        <section className="forum-posts-grid">
          {currentPosts.length === 0 ? (
            <div className="forum-empty">
              <MessageCircle size={54} />
              <h3>Không có bài viết nào</h3>
              <p>Hãy tạo bài viết đầu tiên của bạn!</p>
            </div>
          ) : (
            currentPosts.map(post => (
              <div key={post._id} className="forum-post-card">
                <div className="forum-post-header">
                  <div className="forum-author">
                    <div className="forum-avatar">{getInitials(post.fullName)}</div>
                    <div>
                      <span className="forum-author-name">{post.fullName}</span>
                      <span className="forum-post-time"><Clock size={14} /> {formatTime(post.createdAt)}</span>
                    </div>
                  </div>
                  <div className="forum-post-actions">
                    <button className="forum-bookmark-btn"><Bookmark size={16} /></button>
                    {isAuthenticated() && isPostOwner(post) && (
                      <div className="forum-post-menu-wrap">
                        <button className="forum-post-menu-btn" onClick={() => handlePostMenuToggle(post._id)}>
                          <MoreVertical size={16} />
                        </button>
                        {showPostMenu === post._id && (
                          <div className="forum-post-menu">
                            <button onClick={() => handleShowEditModal(post)}>
                              <Edit size={14} /> Chỉnh sửa
                            </button>
                            <button onClick={() => handleShowDeleteConfirm(post)}>
                              <Trash2 size={14} /> Xóa
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="forum-post-content">
                  <h3>{post.title}</h3>
                  <p>
                    {post.content.length > 150 ? post.content.substring(0, 150) + "..." : post.content}
                  </p>
                </div>
                <div className="forum-post-footer">
                  <div className="forum-post-stats">
                    <button className="forum-stat-btn" onClick={() => handleLike(post._id)} disabled={loading}>
                      <Heart size={16} /> {post.numberOfLikes}
                    </button>
                    <button className="forum-stat-btn" onClick={() => handleViewPost(post)}>
                      <MessageCircle size={16} /> {post.feedback ? post.feedback.length : 0}
                    </button>
                  </div>
                  <button className="forum-readmore-btn" onClick={() => handleViewPost(post)}>Đọc thêm</button>
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* Pagination */}
      {!loading && filteredPosts.length > 0 && (
        <div className="forum-pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="forum-pagination-btn">
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`forum-pagination-btn${currentPage === i + 1 ? " active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="forum-pagination-btn">
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* --- Modals Use the same business logic but use these classes for layout: --- */}
      

      {/* CREATE POST MODAL */}
{showCreatePost && (
  <div
    className="forum-modal-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="create-post-title"
  >
    <div className="forum-modal-content">
      <header className="modal-header">
        <h2 id="create-post-title">Tạo bài viết mới</h2>
        <button
          className="forum-modal-close"
          onClick={() => setShowCreatePost(false)}
          aria-label="Đóng"
        >
          ×
        </button>
      </header>
      <main className="modal-body">
        <input
          type="text"
          className="modal-input"
          placeholder="Tiêu đề bài viết..."
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          aria-required="true"
          autoFocus
        />
        <textarea
          className="modal-textarea"
          placeholder="Nội dung bài viết..."
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          rows={8}
          aria-required="true"
        />
      </main>
      <footer className="modal-footer">
        <button
          className="btn btn-cancel"
          onClick={() => setShowCreatePost(false)}
        >
          Hủy
        </button>
        <button
          className="btn btn-submit"
          onClick={handleCreatePost}
          disabled={!newPost.title.trim() || !newPost.content.trim()}
          aria-disabled={!newPost.title.trim() || !newPost.content.trim()}
        >
          Tạo bài viết
        </button>
      </footer>
    </div>
  </div>
)}



      {/* EDIT POST MODAL */}
      {showEditPost && (
        <div className="forum-modal-overlay">
          <div className="forum-modal-content">
            <div className="modal-header">
              <h2>Chỉnh sửa bài viết</h2>
              <button className="forum-modal-close" onClick={() => setShowEditPost(false)}>×</button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Tiêu đề bài viết..."
                value={editPost.title}
                onChange={e => setEditPost({ ...editPost, title: e.target.value })}
                className="modal-input"
              />
              <textarea
                placeholder="Nội dung bài viết..."
                value={editPost.content}
                onChange={e => setEditPost({ ...editPost, content: e.target.value })}
                rows={6}
                className="modal-textarea"
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancel" onClick={() => setShowEditPost(false)}>Hủy</button>
              <button
                className="btn btn-submit"
                onClick={handleEditPost}
                disabled={!editPost.title || !editPost.content}
              >Cập nhật</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {showDeleteConfirm && (
        <div className="forum-modal-overlay">
          <div className="forum-modal-content">
            <div className="modal-header">
              <h2>Xác nhận xóa</h2>
              <button className="forum-modal-close" onClick={() => setShowDeleteConfirm(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn xóa bài viết này?</p>
              <p style={{ color: "#dc3545" }}>Hành động này không thể hoàn tác!</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancel" onClick={() => setShowDeleteConfirm(false)}>Hủy</button>
              <button className="btn btn-delete" onClick={handleDeletePost}>Xóa bài viết</button>
            </div>
          </div>
        </div>
      )}

      {/* POST DETAIL MODAL */}
      {selectedPost && (
        <div className="forum-modal-overlay">
          <div className="forum-modal-content">
            <div className="modal-header">
              <h2>Chi tiết bài viết</h2>
              <button className="forum-modal-close" onClick={handleClosePostDetail}>×</button>
            </div>
            <div className="modal-body">
              {loadingPostDetails ? (
                <div className="forum-loading">
                  <div className="forum-spinner"></div>
                  <span>Đang tải...</span>
                </div>
              ) : selectedPostDetails ? (
                <>
                  <div className="forum-post-header">
                    <div className="forum-author">
                      <div className="forum-avatar">{getInitials(selectedPostDetails.fullName)}</div>
                      <div>
                        <span className="forum-author-name">{selectedPostDetails.fullName}</span>
                        <span className="forum-post-time">
                          <Clock size={14} /> {formatTime(selectedPostDetails.createdAt)}
                        </span>
                      </div>
                    </div>
                    <button className="forum-stat-btn" onClick={() => handleLike(selectedPostDetails._id)}>
                      <Heart size={16} /> {selectedPostDetails.numberOfLikes}
                    </button>
                  </div>
                  <div className="forum-post-content">
                    <h3>{selectedPostDetails.title}</h3>
                    <div style={{color:'#333', lineHeight:'1.6', fontSize:'1rem'}}>
                      {selectedPostDetails.content.split("\n").map((p, i) =>
                        <p key={i} style={{ marginBottom: "12px" }}>{p}</p>
                      )}
                    </div>
                  </div>
                  <div style={{borderTop:"1px solid #ececec", marginTop:"18px", paddingTop:"14px"}}>
                    <h4 style={{margin:"0 0 10px 0"}}>Phản hồi ({selectedPostDetails.feedback ? selectedPostDetails.feedback.length : 0})</h4>
                    {isAuthenticated() && (
                      <div style={{display:"flex",gap: "10px",marginBottom:"10px"}}>
                        <input
                          type="text"
                          placeholder="Viết phản hồi..."
                          value={newFeedback}
                          onChange={(e) => setNewFeedback(e.target.value)}
                          className="modal-input"
                          style={{marginBottom:0}}
                          onKeyPress={(e) => { if (e.key === "Enter") handleAddFeedback(selectedPostDetails._id); }}
                        />
                        <button className="btn btn-submit"
                          onClick={() => handleAddFeedback(selectedPostDetails._id)}
                          disabled={!newFeedback.trim()}>
                          <Send size={18}/>
                        </button>
                      </div>
                    )}
                    <div>
                      {selectedPostDetails.feedback && selectedPostDetails.feedback.map((feedback, idx) => (
                        <div key={idx} style={{
                          display:"flex",alignItems:"center",gap:"10px",padding:"10px",background:"#f6f7fb",borderRadius:"8px",marginBottom:"7px"
                        }}>
                          <div className="forum-avatar" style={{width:34,height:34,fontSize:"13px"}}>{getInitials(feedback.fullName)}</div>
                          <div style={{flex:"1"}}>
                            <div style={{fontWeight:'600', color:'#222'}}>{feedback.fullName}
                              <span className="forum-post-time" style={{marginLeft:8}}>{formatTime(feedback.createdAt)}</span>
                            </div>
                            <div style={{color:'#444'}}>{feedback.reply}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="forum-empty"><p>Không thể tải chi tiết bài viết</p></div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
