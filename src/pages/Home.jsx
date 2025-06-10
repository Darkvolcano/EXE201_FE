import React, { useState, useEffect } from 'react';
import { Search, Star, Clock, Check, Play, ChevronLeft, ChevronRight, Users, Award, TrendingUp, Heart } from 'lucide-react';
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

const ModernHomepage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const testimonials = [
    { text: "Tutorify completely transformed my academic performance! My mentor helped me understand complex mathematics concepts that I struggled with for months.", author: "Sarah Chen", role: "High School Student", rating: 5, image: testimonial1Image },
    { text: "The quality of teaching here is exceptional. My physics grades improved dramatically after just a few sessions.", author: "Michael Rodriguez", role: "College Student", rating: 5, image: testimonial2Image },
    { text: "I was struggling with chemistry until I found Tutorify. My mentor made complex reactions seem simple and fun.", author: "Emma Thompson", role: "High School Senior", rating: 5, image: testimonial3Image },
    { text: "The best investment I made for my education. The personalized study plans helped me achieve my dream SAT score.", author: "David Kim", role: "High School Junior", rating: 5, image: testimonial4Image }
  ];

  const mentors = [
    { name: "Dr. Rizqi Assegaf", role: "Mathematics & Science Expert", experience: "10 years", rating: 4.9, reviews: 200, specialty: "Advanced Calculus, Physics", image: mentor1Image },
    { name: "Prof. Rifky Surya", role: "English & Literature Master", experience: "7 years", rating: 4.8, reviews: 150, specialty: "Academic Writing, Literature", image: mentor2Image },
    { name: "Dr. Louis Cahya", role: "Chemistry & Biology Specialist", experience: "5 years", rating: 4.9, reviews: 120, specialty: "Organic Chemistry, Molecular Biology", image: mentor3Image }
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

   return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.6, color: '#1a202c' }}>
      {/* Hero Section - Improved Layout */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
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
            gap: '4rem', 
            alignItems: 'center',
            minHeight: '80vh'
          }}>
            <div style={{ color: 'white', zIndex: 2 }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                background: 'rgba(255,255,255,0.2)', 
                padding: '0.5rem 1rem', 
                borderRadius: '50px', 
                fontSize: '0.875rem', 
                marginBottom: '2rem',
                backdropFilter: 'blur(10px)'
              }}>
                <Heart size={16} />
                Transform Your Learning Journey
              </div>
              
              <h1 style={{ 
                fontSize: '3.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                lineHeight: 1.1
              }}>
                Unlock Your{' '}
                <span style={{ 
                  background: 'linear-gradient(45deg, #ffd89b 0%, #19547b 100%)',
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
                opacity: 0.9,
                maxWidth: '500px'
              }}>
                Connect with world-class mentors who provide personalized, one-on-one tutoring designed to accelerate your learning and achieve excellence in every subject.
              </p>

              {/* Stats Grid - All in one row */}
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
                  <div key={index} style={{ textAlign: 'center' }}>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      borderRadius: '12px', 
                      padding: '1rem', 
                      marginBottom: '0.5rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <stat.icon size={24} />
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      {stat.number}
                    </div>
                    <div style={{ opacity: 0.8, fontSize: '0.875rem' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Search Container */}
              <div style={{ 
                background: 'rgba(255,255,255,0.15)', 
                borderRadius: '16px', 
                padding: '1rem',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    flex: 1,
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem'
                  }}>
                    <Search size={20} style={{ color: '#6b7280', marginRight: '0.75rem' }} />
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
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <button style={{
                    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}>
                    Find Mentor
                  </button>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '24px', 
                padding: '2rem',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                  alt="Students learning" 
                  style={{ 
                    width: '100%', 
                    height: '400px', 
                    objectFit: 'cover', 
                    borderRadius: '16px'
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image-wrapper">
            <div className="about-image-container">
              <img src={aboutImage} alt="Learning experience" className="about-image" />
              <h3 className="about-card-title">Why Students Choose Tutorify</h3>
              <div className="about-features">
                {["Personalized 1-on-1 learning experience", "Expert mentors with proven track records", "Flexible scheduling that fits your lifestyle", "Advanced learning analytics and progress tracking"].map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-check">
                      <Check className="icon-sm" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-content">
            <div className="about-badge">
              <Heart className="icon-sm" />
              About Tutorify
            </div>
            <h2 className="about-title">
              Empowering Students to
              <span className="about-title-highlight"> Excel in Every Subject</span>
            </h2>
            <p className="about-description">
              At Tutorify, we believe every student has the potential to achieve greatness. Our platform connects you with world-class mentors who provide personalized learning experiences tailored to your unique needs and goals.
            </p>
            <div className="about-buttons">
              <button className="btn-primary">Get Started Today</button>
              <button className="btn-secondary">
                <Play className="icon-sm" />
                Watch Demo
              </button>
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
          </div>

          <div className="mentors-grid">
            {mentors.map((mentor, index) => (
              <div key={index} className="mentor-card">
                <img src={mentor.image} alt={mentor.name} className="mentor-avatar" />
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
                      <span>{mentor.rating} ({mentor.reviews})</span>
                    </div>
                  </div>

                  <button className="mentor-btn">Book Session</button>
                </div>
              </div>
            ))}
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

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="section-header">
            <h2 className="section-title">
              What Our <span className="testimonials-highlight">Students Say</span>
            </h2>
            <p className="section-description">
              Real stories from students who transformed their academic journey with Tutorify.
            </p>
          </div>

          <div className="testimonials-content">
            <div className="testimonial-text">
              <blockquote className="testimonial-quote">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="testimonial-author">
                <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].author} className="author-avatar" />
                <div className="author-info">
                  <div className="author-name">{testimonials[currentTestimonial].author}</div>
                  <div className="author-role">{testimonials[currentTestimonial].role}</div>
                  <div className="author-rating">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="star-filled" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-visual">
              <img src={testimonialImage} alt="Success story" className="testimonial-image" />
              <div className="testimonial-caption">
                <div className="caption-title">Success Story</div>
                <div className="caption-subtitle">From struggling to excelling</div>
              </div>
            </div>
          </div>

          <div className="testimonial-navigation">
            <button onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)} className="nav-btn">
              <ChevronLeft className="nav-icon" />
            </button>
            
            <div className="nav-dots">
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => setCurrentTestimonial(index)} className={`nav-dot ${index === currentTestimonial ? 'active' : ''}`} />
              ))}
            </div>

            <button onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)} className="nav-btn">
              <ChevronRight className="nav-icon" />
            </button>
          </div>
        </div>
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