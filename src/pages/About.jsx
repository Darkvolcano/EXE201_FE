import React from "react";
import { Button } from "antd";
import "../style/About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <img
          className="about-hero-img"
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=facearea&w=600&q=80"
          alt="Tutorify Team"
        />
        <div className="about-hero-content">
          <div className="about-hero-title">About Tutorify</div>
          <div className="about-hero-desc">
            Tutorify is a modern platform connecting students with passionate mentors and high-quality courses.<br />
            Our mission is to make learning accessible, enjoyable, and effective for everyone.<br />
            We believe in the power of personalized education and a supportive community.
          </div>
          <div className="about-hero-stats">
            <div className="about-stat">
              <div className="about-stat-number">100+</div>
              <div className="about-stat-label">Mentors</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-number">10K+</div>
              <div className="about-stat-label">Students</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-number">200+</div>
              <div className="about-stat-label">Courses</div>
            </div>
          </div>
          <div className="about-cta-buttons">
            <Button type="primary" size="large">
              Get Started
            </Button>
            <Button type="default" size="large">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <img
          className="about-section-img"
          src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=400&q=80"
          alt="Learning"
        />
        <div className="about-section-content">
          <div className="about-section-title">Who We Are</div>
          <div className="about-section-desc">
            We are a team of educators, developers, and dreamers who want to empower learners everywhere.<br />
            Tutorify offers a wide range of subjects, from English and Math to Coding and Cloud Computing.<br />
            Our mentors are carefully selected for their expertise and passion for teaching.
          </div>
          <ul className="about-values-list">
            <li>✔ Personalized learning paths for every student</li>
            <li>✔ Friendly, experienced, and supportive mentors</li>
            <li>✔ Flexible online courses, anytime and anywhere</li>
            <li>✔ Community-driven support and resources</li>
          </ul>
          <div className="about-cta-buttons">
            <Button type="primary">Join as Student</Button>
            <Button>Become a Mentor</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;