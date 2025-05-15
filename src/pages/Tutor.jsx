import React from "react";
import { Button, Checkbox, Input, Radio, Slider, Select } from "antd";
import "../style/Tutor.css";
import SearchIconWhite from "../components/SearchIconWhite";

const { Option } = Select;

const Tutor = () => {
  return (
    <div className="mentor-search-container">
      {/* Header Section */}
      <div className="mentor-search-header">
        <h1 className="header-title">Find The Right Mentor For You</h1>
        <p className="header-subtitle">
          Learn more effectively with professional tutors. Choose a tutor based
          on your needs.
        </p>
        <div className="header-buttons">
          <Button type="primary" className="explore-button">
            Explore More
          </Button>
          <Button className="watch-video-button">
            <span className="play-icon">▶</span> Watch Video
          </Button>
        </div>
        <div className="header-decoration"></div>
      </div>

      <div className="search-bar">
        <Input
          placeholder="Search for tutors by subject, level, location, etc."
          suffix={<SearchIconWhite />}
          className="search-input-tutor"
        />
        <Select defaultValue="latest" className="sort-select-tutor">
          <Option value="latest">Sort by: Latest</Option>
          <Option value="popularity">Sort by: Popularity</Option>
          <Option value="years">Sort by: Years</Option>
          <Option value="category">Sort by: Category</Option>
        </Select>
      </div>

      {/* Main Content */}
      <div className="mentor-search-content">
        {/* Filter Sidebar */}
        <div className="filter-sidebar">
          <h3 className="filter-title">Categories</h3>
          <Checkbox>SD</Checkbox>
          <Checkbox>SMA</Checkbox>
          <Checkbox>University</Checkbox>
          <Checkbox>Professional</Checkbox>

          <h3 className="filter-title">Order By</h3>
          <Radio.Group>
            <Radio value="popularity">Popularity</Radio>
            <Radio value="years">Years</Radio>
            <Radio value="category">Category</Radio>
          </Radio.Group>

          <h3 className="filter-title">Location</h3>
          <Slider
            range
            defaultValue={[0, 100]}
            tipFormatter={(value) => `${value} km`}
          />

          <Button type="primary" className="filter-button">
            Filter
          </Button>
        </div>

        {/* Mentor List */}
        <div className="mentor-list-container">
          <div className="mentor-grid">
            <div className="mentor-card">
              <div
                className="mentor-image"
                style={{
                  backgroundImage: "url(https://via.placeholder.com/150)",
                }}
              ></div>
              <h3 className="mentor-name">Rizqi Assegaf</h3>
              <p className="mentor-role">SD-SMA Mentor</p>
              <p className="mentor-experience">
                <span className="clock-icon">🕒</span> 10 years
              </p>
              <div className="mentor-rating">
                <span className="stars">★★★★★</span> (200)
              </div>
            </div>
            <div className="mentor-card">
              <div
                className="mentor-image"
                style={{
                  backgroundImage: "url(https://via.placeholder.com/150)",
                }}
              ></div>
              <h3 className="mentor-name">Rifky Surya</h3>
              <p className="mentor-role">SD-SMA Mentor</p>
              <p className="mentor-experience">
                <span className="clock-icon">🕒</span> 7 years
              </p>
              <div className="mentor-rating">
                <span className="stars">★★★★☆</span> (200)
              </div>
            </div>
            <div className="mentor-card">
              <div
                className="mentor-image"
                style={{
                  backgroundImage: "url(https://via.placeholder.com/150)",
                }}
              ></div>
              <h3 className="mentor-name">Louis Cahya</h3>
              <p className="mentor-role">SD-SMA Mentor</p>
              <p className="mentor-experience">
                <span className="clock-icon">🕒</span> 5 years
              </p>
              <div className="mentor-rating">
                <span className="stars">★★★★☆</span> (200)
              </div>
            </div>
            <div className="mentor-card">
              <div
                className="mentor-image"
                style={{
                  backgroundImage: "url(https://via.placeholder.com/150)",
                }}
              ></div>
              <h3 className="mentor-name">Rizqi Assegaf</h3>
              <p className="mentor-role">SD-SMA Mentor</p>
              <p className="mentor-experience">
                <span className="clock-icon">🕒</span> 10 years
              </p>
              <div className="mentor-rating">
                <span className="stars">★★★★★</span> (200)
              </div>
            </div>
            <div className="mentor-card">
              <div
                className="mentor-image"
                style={{
                  backgroundImage: "url(https://via.placeholder.com/150)",
                }}
              ></div>
              <h3 className="mentor-name">Rifky Surya</h3>
              <p className="mentor-role">SD-SMA Mentor</p>
              <p className="mentor-experience">
                <span className="clock-icon">🕒</span> 10 years
              </p>
              <div className="mentor-rating">
                <span className="stars">★★★★★</span> (200)
              </div>
            </div>
            <div className="mentor-card">
              <div
                className="mentor-image"
                style={{
                  backgroundImage: "url(https://via.placeholder.com/150)",
                }}
              ></div>
              <h3 className="mentor-name">Louis Cahya</h3>
              <p className="mentor-role">SD-SMA Mentor</p>
              <p className="mentor-experience">
                <span className="clock-icon">🕒</span> 10 years
              </p>
              <div className="mentor-rating">
                <span className="stars">★★★★★</span> (200)
              </div>
            </div>
          </div>
          <div className="pagination">
            <span>Showing 6 Mentors from 1 Pages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
