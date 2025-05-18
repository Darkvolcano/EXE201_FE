import React from "react";
import { Button, Checkbox, Input, Radio, Slider, Select } from "antd";
import "../style/Tutor.css";
import SearchIconWhite from "../components/SearchIconWhite";
import { useGetCourse } from "../hooks/coursesApi";

const { Option } = Select;

const Tutor = () => {
  // Use the hook from coursesApi.js
  const { data, isLoading, isError } = useGetCourse();
  // Extract tutors from courses data
  const tutors =
    data?.data?.courses?.map((item) => ({
      account: item.account,
      certifications: item.certifications,
    })) || [];

  // Log để kiểm tra dữ liệu trả về từ API
  console.log("Tutors data:", tutors);

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
          <div className="mentor-grid-friendly">
            {isLoading && <div>Loading...</div>}
            {isError && <div>Failed to load tutors.</div>}
            {!isLoading && !isError && tutors.length === 0 && (
              <div>No tutors found.</div>
            )}
            {!isLoading &&
              !isError &&
              tutors.map((tutor) => (
                <div className="mentor-card-friendly" key={tutor.account._id}>
                  <div className="mentor-img-wrap">
                    <img
                      className="mentor-img"
                      src={
                        tutor.certifications[0]?.image[0] ||
                        "https://via.placeholder.com/200x200?text=Tutor"
                      }
                      alt={tutor.account.fullName}
                    />
                  </div>
                  <div className="mentor-info-wrap">
                    <div className="mentor-name">
                      {tutor.account.fullName || "No Name"}
                    </div>
                    <div className="mentor-role">
                      {tutor.certifications[0]?.name || tutor.account.role}
                    </div>
                    <div className="mentor-meta">
                      <span className="mentor-meta-icon">🕒</span>
                      <span>
                        {tutor.certifications[0]?.experience || 0} years
                      </span>
                    </div>
                    <div className="mentor-rating-row">
                      <span className="mentor-stars">
                        <span style={{ color: "#FFB400" }}>★</span>
                        <span style={{ color: "#FFB400" }}>★</span>
                        <span style={{ color: "#FFB400" }}>★</span>
                        <span style={{ color: "#FFB400" }}>★</span>
                        <span style={{ color: "#FFB400" }}>★</span>
                      </span>
                      <span className="mentor-rating-count">(200)</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="pagination">
            <span>Showing {tutors.length} Mentors</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
