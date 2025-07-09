import { useState, useEffect } from 'react';
import axiosInstance from '../configs/axios.js'; // Đường dẫn đến file axios của bạn

const useForumAPI = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy tất cả posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/forum');
      setPosts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi tải posts');
    } finally {
      setLoading(false);
    }
  };

  // Lấy chi tiết một post
  const fetchPostById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/forum/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi tải post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Tạo post mới
  const createPost = async (postData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post('/forum', postData);
      
      // Cập nhật danh sách posts
      await fetchPosts();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi tạo post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật post
  const updatePost = async (postId, postData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put(`/forum/${postId}`, postData);
      
      // Cập nhật danh sách posts để reflect thay đổi
      await fetchPosts();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi cập nhật post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Xóa post
  const deletePost = async (postId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.delete(`/forum/${postId}`);
      
      // Cập nhật danh sách posts để reflect thay đổi
      await fetchPosts();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi xóa post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Thêm feedback
  const addFeedback = async (postId, feedbackData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post(`/forum/${postId}/feedback`, feedbackData);
      
      // Cập nhật danh sách posts để reflect thay đổi
      await fetchPosts();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi thêm feedback');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Like post
  const likePost = async (postId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put(`/forum/${postId}/like`);
      
      // Cập nhật danh sách posts để reflect thay đổi
      await fetchPosts();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi like post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load posts khi component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return {
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
    clearError: () => setError(null)
  };
};

export default useForumAPI;