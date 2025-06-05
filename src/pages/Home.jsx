import React from "react";
import { Input, Button } from "antd";
import "../style/Home.css";
import SearchIconGray from "../components/SearchIconGray";

const Home = () => {
  return (
    <div className="homepage-container">
      <div className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">
            START BECOME YOUR <span className="highlight">BEST SELF</span>
          </h1>
          <p className="hero-description">
            Unlock your academic potential with personalized tutoring from expert mentors.
            <br />
            Transform your learning journey and achieve excellence in every subject
            <br />
            with our dedicated one-on-one guidance.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">EXPERT MENTORS</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">STUDENTS TRUST US</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">SUCCESS RATE</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Input
              placeholder="Search for a mentor"
              className="search-input"
              prefix={<SearchIconGray />}
            />
            <Button type="primary" className="search-button">
              Search
            </Button>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder-top">
            <img src="/src/assets/home-first.png" />
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-image">
          <div className="image-placeholder-bottom">
            <img src="/src/assets/home-second.png" />
          </div>
        </div>
        <div className="about-text">
          <span className="about-label">ABOUT US</span>
          <h2 className="about-title">
            Ready To Help You
            <br />
            Excel In Every Subject
          </h2>
          <p className="about-description">
            At Tutorify, we connect students with qualified mentors
            <br />
            who provide personalized learning experiences. Our platform
            <br />
            offers flexible scheduling, expert guidance, and proven
            <br />
            methods to help you achieve academic success.
          </p>
          <div className="about-buttons">
            <Button type="primary" className="get-started-button">
              Get Started
            </Button>
            <Button type="link" className="watch-video-button">
              <span className="play-icon">▶</span> Watch Video
            </Button>
          </div>
        </div>
      </div>

      <div className="why-choose-section">
        <div className="why-choose-text">
          <span className="why-choose-label">WHY US</span>
          <h2 className="why-choose-title">Why Choose Tutorify</h2>
          <ul className="why-choose-list">
            <li>
              <span className="check-icon">✔</span> Personalized one-on-one tutoring sessions tailored to your learning style and academic goals.
            </li>
            <li>
              <span className="check-icon">✔</span> Experienced mentors with proven track records in their respective subjects and teaching methods.
            </li>
            <li>
              <span className="check-icon">✔</span> Flexible scheduling that fits your busy lifestyle with both online and offline session options.
            </li>
          </ul>
        </div>
        <div className="why-choose-image">
          <div className="image-placeholder-why-choose">
            <img src="/src/assets/home-third.jpg" />
          </div>
        </div>
      </div>

      <div className="top-mentor-section">
        <h2 className="top-mentor-title">Our Top Mentors At Tutorify</h2>
        <p className="top-mentor-description">
          Meet our exceptional educators who are passionate about helping students achieve their academic dreams.
        </p>
        <div className="mentor-list">
          <div className="mentor-card">
            <div className="mentor-image-placeholder">
              <img src="/src/assets/mentor-first.jpg" alt="Mentor" />
            </div>
            <h3 className="mentor-name">RIZQI ASSEGAF</h3>
            <p className="mentor-role">Mathematics & Science Tutor</p>
            <p className="mentor-experience">
              <span className="clock-icon">🕒</span> 10 years experience
            </p>
            <div className="mentor-rating">
              <span className="stars">★★★★★</span> (200 reviews)
            </div>
          </div>
          <div className="mentor-card">
            <div className="mentor-image-placeholder">
              <img src="/src/assets/mentor-second.png" alt="Mentor" />
            </div>
            <h3 className="mentor-name">RIFKY SURYA</h3>
            <p className="mentor-role">English & Literature Expert</p>
            <p className="mentor-experience">
              <span className="clock-icon">🕒</span> 7 years experience
            </p>
            <div className="mentor-rating">
              <span className="stars">★★★★☆</span> (150 reviews)
            </div>
          </div>
          <div className="mentor-card">
            <div className="mentor-image-placeholder">
              <img src="/src/assets/mentor-third.jpeg" alt="Mentor" />
            </div>
            <h3 className="mentor-name">LOUIS CAHYA</h3>
            <p className="mentor-role">Physics & Chemistry Specialist</p>
            <p className="mentor-experience">
              <span className="clock-icon">🕒</span> 5 years experience
            </p>
            <div className="mentor-rating">
              <span className="stars">★★★★☆</span> (120 reviews)
            </div>
          </div>
        </div>
      </div>

      <div className="pricing-section">
        <span className="pricing-label">PRICING</span>
        <h2 className="pricing-title">Choose Your Learning Plan</h2>
        <p className="pricing-description">
          Flexible pricing options designed to fit every student's budget and learning needs.
        </p>
        <div className="pricing-plans">
          <div className="plan-card">
            <h3 className="plan-title">Beginner</h3>
            <p className="plan-description">
              Perfect for students starting their tutoring journey with basic subject support.
            </p>
            <ul className="plan-features">
              <li>
                <span className="check-icon">✔</span> 4 sessions per month
              </li>
              <li>
                <span className="check-icon">✔</span> Basic homework assistance
              </li>
              <li>
                <span className="check-icon">✔</span> Progress tracking
              </li>
            </ul>
            <p className="plan-price">
              $20 <span className="plan-period">/month</span>
            </p>
            <Button className="plan-button">Select Plan</Button>
          </div>
          <div className="plan-card highlighted">
            <h3 className="plan-title">Intermediate</h3>
            <p className="plan-description">
              For students who want comprehensive support and accelerated learning progress.
            </p>
            <ul className="plan-features">
              <li>
                <span className="check-icon">✔</span> 8 sessions per month
              </li>
              <li>
                <span className="check-icon">✔</span> Test preparation support
              </li>
              <li>
                <span className="check-icon">✔</span> Custom study materials
              </li>
              <li>
                <span className="check-icon">✔</span> Priority mentor matching
              </li>
            </ul>
            <p className="plan-price">
              $35 <span className="plan-period">/month</span>
            </p>
            <Button className="plan-button">Select Plan</Button>
          </div>
          <div className="plan-card">
            <h3 className="plan-title">Pro</h3>
            <p className="plan-description">
              Advanced tutoring for students aiming for top grades and exam excellence.
            </p>
            <ul className="plan-features">
              <li>
                <span className="check-icon">✔</span> 12 sessions per month
              </li>
              <li>
                <span className="check-icon">✔</span> Advanced exam strategies
              </li>
              <li>
                <span className="check-icon">✔</span> Multiple subject support
              </li>
            </ul>
            <p className="plan-price">
              $50 <span className="plan-period">/month</span>
            </p>
            <Button className="plan-button">Select Plan</Button>
          </div>
          <div className="plan-card">
            <h3 className="plan-title">Expert</h3>
            <p className="plan-description">
              Unlimited access for serious students preparing for major exams and competitions.
            </p>
            <ul className="plan-features">
              <li>
                <span className="check-icon">✔</span> Unlimited sessions
              </li>
              <li>
                <span className="check-icon">✔</span> Competition preparation
              </li>
              <li>
                <span className="check-icon">✔</span> Premium mentor access
              </li>
            </ul>
            <p className="plan-price">
              $80 <span className="plan-period">/month</span>
            </p>
            <Button className="plan-button">Select Plan</Button>
          </div>
        </div>
      </div>

      <div className="testimonial-section">
        <span className="testimonial-label">TESTIMONIALS</span>
        <h2 className="testimonial-title">What Our Students Say About Us</h2>
        <div className="testimonial-content">
          <div className="testimonial-text">
            <p className="testimonial-quote">
              "Tutorify completely transformed my academic performance! My mentor helped me understand complex mathematics concepts that I struggled with for months. The personalized approach and flexible scheduling made it easy to fit tutoring into my busy schedule. I went from failing grades to consistently scoring A's in just one semester. I highly recommend Tutorify to any student looking to excel academically!"
            </p>
            <p className="testimonial-author">Sarah Chen</p>
            <p className="testimonial-role">High School Student</p>
          </div>
          <div className="testimonial-image">
            <div className="image-placeholder-testimonial">
              <img src="/src/assets/home-final.jpg" alt="Testimonial" />
            </div>
          </div>
        </div>
        <div className="testimonial-navigation">
          <span className="testimonial-counter">01/04</span>
          <div className="testimonial-arrows">
            <Button className="arrow-button left-arrow">←</Button>
            <Button className="arrow-button right-arrow">→</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;