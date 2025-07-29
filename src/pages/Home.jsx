import React, { useState, useEffect } from 'react';
import { Search, Star, Clock, Check, Play, ChevronLeft, ChevronRight, Users, Award, TrendingUp, Heart, Quote, Sparkles, Loader2, AlertCircle, Zap, Crown, Trophy, BookOpen, Target} from 'lucide-react';
import '../style/Home.css';
import heroImage from '../assets/home-first.png';
import mentor1Image from '../assets/mentor-first.jpg';
import mentor2Image from '../assets/mentor-second.png';
import mentor3Image from '../assets/mentor-third.jpeg';
import aboutImage from '../assets/home-second.png';
import testimonialImage from '../assets/home-first.png';
import testimonial1Image from '../assets/home-second.png';
import testimonial2Image from '../assets/home-second.png';
import testimonial3Image from '../assets/home-second.png';
import testimonial4Image from '../assets/home-second.png';
import { useMentors } from '../hooks/useMentors';
const ModernHomepage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
   const [hoveredPlan, setHoveredPlan] = useState(null);

  // Use the custom hook
  const { mentors, loading, error, searchMentors, getTopMentors, refreshMentors } = useMentors();
  
  // Get filtered mentors based on search query
  const filteredMentors = searchQuery ? searchMentors(searchQuery) : getTopMentors(3);

  const testimonials = [
    { text: "Tutorify completely transformed my academic performance! My mentor helped me understand complex mathematics concepts that I struggled with for months.", author: "Sarah Chen", role: "High School Student", rating: 5, image: testimonial1Image },
    { text: "The quality of teaching here is exceptional. My physics grades improved dramatically after just a few sessions.", author: "Michael Rodriguez", role: "College Student", rating: 5, image: testimonial2Image },
    { text: "I was struggling with chemistry until I found Tutorify. My mentor made complex reactions seem simple and fun.", author: "Emma Thompson", role: "High School Senior", rating: 5, image: testimonial3Image },
    { text: "The best investment I made for my education. The personalized study plans helped me achieve my dream SAT score.", author: "David Kim", role: "High School Junior", rating: 5, image: testimonial4Image }
  ];


  const pricingPlans = [
    {
      name: "Basic",
      price: "19",
      description: "Perfect for getting started with your learning journey",
      icon: BookOpen,
      color: "gradient-blue",
      bgColor: "bg-white-10",
      features: [
        "Access to 10+ courses",
        "Basic study materials",
        "Email support",
        "Mobile app access",
        "Progress tracking"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "39",
      description: "Best for serious learners who want comprehensive resources",
      icon: Target,
      color: "gradient-green",
      bgColor: "bg-white-20",
      features: [
        "Access to 50+ courses",
        "Advanced study materials",
        "Priority support",
        "Offline downloads",
        "Personalized learning path",
        "Live webinars",
        "Certificate of completion"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "59",
      description: "For professionals seeking advanced skills and certifications",
      icon: Star,
      color: "gradient-purple",
      bgColor: "bg-white-30",
      features: [
        "Access to 100+ courses",
        "Premium study materials",
        "1-on-1 tutoring sessions",
        "Career guidance",
        "Industry certifications",
        "Exclusive workshops",
        "Job placement assistance"
      ],
      popular: false
    },
    {
      name: "Enterprise",
      price: "99",
      description: "Complete solution for teams and organizations",
      icon: Crown,
      color: "gradient-pink",
      bgColor: "bg-white-20",
      features: [
        "Unlimited course access",
        "Custom content creation",
        "Dedicated account manager",
        "Team analytics",
        "API integrations",
        "White-label solution",
        "24/7 premium support"
      ],
      popular: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

 // Handle booking session
  const handleBookSession = (mentor) => {
    // You can implement navigation to booking page or open modal
    console.log('Booking session with:', mentor);
    // Example: navigate to booking page
    // navigate(`/booking/${mentor.courseId}`);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Render mentor card with loading state
  const renderMentorCard = (mentor, index) => (
    <div key={mentor.id || index} className="mentor-card">
      <img 
        src={mentor.image || '/default-avatar.png'} 
        alt={mentor.name} 
        className="mentor-avatar"
        onError={(e) => {
          e.target.src = '/default-avatar.png';
        }}
      />
      <div className="mentor-info">
        <h3 className="mentor-name">{mentor.name}</h3>
        <p className="mentor-role">{mentor.role}</p>
        <p className="mentor-specialty">{mentor.specialty}</p>

        <div className="mentor-stats">
          <div className="mentor-stat">
            <Clock className="icon-sm" />
            <span>{mentor.experience}</span>
          </div>
          <div className="mentor-stat">
            <Star className="icon-sm star-icon" />
            <span>
              {mentor.rating > 0 ? `${mentor.rating} (${mentor.reviews})` : 'New Tutor'}
            </span>
          </div>
        </div>

        {mentor.price && (
          <div className="mentor-price">
            <span>${mentor.price}/session</span>
          </div>
        )}

        <button 
          className="mentor-btn"
          onClick={() => handleBookSession(mentor)}
        >
          Book Session
        </button>
      </div>
    </div>
  );

  // Render loading state
  const renderLoadingState = () => (
    <div className="mentors-loading">
      <Loader2 className="icon-lg animate-spin" />
      <p>Loading our amazing mentors...</p>
    </div>
  );

  // Render error state
  const renderErrorState = () => (
    <div className="mentors-error">
      <AlertCircle className="icon-lg text-red-500" />
      <p>Failed to load mentors. Please try again.</p>
      <button 
        className="retry-btn"
        onClick={refreshMentors}
      >
        Retry
      </button>
    </div>
  );


   return (
       <div style={{ fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.6, color: '#1a202c' }}>
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
          }
          @keyframes slideRight {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
      {/* Hero Section - Improved Layout */}
      <section style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(61, 90, 219, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '60px',
          height: '60px',
          background: 'rgba(61, 90, 219, 0.05)',
          borderRadius: '50%',
          animation: 'float 4s ease-in-out infinite reverse'
        }}></div>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 2rem',
          width: '100%'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '4rem', 
            alignItems: 'center',
            minHeight: '80vh'
          }}>
            <div style={{ color: '#1a202c', zIndex: 2 }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                background: 'rgba(61, 90, 219, 0.1)', 
                color: 'rgb(61, 90, 219)',
                padding: '0.5rem 1rem', 
                borderRadius: '50px', 
                fontSize: '0.875rem', 
                marginBottom: '2rem',
                border: '1px solid rgba(61, 90, 219, 0.2)'
              }}>
                <Heart size={16} />
                Transform Your Learning Journey
              </div>
              
              <h1 style={{ 
                fontSize: '3.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                lineHeight: 1.1,
                color: '#1a202c'
              }}>
                Unlock Your{' '}
                <span style={{ 
                  background: 'linear-gradient(45deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block'
                }}>
                  Academic Potential
                </span>
              </h1>
              
              <p style={{ 
                fontSize: '1.25rem', 
                marginBottom: '3rem',
                color: '#64748b',
                maxWidth: '500px'
              }}>
                Connect with world-class mentors who provide personalized, one-on-one tutoring designed to accelerate your learning and achieve excellence in every subject.
              </p>

              {/* Stats Grid - Enhanced with Gradients and Animations */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '2rem', 
                marginBottom: '3rem'
              }}>
                {[
                  { number: "500+", label: "Expert Mentors", icon: Users },
                  { number: "25K+", label: "Success Stories", icon: Award },
                  { number: "98%", label: "Success Rate", icon: TrendingUp }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      textAlign: 'center',
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ 
                      background: 'linear-gradient(135deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)', 
                      borderRadius: '16px', 
                      padding: '1.5rem', 
                      marginBottom: '1rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: '0 8px 25px rgba(61, 90, 219, 0.3)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                        transform: 'rotate(45deg)',
                        animation: 'shimmer 3s infinite'
                      }}></div>
                      <stat.icon size={28} style={{ position: 'relative', zIndex: 1 }} />
                    </div>
                    <div style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.5rem', 
                      background: 'linear-gradient(135deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      transition: 'all 0.3s ease'
                    }}>
                      {stat.number}
                    </div>
                    <div style={{ 
                      color: '#64748b', 
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      letterSpacing: '0.5px'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Search Container with Modern Effects */}
              <div style={{ 
                background: 'white', 
                borderRadius: '20px', 
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(61, 90, 219, 0.15), 0 0 0 1px rgba(61, 90, 219, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgb(61, 90, 219), transparent)',
                  animation: 'slideRight 2s infinite'
                }}></div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    flex: 1,
                    background: '#f8fafc',
                    borderRadius: '16px',
                    padding: '1rem 1.25rem',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '2px solid rgb(61, 90, 219)';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(61, 90, 219, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '2px solid transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <Search size={22} style={{ color: '#6b7280', marginRight: '1rem' }} />
                    <input
                      type="text"
                      placeholder="Search for subjects, mentors, or topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        width: '100%',
                        color: '#1a202c',
                        fontSize: '1.05rem',
                        fontWeight: '400'
                      }}
                    />
                  </div>
                  <button 
                    style={{
                      background: 'linear-gradient(135deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '1rem 2.5rem',
                      fontSize: '1.05rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(61, 90, 219, 0.4)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(61, 90, 219, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(61, 90, 219, 0.4)';
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>Find Mentor</span>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '0',
                      height: '0',
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.6s ease'
                    }}></div>
                  </button>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ 
                background: 'white', 
                borderRadius: '24px', 
                padding: '2rem',
                boxShadow: '0 25px 50px rgba(61, 90, 219, 0.15)',
                border: '1px solid rgba(61, 90, 219, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 35px 60px rgba(61, 90, 219, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(61, 90, 219, 0.15)';
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  height: '4px',
                  background: 'linear-gradient(90deg, rgb(61, 90, 219), rgb(45, 70, 180), rgb(61, 90, 219))',
                  borderRadius: '24px 24px 0 0'
                }}></div>
                <img 
                  src={heroImage} 
                  alt="Students learning" 
                  style={{ 
                    width: '100%', 
                    height: '400px', 
                    objectFit: 'cover', 
                    borderRadius: '16px',
                    transition: 'all 0.3s ease'
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
{/* About Section - Fixed */}
<section style={{
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  padding: '6rem 0',
  position: 'relative'
}}>
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    width: '100%'
  }}>
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '6rem',
      alignItems: 'center'
    }}>
      {/* Image Side */}
      <div style={{
        position: 'relative'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <img 
            src={aboutImage} 
            alt="Learning experience" 
            style={{
              width: '100%',
              height: '300px 80%',
              objectFit: 'cover',
              borderRadius: '16px',
              marginBottom: '2rem'
            }}
          />
          
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Why Students Choose Tutorify
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {[
              "Personalized 1-on-1 learning experience",
              "Expert mentors with proven track records", 
              "Flexible scheduling that fits your lifestyle",
              "Advanced learning analytics and progress tracking"
            ].map((feature, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.5rem 0'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <Check size={12} color="white" />
                </div>
                <span style={{
                  color: '#374151',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div style={{
        paddingLeft: '2rem'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '50px',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '2rem',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
        }}>
          <Heart size={16} />
          About Tutorify
        </div>

        <h2 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#1a202c',
          marginBottom: '2rem',
          lineHeight: '1.2'
        }}>
          Empowering Students to
          <span style={{
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'block',
            marginTop: '0.5rem'
          }}>
            Excel in Every Subject
          </span>
        </h2>

        <p style={{
          fontSize: '1.2rem',
          color: '#64748b',
          lineHeight: '1.8',
          marginBottom: '3rem',
          maxWidth: '500px'
        }}>
          At Tutorify, we believe every student has the potential to achieve greatness. Our platform connects you with world-class mentors who provide personalized learning experiences tailored to your unique needs and goals.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button style={{
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
          }}>
            Get Started Today
          </button>
          
          <button style={{
            background: 'transparent',
            color: '#667eea',
            border: '2px solid #667eea',
            borderRadius: '12px',
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Play size={16} />
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Mentors Section */}
      <section className="mentors-section">
        <div className="mentors-container">
          <div className="section-header">
            <h2 className="section-title">
              Meet Our <span className="title-highlight">Elite Mentors</span>
            </h2>
            <p className="section-description">
              Learn from the best. Our mentors are carefully selected experts who are passionate about helping students achieve their academic dreams.
            </p>
            
            {/* Search bar for mentors */}
            <div className="mentor-search">
              <div className="search-input-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search mentors by name or subject..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="search-input"
                />
              </div>
            </div>
          </div>

          <div className="mentors-grid">
            {loading && renderLoadingState()}
            
            {error && renderErrorState()}
            
            {!loading && !error && filteredMentors.length === 0 && (
              <div className="no-mentors">
                <p>No mentors found matching your search.</p>
              </div>
            )}
            
            {!loading && !error && filteredMentors.length > 0 && 
              filteredMentors.map((mentor, index) => renderMentorCard(mentor, index))
            }
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section class="pricing-section">
        <div class="pricing-container">
            {/* Header */}
            <div class="pricing-header">
                <div class="pricing-badge">
                    <span class="pulse-dot"></span>
                    <span class="badge-text">Pricing Plans</span>
                </div>
                
                <h2 class="pricing-title">
                    
                    <span class="gradient-text">Choose Your Learning Plan</span>
                </h2>
                
                <p class="pricing-subtitle">
                    Flexible pricing designed to fit every student's budget and learning goals. 
                    Start your journey to academic excellence today.
                </p>
            </div>


            <div class="pricing-grid">
                
                <div class="pricing-card">
                    <div class="card-container">
                        <div class="card-content">
                            <div class="plan-icon bg-blue">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                </svg>
                            </div>

                            <div class="plan-header">
                                <h3 class="plan-name">Basic</h3>
                                <p class="plan-description">Perfect for getting started with your learning journey</p>
                            </div>

                            <div class="price-container">
                                <div class="price-display">
                                    <span class="price-amount">$19</span>
                                    <span class="price-period">/month</span>
                                </div>
                            </div>

                            <div class="features-list">
                                <div class="feature-item">
                                    <div class="feature-icon bg-blue">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Access to 10+ courses</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-blue">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Basic study materials</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-blue">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Email support</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-blue">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Mobile app access</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-blue">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Progress tracking</span>
                                </div>
                            </div>

                            <button class="plan-button standard">Choose Plan</button>
                        </div>
                    </div>
                </div>

               
                <div class="pricing-card popular">
                    <div class="popular-badge">
                        <div class="popular-badge-inner">⭐ Most Popular</div>
                    </div>
                    <div class="card-container">
                        <div class="card-content">
                            <div class="plan-icon bg-green">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M12 1v6m0 6v6"/>
                                    <path d="m15.5 4.5-3 3m0 0-3-3m3 3v6"/>
                                </svg>
                            </div>

                            <div class="plan-header">
                                <h3 class="plan-name">Pro</h3>
                                <p class="plan-description">Best for serious learners who want comprehensive resources</p>
                            </div>

                            <div class="price-container">
                                <div class="price-display">
                                    <span class="price-amount">$39</span>
                                    <span class="price-period">/month</span>
                                </div>
                            </div>

                            <div class="features-list">
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Access to 50+ courses</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Advanced study materials</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Priority support</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Offline downloads</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Personalized learning path</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Live webinars</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Certificate of completion</span>
                                </div>
                            </div>

                            <button class="plan-button popular bg-green">Get Started Now</button>
                        </div>
                    </div>
                </div>

                
                <div class="pricing-card">
                    <div class="card-container">
                        <div class="card-content">
                            <div class="plan-icon bg-purple">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                                </svg>
                            </div>

                            <div class="plan-header">
                                <h3 class="plan-name">Premium</h3>
                                <p class="plan-description">For professionals seeking advanced skills and certifications</p>
                            </div>

                            <div class="price-container">
                                <div class="price-display">
                                    <span class="price-amount">$59</span>
                                    <span class="price-period">/month</span>
                                </div>
                            </div>

                            <div class="features-list">
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Access to 100+ courses</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Premium study materials</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">1-on-1 tutoring sessions</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Career guidance</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Industry certifications</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Exclusive workshops</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Job placement assistance</span>
                                </div>
                            </div>

                            <button class="plan-button standard">Choose Plan</button>
                        </div>
                    </div>
                </div>

                
                <div class="pricing-card">
                    <div class="card-container">
                        <div class="card-content">
                            <div class="plan-icon bg-pink">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>

                            <div class="plan-header">
                                <h3 class="plan-name">Enterprise</h3>
                                <p class="plan-description">Complete solution for teams and organizations</p>
                            </div>

                            <div class="price-container">
                                <div class="price-display">
                                    <span class="price-amount">$99</span>
                                    <span class="price-period">/month</span>
                                </div>
                            </div>

                            <div class="features-list">
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Unlimited course access</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Custom content creation</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Dedicated account manager</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Team analytics</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">API integrations</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">White-label solution</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">24/7 premium support</span>
                                </div>
                            </div>

                            <button class="plan-button standard">Choose Plan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

      <style jsx>{`
        

        /* Pricing Section */
        .pricing-section {
            position: relative;
            padding: 3rem 1.5rem;
        }

        .pricing-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Header Styles */
        .pricing-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .pricing-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            border-radius: 50px;
            padding: 0.5rem 1rem;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .pulse-dot {
            width: 0.5rem;
            height: 0.5rem;
            background: #4ade80;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        .badge-text {
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.875rem;
            font-weight: 500;
        }

        .pricing-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1rem;
            line-height: 1.2;
        }

        .gradient-text {
            background: linear-gradient(to right, #22d3ee, #a855f7, #ec4899);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradient-pulse 3s ease-in-out infinite;
        }

        .pricing-subtitle {
            font-size: 1.125rem;
            color: rgba(255, 255, 255, 0.8);
            max-width: 28rem;
            margin: 0 auto;
            line-height: 1.6;
        }

        /* Grid Layout */
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            max-width: 1100px;
            margin: 0 auto;
        }

        @media (min-width: 768px) {
            .pricing-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 1024px) {
            .pricing-grid {
                grid-template-columns: repeat(4, 1fr);
                gap: 1.25rem;
            }
        }

        /* Card Styles */
        .pricing-card {
            position: relative;
            cursor: pointer;
            transition: all 0.4s ease;
            transform-origin: center;
            height: 100%;
        }

        .pricing-card:hover {
            transform: scale(1.03);
        }

        .pricing-card.popular {
            transform: scale(1.05);
        }

        .pricing-card.popular:hover {
            transform: scale(1.08);
        }

        .popular-badge {
            position: absolute;
            top: -0.75rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 20;
        }

        .popular-badge-inner {
            background: linear-gradient(to right, #facc15, #f97316);
            color: white;
            padding: 0.25rem 0.875rem;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: bounce 2s infinite;
        }

        .card-container {
            position: relative;
            overflow: hidden;
            border-radius: 1.25rem;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            transition: all 0.4s ease;
            background: rgba(255, 255, 255, 0.95);
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .card-container:hover {
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
        }

        .card-content {
            position: relative;
            padding: 1.75rem 1.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        /* Icon Styles */
        .plan-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 1rem;
            margin-bottom: 1.25rem;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            flex-shrink: 0;
        }

        /* Plan Header */
        .plan-header {
            margin-bottom: 1.25rem;
            flex-shrink: 0;
        }

        .plan-name {
            font-size: 1.375rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
        }

        .plan-description {
            color: #6b7280;
            font-size: 0.875rem;
            line-height: 1.5;
        }

        /* Price */
        .price-container {
            margin-bottom: 1.5rem;
            flex-shrink: 0;
        }

        .price-display {
            display: flex;
            align-items: baseline;
        }

        .price-amount {
            font-size: 2.5rem;
            font-weight: 700;
            color: #111827;
        }

        .price-period {
            color: #6b7280;
            margin-left: 0.5rem;
            font-size: 0.875rem;
        }

        /* Features */
        .features-list {
            margin-bottom: 1.5rem;
            flex: 1;
        }

        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 0.75rem;
            transition: all 0.2s ease;
        }

        .feature-item:hover .feature-text {
            color: #111827;
        }

        .feature-icon {
            flex-shrink: 0;
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .feature-text {
            margin-left: 0.75rem;
            color: #374151;
            transition: color 0.2s ease;
            font-size: 0.875rem;
            line-height: 1.4;
        }

        /* Button */
        .plan-button {
            width: 100%;
            padding: 0.875rem 1rem;
            border-radius: 0.875rem;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 0.875rem;
            margin-top: auto;
            flex-shrink: 0;
        }

        .plan-button.popular {
            color: white;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .plan-button.popular:hover {
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
        }

        .plan-button.standard {
            background: rgba(255, 255, 255, 0.8);
            color: #111827;
            border: 1px solid #e5e7eb;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .plan-button.standard:hover {
            background: white;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
        }

        /* Background Colors */
        .bg-blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
        .bg-green { background: linear-gradient(135deg, #10b981, #059669); }
        .bg-purple { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
        .bg-pink { background: linear-gradient(135deg, #ec4899, #be185d); }

        /* Animations */
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        @keyframes gradient-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
        }

        /* Responsive Design */
        @media (min-width: 768px) {
            .pricing-title {
                font-size: 3rem;
            }
        }

        @media (max-width: 767px) {
            .pricing-grid {
                grid-template-columns: 1fr;
                max-width: 400px;
            }
            
            .pricing-title {
                font-size: 2rem;
            }
        }
      `}</style>
      {/* Enhanced Testimonials Section */}
<section style={{
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: '4rem 0',
  position: 'relative',
  overflow: 'hidden'
}}>
  {/* Decorative Circles */}
  <div style={{
    position: 'absolute',
    top: '15%',
    left: '8%',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    opacity: 0.1,
    animation: 'float 8s ease-in-out infinite'
  }} />
  
  <div style={{
    position: 'absolute',
    bottom: '20%',
    right: '10%',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #ffd89b 0%, #19547b 100%)',
    opacity: 0.15,
    animation: 'float 6s ease-in-out infinite reverse'
  }} />

  <div style={{
    position: 'absolute',
    top: '60%',
    left: '5%',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #a8e6cf 0%, #88d8a3 100%)',
    opacity: 0.2,
    animation: 'float 7s ease-in-out infinite'
  }} />

  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    width: '100%',
    position: 'relative',
    zIndex: 2
  }}>
    {/* Section Header */}
    <div style={{
      textAlign: 'center',
      marginBottom: '4rem'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '50px',
        fontSize: '0.875rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
      }}>
        <Heart size={16} />
        Student Success Stories
      </div>

      <h2 style={{
        fontSize: '3.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: '#1a202c',
        lineHeight: 1.1
      }}>
        What Our{' '}
        <span style={{
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Students Say
        </span>
      </h2>

      <p style={{
        fontSize: '1.25rem',
        color: '#64748b',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: 1.6
      }}>
        Real stories from students who transformed their academic journey with Tutorify.
      </p>
    </div>

    {/* Main Testimonial Content */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center',
      marginBottom: '4rem'
    }}>
      {/* Testimonial Text Side */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '3rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        position: 'relative',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        {/* Quote Icon */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.1
        }}>
          <Quote size={24} color="white" />
        </div>

        {/* Subject Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(45deg, #a8e6cf 0%, #88d8a3 100%)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '50px',
          fontSize: '0.75rem',
          fontWeight: '600',
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={12} />
          {testimonials[currentTestimonial].subject || 'Academic Success'}
        </div>

        {/* Quote Text */}
        <blockquote style={{
          fontSize: '1.25rem',
          lineHeight: 1.7,
          color: '#1a202c',
          marginBottom: '2rem',
          fontStyle: 'italic'
        }}>
          "{testimonials[currentTestimonial].text}"
        </blockquote>

        {/* Author Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={testimonials[currentTestimonial].image} 
              alt={testimonials[currentTestimonial].author}
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          </div>
          <div>
            <div style={{
              fontWeight: '600',
              fontSize: '1.1rem',
              color: '#1a202c',
              marginBottom: '0.25rem'
            }}>
              {testimonials[currentTestimonial].author}
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '0.875rem',
              marginBottom: '0.5rem'
            }}>
              {testimonials[currentTestimonial].role}
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Side */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Success Metric Card */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '2rem',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={20} />
          </div>
          
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            +40% Grade
          </div>
          <div style={{
            opacity: 0.9,
            fontSize: '1rem'
          }}>
            Average Improvement
          </div>
        </div>

        {/* Student Image */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
            alt="Success story" 
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '1rem'
            }}
          />
          <div style={{
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '0.25rem'
          }}>
            Success Story
          </div>
          <div style={{
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            From struggling to excelling
          </div>
        </div>
      </div>
    </div>

    {/* Enhanced Navigation */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem'
    }}>
      {/* Previous Button */}
      <button 
        onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'white',
          border: '2px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <ChevronLeft size={20} color="#64748b" />
      </button>

      {/* Circular Dots Navigation */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            style={{
              width: index === currentTestimonial ? '50px' : '40px',
              height: index === currentTestimonial ? '50px' : '40px',
              borderRadius: '50%',
              background: index === currentTestimonial 
                ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' 
                : 'white',
              border: index === currentTestimonial 
                ? 'none' 
                : '2px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: index === currentTestimonial 
                ? '0 8px 25px rgba(102, 126, 234, 0.4)' 
                : '0 2px 8px rgba(0,0,0,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {index === currentTestimonial && (
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
                }} />
              </div>
            )}
            {index !== currentTestimonial && (
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#cbd5e1'
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button 
        onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'white',
          border: '2px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <ChevronRight size={20} color="#64748b" />
      </button>
    </div>
  </div>

  {/* CSS Animations */}
  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(180deg); }
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
    }
    
    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 25px 70px rgba(0,0,0,0.15) !important;
    }
  `}</style>
</section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Ready to Transform Your
            <span className="cta-title-gradient">Academic Journey?</span>
          </h2>
          <p className="cta-description">
            Join thousands of students who have already discovered the power of personalized learning. Your success story starts here.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn-primary">Start Free Trial</button>
            <button className="cta-btn-secondary">Schedule Consultation</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernHomepage;