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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus
            <br />
            dignissim faucibus id sit consectetur. Vivamus quam senectus vitae
            dolor
            <br />
            ac.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">MENTOR AT TUTORIFY</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">STUDENT TRUSTED US</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">STUDENT SUCCESS</span>
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
          <div className="image-placeholder-bottom"></div>
        </div>
        <div className="about-text">
          <span className="about-label">ABOUT US</span>
          <h2 className="about-title">
            Ready To Help You
            <br />
            Learn English In Private
          </h2>
          <p className="about-description">
            Lorem ipsum dolor sit amet, consectetur
            <br />
            adipiscing elit. Risus dignissim faucibus id sit
            <br />
            consectetur. Vivamus quam senectus vitae dolor
            <br />
            ac.
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
              <span className="check-icon">✔</span> Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Auctor pellentesque sed.
            </li>
            <li>
              <span className="check-icon">✔</span> Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Auctor pellentesque sed.
            </li>
            <li>
              <span className="check-icon">✔</span> Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Auctor pellentesque sed.
            </li>
          </ul>
        </div>
        <div className="why-choose-image">
          <div className="image-placeholder-why-choose"></div>
        </div>
      </div>

      <div className="top-mentor-section">
        <h2 className="top-mentor-title">Our Top Mentor At Tutorify</h2>
        <p className="top-mentor-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="mentor-list">
          <div className="mentor-card">
            <div className="mentor-image-placeholder"></div>
            <h3 className="mentor-name">RIZQI ASSEGAF</h3>
            <p className="mentor-role">SD-SMA Mentor</p>
            <p className="mentor-experience">
              <span className="clock-icon">🕒</span> 10 years
            </p>
            <div className="mentor-rating">
              <span className="stars">★★★★★</span> (200)
            </div>
          </div>
          <div className="mentor-card">
            <div className="mentor-image-placeholder"></div>
            <h3 className="mentor-name">RIFKY SURYA</h3>
            <p className="mentor-role">SD-SMA Mentor</p>
            <p className="mentor-experience">
              <span className="clock-icon">🕒</span> 7 years
            </p>
            <div className="mentor-rating">
              <span className="stars">★★★★☆</span> (200)
            </div>
          </div>
          <div className="mentor-card">
            <div className="mentor-image-placeholder"></div>
            <h3 className="mentor-name">LOUIS CAHYA</h3>
            <p className="mentor-role">SD-SMA Mentor</p>
            <p className="mentor-experience">
              <span className="clock-icon">🕒</span> 5 years
            </p>
            <div className="mentor-rating">
              <span className="stars">★★★★☆</span> (200)
            </div>
          </div>
        </div>
      </div>

      <div className="pricing-section">
        <span className="pricing-label">PRICING</span>
        <h2 className="pricing-title">How Much Do I Have To Pay</h2>
        <p className="pricing-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="pricing-plans">
          <div className="plan-card">
            <h3 className="plan-title">Beginner</h3>
            <p className="plan-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <ul className="plan-features">
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
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
              For most businesses that want to optimize web queries.
            </p>
            <ul className="plan-features">
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
            </ul>
            <p className="plan-price">
              $20 <span className="plan-period">/month</span>
            </p>
            <Button className="plan-button">Select Plan</Button>
          </div>
          <div className="plan-card">
            <h3 className="plan-title">Pro</h3>
            <p className="plan-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <ul className="plan-features">
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
            </ul>
            <p className="plan-price">
              $20 <span className="plan-period">/month</span>
            </p>
            <Button className="plan-button">Select Plan</Button>
          </div>
          <div className="plan-card">
            <h3 className="plan-title">Expert</h3>
            <p className="plan-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <ul className="plan-features">
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
              <li>
                <span className="check-icon">✔</span> Lectus quis quisque.
              </li>
            </ul>
            <p className="plan-price">
              $20 <span className="plan-period">/month</span>
            </p>
            <Button className="plan-button">Select Plan</Button>
          </div>
        </div>
      </div>

      <div className="testimonial-section">
        <span className="testimonial-label">TESTIMONI</span>
        <h2 className="testimonial-title">What They Say About Us</h2>
        <div className="testimonial-content">
          <div className="testimonial-text">
            <p className="testimonial-quote">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet
              congue aliquam, fermentum arcu. Pharetra eget dius luctus in nec
              leo quam vestibulum. Ut quam vulputate turpis tincidunt posuere
              morbi ipsum dolor sit amet, consectetur adipiscing elit. Aliquet
              congue aliquam, fermentum arcu. Pharetra eget dius luctus in nec
              leo quam vestibulum. Ut quam vulputate turpis tincidunt posuere
              morbi!”
            </p>
            <p className="testimonial-author">Rizqi Assegaf</p>
            <p className="testimonial-role">Student At Tutorify</p>
          </div>
          <div className="testimonial-image">
            <div className="image-placeholder-testimonial"></div>
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
