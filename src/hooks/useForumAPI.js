import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../configs/axios.js';

const useForumAPI = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/forum');
      // Sắp xếp bài viết theo thời gian mới nhất khi tải
      const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(sortedPosts);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi tải bài viết');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPostById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/forum/${id}`);
      return response.data.data; // API trả về trong { message, data }
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi tải chi tiết bài viết');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      setLoading(true);
      setError(null);
      await axiosInstance.post('/forum', postData);
      await fetchPosts(); // Tải lại danh sách sau khi tạo
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi tạo bài viết');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // ADDED: Hàm cập nhật bài viết
  // ==========================================================
  const updatePost = async (postId, postData) => {
    try {
      setLoading(true);
      setError(null);
      await axiosInstance.put(`/forum/${postId}`, postData);
      await fetchPosts(); // Tải lại danh sách sau khi cập nhật
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi cập nhật bài viết');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // ADDED: Hàm xóa bài viết
  // ==========================================================
  const deletePost = async (postId) => {
    try {
      setLoading(true);
      setError(null);
      await axiosInstance.delete(`/forum/${postId}`);
      await fetchPosts(); // Tải lại danh sách sau khi xóa
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi xóa bài viết');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addFeedback = async (postId, feedbackData) => {
    try {
      setLoading(true);
      setError(null);
      await axiosInstance.post(`/forum/${postId}/feedback`, feedbackData);
      await fetchPosts();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi thêm phản hồi');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId) => {
    try {
      // Không bật loading cho like để trải nghiệm mượt hơn
      await axiosInstance.put(`/forum/${postId}/like`);
      await fetchPosts();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi thích bài viết');
      return false;
    } finally {
      // setLoading(false);
    }
  };
  
  const clearError = () => setError(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    createPost,
    updatePost, // ADDED
    deletePost, // ADDED
    addFeedback,
    likePost,
    clearError,
  };
};

export default useForumAPI;