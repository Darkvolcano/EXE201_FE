import React, { useState, useEffect } from 'react';
import { Search, Star, Clock, Check, Play, ChevronLeft, ChevronRight, Users, Award, TrendingUp, Heart, Quote, Sparkles, Loader2, AlertCircle } from 'lucide-react';
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
    { name: "Starter", price: 29, description: "Perfect for students beginning their academic journey", features: ["4 sessions/month", "Basic homework help", "Progress tracking", "Email support"], popular: false },
    { name: "Growth", price: 59, description: "Ideal for students seeking comprehensive academic support", features: ["8 sessions/month", "Test preparation", "Custom study materials", "Priority support", "Performance analytics"], popular: true },
    { name: "Excellence", price: 89, description: "For students aiming for top-tier academic performance", features: ["12 sessions/month", "Advanced strategies", "Multiple subjects", "1-on-1 mentoring", "College prep guidance"], popular: false },
    { name: "Elite", price: 149, description: "Unlimited access for serious academic achievers", features: ["Unlimited sessions", "Competition prep", "Premium mentors", "24/7 support", "Career counseling"], popular: false }
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
      <section className="pricing-section">
        <div className="pricing-container">
          <div className="section-header">
            <h2 className="section-title">
              Choose Your <span className="pricing-highlight">Learning Plan</span>
            </h2>
            <p className="section-description">
              Flexible pricing designed to fit every student's budget and learning goals. Start your journey to academic excellence today.
            </p>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                
                <div className="pricing-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  <div className="plan-price">
                    ${plan.price}
                    <span className="price-period">/month</span>
                  </div>
                </div>

                <div className="plan-features">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="feature-item">
                      <Check className="feature-check-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`plan-btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

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