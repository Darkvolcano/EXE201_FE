import { useState, useEffect } from 'react';

// Base API URL - thay đổi theo URL thực tế của bạn
const BASE_API_URL = 'https://exe202-booking-tutor-backend.onrender.com/api';

// Custom hook để quản lý mentors data
export const useMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses data
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_API_URL}/courses`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 200 && result.data && result.data.courses) {
        // Transform API data to match your mentor card structure
        const transformedMentors = await Promise.all(
          result.data.courses.map(async (courseData) => {
            // Get feedback/rating for each course
            const rating = await fetchCourseRating(courseData.course._id);
            
            return {
              id: courseData.course._id,
              name: courseData.account.fullName,
              role: getTeacherRole(courseData.certifications),
              experience: getExperienceText(courseData.certifications),
              rating: rating.averageRating,
              reviews: rating.totalReviews,
              specialty: courseData.course.name,
              image: courseData.account.avatar || '/default-avatar.png',
              price: courseData.course.price,
              description: courseData.course.description,
              courseId: courseData.course._id,
              isActive: courseData.course.isActive,
              email: courseData.account.email,
              phone: courseData.account.phone,
              certifications: courseData.certifications
            };
          })
        );

        // Filter only active courses and mentors
        const activeMentors = transformedMentors.filter(mentor => mentor.isActive);
        setMentors(activeMentors);
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (err) {
      console.error('Error fetching mentors:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch rating for a specific course
  const fetchCourseRating = async (courseId) => {
    try {
      const response = await fetch(`${BASE_API_URL}/feedback/course/${courseId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // If no feedback found, return default values
        return { averageRating: 0, totalReviews: 0 };
      }

      const result = await response.json();
      
      if (result.data && Array.isArray(result.data)) {
        const feedbacks = result.data;
        const totalReviews = feedbacks.length;
        
        if (totalReviews === 0) {
          return { averageRating: 0, totalReviews: 0 };
        }

        const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
        const averageRating = Math.round((totalRating / totalReviews) * 10) / 10; // Round to 1 decimal

        return { averageRating, totalReviews };
      }
      
      return { averageRating: 0, totalReviews: 0 };
    } catch (err) {
      console.error(`Error fetching rating for course ${courseId}:`, err);
      return { averageRating: 0, totalReviews: 0 };
    }
  };

  // Helper function to determine teacher role based on certifications
  const getTeacherRole = (certifications) => {
    if (!certifications || certifications.length === 0) {
      return 'Tutor';
    }

    // Sort by experience and get the highest
    const sortedCerts = certifications.sort((a, b) => b.experience - a.experience);
    const topCert = sortedCerts[0];

    if (topCert.experience >= 10) {
      return 'Expert Tutor';
    } else if (topCert.experience >= 5) {
      return 'Senior Tutor';
    } else {
      return 'Tutor';
    }
  };

  // Helper function to get experience text
  const getExperienceText = (certifications) => {
    if (!certifications || certifications.length === 0) {
      return '0 years';
    }

    const maxExperience = Math.max(...certifications.map(cert => cert.experience));
    return `${maxExperience} year${maxExperience !== 1 ? 's' : ''}`;
  };

  // Refresh mentors data
  const refreshMentors = () => {
    fetchCourses();
  };

  // Search mentors by name or specialty
  const searchMentors = (query) => {
    if (!query) return mentors;
    
    const lowercaseQuery = query.toLowerCase();
    return mentors.filter(mentor => 
      mentor.name.toLowerCase().includes(lowercaseQuery) ||
      mentor.specialty.toLowerCase().includes(lowercaseQuery) ||
      mentor.role.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Get mentors by rating threshold
  const getMentorsByRating = (minRating = 0) => {
    return mentors.filter(mentor => mentor.rating >= minRating);
  };

  // Get top mentors (by rating and reviews)
  const getTopMentors = (limit = 3) => {
    return mentors
      .sort((a, b) => {
        // Sort by rating first, then by number of reviews
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return b.reviews - a.reviews;
      })
      .slice(0, limit);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    mentors,
    loading,
    error,
    refreshMentors,
    searchMentors,
    getMentorsByRating,
    getTopMentors,
    fetchCourseRating
  };
};