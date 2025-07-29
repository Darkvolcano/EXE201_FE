import React, { useState } from "react";
import { Button, Checkbox, Input, Radio, Slider, Select } from "antd";
import "../style/Tutor.css";
import SearchIconWhite from "../components/SearchIconWhite";
import { useGetCourse } from "../hooks/coursesApi";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Tutor = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourse();

  // Loại bỏ các gia sư trùng lặp dựa trên account._id
  const uniqueTutors = Array.from(
    new Map(
      data?.data?.courses?.map((item) => [
        item.account._id,
        {
          account: item.account,
          certifications: item.certifications,
        },
      ])
    ).values()
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  // Filter tutors based on search term
  const filteredTutors = uniqueTutors.filter(
    (tutor) =>
      tutor.account.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      tutor.certifications[0]?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      tutor.account.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort tutors based on experience
  const sortedTutors = [...filteredTutors].sort((a, b) => {
    const expA = parseInt(a.certifications[0]?.experience || 0);
    const expB = parseInt(b.certifications[0]?.experience || 0);
    if (sortOrder === "years") return expB - expA; // High to low
    if (sortOrder === "years-asc") return expA - expB; // Low to high
    return 0; // Default (latest)
  });

  console.log("Sorted tutors:", sortedTutors);

  return (
    <div className="mentor-search-container">
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={sortOrder}
          className="sort-select-tutor"
          onChange={(value) => setSortOrder(value)}
        >
          <Option value="years">Sort by: Years (High to Low)</Option>
          <Option value="years-asc">Sort by: Years (Low to High)</Option>
        </Select>
      </div>

      <div className="mentor-search-content">
        <div className="mentor-list-container">
          <div className="mentor-grid-friendly">
            {isLoading && <div>Loading...</div>}
            {isError && <div>Failed to load tutors.</div>}
            {!isLoading && !isError && sortedTutors.length === 0 && (
              <div>No tutors found.</div>
            )}
            {!isLoading &&
              !isError &&
              sortedTutors.map((tutor) => (
                <div
                  className="mentor-card-friendly"
                  key={tutor.account._id}
                  onClick={() => navigate(`/tutors/${tutor.account._id}`)}
                  style={{ cursor: "pointer" }}
                >
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
            <span>Showing {sortedTutors.length} Mentors</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
