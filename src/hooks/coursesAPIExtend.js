import { useState } from 'react';
import axiosInstance from '../configs/axios.js';

export const useCourseApi = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to create a new course
  const createCourse = async (courseData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.post('/courses', courseData, {
        headers: { 
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.success) {
        setCourses(prevCourses => [response.data.data, ...prevCourses]);
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to create course');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create course';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get all courses for a tutor
  const getTutorCourses = async (accountId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching courses for accountId:', accountId);
      
      const response = await axiosInstance.get(`/tutor/courses/${accountId}`, {
        headers: { 
          'Content-Type': 'application/json'
        }
      });
      
      console.log('API Response:', response.data);
      
      // Check if response has data
      if (response.data) {
        // Handle different response structures
        if (response.data.success && response.data.data) {
          // Standard success response with data array
          setCourses(response.data.data);
          return response.data.data;
        } else if (response.data.success && response.data.courses) {
          // Alternative structure with courses array
          setCourses(response.data.courses);
          return response.data.courses;
        } else if (Array.isArray(response.data)) {
          // Direct array response
          setCourses(response.data);
          return response.data;
        } else if (response.data.success === false) {
          // Explicit failure response
          throw new Error(response.data.message || 'Failed to fetch courses');
        } else {
          // Unexpected response structure but might contain data
          console.warn('Unexpected response structure:', response.data);
          setCourses([]); // Set empty array as fallback
          return [];
        }
      } else {
        throw new Error('No data received from server');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      
      // Handle different error types
      if (err.response) {
        // Server responded with error status
        const statusCode = err.response.status;
        const errorMessage = err.response.data?.message || err.response.data?.error || `Server error (${statusCode})`;
        
        if (statusCode === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (statusCode === 403) {
          setError('Access denied. You don\'t have permission to view these courses.');
        } else if (statusCode === 404) {
          setError('Courses not found. This might be normal if you haven\'t created any courses yet.');
          setCourses([]); // Set empty array for 404
        } else if (statusCode >= 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(errorMessage);
        }
      } else if (err.request) {
        // Network error
        setError('Network error. Please check your connection and try again.');
      } else {
        // Other errors
        setError(err.message || 'An unexpected error occurred');
      }
      
      // Don't throw for 404 errors (no courses found)
      if (err.response?.status === 404) {
        return [];
      }
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh courses
  const refreshCourses = async (accountId) => {
    try {
      await getTutorCourses(accountId);
    } catch (error) {
      console.error('Error refreshing courses:', error);
    }
  };

  // Function to clear error
  const clearError = () => {
    setError(null);
  };

  return {
    courses,
    isLoading,
    error,
    createCourse,
    getTutorCourses,
    refreshCourses,
    clearError
  };
};