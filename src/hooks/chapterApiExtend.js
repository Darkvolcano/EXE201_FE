import { useState } from 'react';
import axiosInstance from '../configs/axios.js';

export const useChapterApi = () => {
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to create a new chapter
  const createChapter = async (chapterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.post('/chapters', chapterData, {
        headers: { 
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        // Handle different response structures
        const newChapter = response.data.data || response.data;
        setChapters(prevChapters => [newChapter, ...prevChapters]);
        return newChapter;
      } else {
        throw new Error('Failed to create chapter');
      }
    } catch (err) {
      console.error('Error creating chapter:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create chapter';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get chapters by course ID
  const getChaptersByCourse = async (courseId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching chapters for courseId:', courseId);
      
      const response = await axiosInstance.get(`/chapters/course/${courseId}`, {
        headers: { 
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Chapters API Response:', response.data);
      
      if (response.data) {
        let chaptersData = [];
        
        if (Array.isArray(response.data)) {
          chaptersData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          chaptersData = response.data.data;
        } else if (response.data.chapters && Array.isArray(response.data.chapters)) {
          chaptersData = response.data.chapters;
        }
        
        setChapters(chaptersData);
        return chaptersData;
      } else {
        throw new Error('No data received from server');
      }
    } catch (err) {
      console.error('Error fetching chapters:', err);
      
      if (err.response) {
        const statusCode = err.response.status;
        const errorMessage = err.response.data?.message || err.response.data?.error || `Server error (${statusCode})`;
        
        if (statusCode === 404) {
          setError('No chapters found for this course.');
          setChapters([]);
          return [];
        } else if (statusCode === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (statusCode === 403) {
          setError('Access denied. You don\'t have permission to view these chapters.');
        } else {
          setError(errorMessage);
        }
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'An unexpected error occurred');
      }
      
      if (err.response?.status === 404) {
        return [];
      }
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh chapters
  const refreshChapters = async (courseId) => {
    try {
      await getChaptersByCourse(courseId);
    } catch (error) {
      console.error('Error refreshing chapters:', error);
    }
  };

  // Function to clear error
  const clearError = () => {
    setError(null);
  };

  return {
    chapters,
    isLoading,
    error,
    createChapter,
    getChaptersByCourse,
    refreshChapters,
    clearError
  };
};