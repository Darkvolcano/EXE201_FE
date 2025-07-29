import { useState } from 'react';
import axiosInstance from '../configs/axios.js';

export const useContentApi = () => {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to create a new content
  const createContent = async (contentData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.post('/contents', contentData, {
        headers: { 
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        // Handle different response structures
        const newContent = response.data.data || response.data;
        setContents(prevContents => [newContent, ...prevContents]);
        return newContent;
      } else {
        throw new Error('Failed to create content');
      }
    } catch (err) {
      console.error('Error creating content:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create content';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get contents by chapter ID
  const getContentsByChapter = async (chapterId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching contents for chapterId:', chapterId);
      
      const response = await axiosInstance.get(`/contents/chapter/${chapterId}`, {
        headers: { 
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Contents API Response:', response.data);
      
      if (response.data) {
        let contentsData = [];
        
        if (Array.isArray(response.data)) {
          contentsData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          contentsData = response.data.data;
        } else if (response.data.contents && Array.isArray(response.data.contents)) {
          contentsData = response.data.contents;
        }
        
        setContents(contentsData);
        return contentsData;
      } else {
        throw new Error('No data received from server');
      }
    } catch (err) {
      console.error('Error fetching contents:', err);
      
      if (err.response) {
        const statusCode = err.response.status;
        const errorMessage = err.response.data?.message || err.response.data?.error || `Server error (${statusCode})`;
        
        if (statusCode === 404) {
          setError('No contents found for this chapter.');
          setContents([]);
          return [];
        } else if (statusCode === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (statusCode === 403) {
          setError('Access denied. You don\'t have permission to view these contents.');
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

  // Function to refresh contents
  const refreshContents = async (chapterId) => {
    try {
      await getContentsByChapter(chapterId);
    } catch (error) {
      console.error('Error refreshing contents:', error);
    }
  };

  // Function to clear error
  const clearError = () => {
    setError(null);
  };

  return {
    contents,
    isLoading,
    error,
    createContent,
    getContentsByChapter,
    refreshContents,
    clearError
  };
};