import React, { useState, useEffect } from "react";
import {
  Search,
  Star,
  Clock,
  Check,
  Play,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  TrendingUp,
  Heart,
  Quote,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import "../style/Home.css";
import heroImage from "../assets/home-first.png";
import mentor1Image from "../assets/mentor-first.jpg";
import mentor2Image from "../assets/mentor-second.png";
import mentor3Image from "../assets/mentor-third.jpeg";
import aboutImage from "../assets/home-second.png";
import testimonialImage from "../assets/home-first.png";
import testimonial1Image from "../assets/home-second.png";
import testimonial2Image from "../assets/home-second.png";
import testimonial3Image from "../assets/home-second.png";
import testimonial4Image from "../assets/home-second.png";
import { useMentors } from "../hooks/useMentors";

const ModernHomepage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Sử dụng hook tùy chỉnh
  const {
    mentors,
    loading,
    error,
    searchMentors,
    getTopMentors,
    refreshMentors,
  } = useMentors();

  // Lấy danh sách mentor đã lọc dựa trên từ khóa tìm kiếm
  const filteredMentors = searchQuery
    ? searchMentors(searchQuery)
    : getTopMentors(3);

  const testimonials = [
    {
      text: "Tutorify đã thay đổi hoàn toàn kết quả học tập của tôi! Người hướng dẫn đã giúp tôi hiểu các khái niệm toán học phức tạp mà tôi đã gặp khó khăn trong nhiều tháng.",
      author: "Sarah Chen",
      role: "Học sinh trung học",
      rating: 5,
      image: testimonial1Image,
    },
    {
      text: "Chất lượng giảng dạy ở đây rất xuất sắc. Điểm số vật lý của tôi đã cải thiện đáng kể chỉ sau vài buổi học.",
      author: "Michael Rodriguez",
      role: "Sinh viên đại học",
      rating: 5,
      image: testimonial2Image,
    },
    {
      text: "Tôi đã gặp khó khăn với môn hóa học cho đến khi tìm thấy Tutorify. Người hướng dẫn đã khiến các phản ứng phức tạp trở nên đơn giản và thú vị.",
      author: "Emma Thompson",
      role: "Học sinh lớp 12",
      rating: 5,
      image: testimonial3Image,
    },
    {
      text: "Đây là khoản đầu tư tốt nhất cho việc học của tôi. Các kế hoạch học tập cá nhân hóa đã giúp tôi đạt được điểm SAT mơ ước.",
      author: "David Kim",
      role: "Học sinh lớp 11",
      rating: 5,
      image: testimonial4Image,
    },
  ];

  const pricingPlans = [
    {
      name: "Khởi đầu",
      price: 29,
      description: "Phù hợp cho học sinh bắt đầu hành trình học tập",
      features: [
        "4 buổi học/tháng",
        "Hỗ trợ bài tập cơ bản",
        "Theo dõi tiến độ",
        "Hỗ trợ qua email",
      ],
      popular: false,
    },
    {
      name: "Phát triển",
      price: 59,
      description: "Lý tưởng cho học sinh cần hỗ trợ học tập toàn diện",
      features: [
        "8 buổi học/tháng",
        "Chuẩn bị thi cử",
        "Tài liệu học tập tùy chỉnh",
        "Hỗ trợ ưu tiên",
        "Phân tích hiệu suất",
      ],
      popular: true,
    },
    {
      name: "Xuất sắc",
      price: 89,
      description: "Dành cho học sinh hướng tới thành tích học tập hàng đầu",
      features: [
        "12 buổi học/tháng",
        "Chiến lược nâng cao",
        "Nhiều môn học",
        "Hướng dẫn 1-1",
        "Hướng dẫn chuẩn bị đại học",
      ],
      popular: false,
    },
    {
      name: "Cao cấp",
      price: 149,
      description:
        "Truy cập không giới hạn cho học sinh nghiêm túc đạt thành tích cao",
      features: [
        "Buổi học không giới hạn",
        "Chuẩn bị thi đấu",
        "Người hướng dẫn cao cấp",
        "Hỗ trợ 24/7",
        "Tư vấn nghề nghiệp",
      ],
      popular: false,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Xử lý đặt lịch buổi học
  const handleBookSession = (mentor) => {
    // Bạn có thể triển khai điều hướng đến trang đặt lịch hoặc mở modal
    console.log("Đặt lịch với:", mentor);
    // Ví dụ: điều hướng đến trang đặt lịch
    // navigate(`/booking/${mentor.courseId}`);
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Hiển thị thẻ mentor với trạng thái tải
  const renderMentorCard = (mentor, index) => (
    <div key={mentor.id || index} className="mentor-card">
      <img
        src={mentor.image || "/default-avatar.png"}
        alt={mentor.name}
        className="mentor-avatar"
        onError={(e) => {
          e.target.src = "/default-avatar.png";
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
              {mentor.rating > 0
                ? `${mentor.rating} (${mentor.reviews})`
                : "Giáo viên mới"}
            </span>
          </div>
        </div>

        {mentor.price && (
          <div className="mentor-price">
            <span>{mentor.price} VNĐ/buổi</span>
          </div>
        )}

        <button
          className="mentor-btn"
          onClick={() => handleBookSession(mentor)}
        >
          Đặt lịch
        </button>
      </div>
    </div>
  );

  // Hiển thị trạng thái tải
  const renderLoadingState = () => (
    <div className="mentors-loading">
      <Loader2 className="icon-lg animate-spin" />
      <p>Đang tải các giáo viên tuyệt vời của chúng tôi...</p>
    </div>
  );

  // Hiển thị trạng thái lỗi
  const renderErrorState = () => (
    <div className="mentors-error">
      <AlertCircle className="icon-lg text-red-500" />
      <p>Không thể tải giáo viên. Vui lòng thử lại.</p>
      <button className="retry-btn" onClick={refreshMentors}>
        Thử lại
      </button>
    </div>
  );

  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        lineHeight: 1.6,
        color: "#1a202c",
      }}
    >
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
      {/* Phần Hero - Bố cục cải tiến */}
      <section
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Phần tử nền động */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: "100px",
            height: "100px",
            background: "rgba(61, 90, 219, 0.1)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "5%",
            width: "60px",
            height: "60px",
            background: "rgba(61, 90, 219, 0.05)",
            borderRadius: "50%",
            animation: "float 4s ease-in-out infinite reverse",
          }}
        ></div>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <div style={{ color: "#1a202c", zIndex: 2 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(61, 90, 219, 0.1)",
                  color: "rgb(61, 90, 219)",
                  padding: "0.5rem 1rem",
                  borderRadius: "50px",
                  fontSize: "0.875rem",
                  marginBottom: "2rem",
                  border: "1px solid rgba(61, 90, 219, 0.2)",
                }}
              >
                <Heart size={16} />
                Biến đổi hành trình học tập của bạn
              </div>

              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  lineHeight: 1.1,
                  color: "#1a202c",
                }}
              >
                Mở khóa tiềm năng{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(45deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "block",
                  }}
                >
                  học thuật của bạn
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "3rem",
                  color: "#64748b",
                  maxWidth: "500px",
                }}
              >
                Kết nối với các người hướng dẫn hàng đầu thế giới, cung cấp
                hướng dẫn cá nhân hóa 1-1 để thúc đẩy học tập và đạt được sự
                xuất sắc trong mọi môn học.
              </p>

              {/* Lưới thống kê - Nâng cấp với hiệu ứng gradient và động */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "2rem",
                  marginBottom: "3rem",
                }}
              >
                {[
                  {
                    number: "500+",
                    label: "Người hướng dẫn chuyên gia",
                    icon: Users,
                  },
                  {
                    number: "25K+",
                    label: "Câu chuyện thành công",
                    icon: Award,
                  },
                  {
                    number: "98%",
                    label: "Tỷ lệ thành công",
                    icon: TrendingUp,
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: "center",
                      transform: "translateY(0)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        marginBottom: "1rem",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        boxShadow: "0 8px 25px rgba(61, 90, 219, 0.3)",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-50%",
                          left: "-50%",
                          width: "200%",
                          height: "200%",
                          background:
                            "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                          transform: "rotate(45deg)",
                          animation: "shimmer 3s infinite",
                        }}
                      ></div>
                      <stat.icon
                        size={28}
                        style={{ position: "relative", zIndex: 1 }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                        background:
                          "linear-gradient(135deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {stat.number}
                    </div>
                    <div
                      style={{
                        color: "#64748b",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Thanh tìm kiếm nâng cao với hiệu ứng hiện đại */}
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "1.5rem",
                  boxShadow:
                    "0 20px 40px rgba(61, 90, 219, 0.15), 0 0 0 1px rgba(61, 90, 219, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "2px",
                    background:
                      "linear-gradient(90deg, transparent, rgb(61, 90, 219), transparent)",
                    animation: "slideRight 2s infinite",
                  }}
                ></div>
                <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flex: 1,
                      background: "#f8fafc",
                      borderRadius: "16px",
                      padding: "1rem 1.25rem",
                      border: "2px solid transparent",
                      transition: "all 0.3s ease",
                      position: "relative",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border =
                        "2px solid rgb(61, 90, 219)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 4px rgba(61, 90, 219, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "2px solid transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Search
                      size={22}
                      style={{ color: "#6b7280", marginRight: "1rem" }}
                    />
                    <input
                      type="text"
                      placeholder="Tìm kiếm môn học, người hướng dẫn hoặc chủ đề..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        width: "100%",
                        color: "#1a202c",
                        fontSize: "1.05rem",
                        fontWeight: "400",
                      }}
                    />
                  </div>
                  <button
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "16px",
                      padding: "1rem 2.5rem",
                      fontSize: "1.05rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 8px 25px rgba(61, 90, 219, 0.4)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 35px rgba(61, 90, 219, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(61, 90, 219, 0.4)";
                    }}
                  >
                    <span style={{ position: "relative", zIndex: 1 }}>
                      Tìm người hướng dẫn
                    </span>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "0",
                        height: "0",
                        background: "rgba(255,255,255,0.2)",
                        borderRadius: "50%",
                        transform: "translate(-50%, -50%)",
                        transition: "all 0.6s ease",
                      }}
                    ></div>
                  </button>
                </div>
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  background: "white",
                  borderRadius: "24px",
                  padding: "2rem",
                  boxShadow: "0 25px 50px rgba(61, 90, 219, 0.15)",
                  border: "1px solid rgba(61, 90, 219, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 35px 60px rgba(61, 90, 219, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px rgba(61, 90, 219, 0.15)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-2px",
                    left: "-2px",
                    right: "-2px",
                    height: "4px",
                    background:
                      "linear-gradient(90deg, rgb(61, 90, 219), rgb(45, 70, 180), rgb(61, 90, 219))",
                    borderRadius: "24px 24px 0 0",
                  }}
                ></div>
                <img
                  src={heroImage}
                  alt="Học sinh học tập"
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phần Giới thiệu - Đã sửa */}
      <section
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          padding: "6rem 0",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            {/* Phía hình ảnh */}
            <div
              style={{
                position: "relative",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "24px",
                  padding: "2rem",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={aboutImage}
                  alt="Kinh nghiệm học tập"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    marginBottom: "2rem",
                  }}
                />

                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#1a202c",
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  Tại sao học sinh chọn Tutorify
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {[
                    "Kinh nghiệm học tập cá nhân hóa 1-1",
                    "Người hướng dẫn chuyên gia với thành tích đã chứng minh",
                    "Lịch trình linh hoạt phù hợp với lối sống của bạn",
                    "Phân tích học tập nâng cao và theo dõi tiến độ",
                  ].map((feature, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "0.5rem 0",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #10b981 0%, #059669 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        <Check size={12} color="white" />
                      </div>
                      <span
                        style={{
                          color: "#374151",
                          fontSize: "0.95rem",
                          lineHeight: "1.6",
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phía nội dung */}
            <div
              style={{
                paddingLeft: "2rem",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background:
                    "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "50px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  marginBottom: "2rem",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                }}
              >
                <Heart size={16} />
                Về Tutorify
              </div>

              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  color: "#1a202c",
                  marginBottom: "2rem",
                  lineHeight: "1.2",
                }}
              >
                Trao quyền cho học sinh để{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "block",
                    marginTop: "0.5rem",
                  }}
                >
                  Xuất sắc trong mọi môn học
                </span>
              </h2>

              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#64748b",
                  lineHeight: "1.8",
                  marginBottom: "3rem",
                  maxWidth: "500px",
                }}
              >
                Tại Tutorify, chúng tôi tin rằng mỗi học sinh đều có tiềm năng
                đạt được sự vĩ đại. Nền tảng của chúng tôi kết nối bạn với các
                người hướng dẫn hàng đầu thế giới, cung cấp trải nghiệm học tập
                cá nhân hóa phù hợp với nhu cầu và mục tiêu riêng của bạn.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={{
                    background:
                      "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    padding: "1rem 2rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  }}
                >
                  Bắt đầu ngay hôm nay
                </button>

                <button
                  style={{
                    background: "transparent",
                    color: "#667eea",
                    border: "2px solid #667eea",
                    borderRadius: "12px",
                    padding: "1rem 2rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Play size={16} />
                  Xem bản demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phần Người hướng dẫn */}
      <section className="mentors-section">
        <div className="mentors-container">
          <div className="section-header">
            <h2 className="section-title">
              Gặp gỡ{" "}
              <span className="title-highlight">
                Người hướng dẫn ưu tú của chúng tôi
              </span>
            </h2>
            <p className="section-description">
              Học hỏi từ những người giỏi nhất. Các người hướng dẫn của chúng
              tôi là các chuyên gia được lựa chọn kỹ lưỡng, đam mê giúp học sinh
              đạt được ước mơ học tập của mình.
            </p>

            {/* Thanh tìm kiếm cho người hướng dẫn */}
            <div className="mentor-search">
              <div className="search-input-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Tìm người hướng dẫn theo tên hoặc môn học..."
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
                <p>
                  Không tìm thấy người hướng dẫn phù hợp với tìm kiếm của bạn.
                </p>
              </div>
            )}

            {!loading &&
              !error &&
              filteredMentors.length > 0 &&
              filteredMentors.map((mentor, index) =>
                renderMentorCard(mentor, index)
              )}
          </div>
        </div>
      </section>

      {/* Phần Giá cả */}
      <section className="pricing-section">
        <div className="pricing-container">
          <div className="section-header">
            <h2 className="section-title">
              Chọn{" "}
              <span className="pricing-highlight">
                Kế hoạch học tập của bạn
              </span>
            </h2>
            <p className="section-description">
              Giá cả linh hoạt được thiết kế phù hợp với ngân sách và mục tiêu
              học tập của mọi học sinh. Bắt đầu hành trình đến sự xuất sắc học
              thuật ngay hôm nay.
            </p>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <div className="popular-badge">Phổ biến nhất</div>
                )}

                <div className="pricing-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  <div className="plan-price">
                    {plan.price} VNĐ
                    <span className="price-period">/tháng</span>
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

                <button
                  className={`plan-btn ${
                    plan.popular ? "btn-primary" : "btn-outline"
                  }`}
                >
                  Bắt đầu
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phần Nhận xét nâng cao */}
      <section
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "4rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hình tròn trang trí */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "8%",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
            opacity: 0.1,
            animation: "float 8s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #ffd89b 0%, #19547b 100%)",
            opacity: 0.15,
            animation: "float 6s ease-in-out infinite reverse",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "5%",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #a8e6cf 0%, #88d8a3 100%)",
            opacity: 0.2,
            animation: "float 7s ease-in-out infinite",
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            width: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Tiêu đề phần */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "50px",
                fontSize: "0.875rem",
                marginBottom: "2rem",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              }}
            >
              <Heart size={16} />
              Câu chuyện thành công của học sinh
            </div>

            <h2
              style={{
                fontSize: "3.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1a202c",
                lineHeight: 1.1,
              }}
            >
              Điều học sinh của chúng tôi{" "}
              <span
                style={{
                  background:
                    "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Nói gì
              </span>
            </h2>

            <p
              style={{
                fontSize: "1.25rem",
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Những câu chuyện thực từ học sinh đã thay đổi hành trình học tập
              của mình với Tutorify.
            </p>
          </div>

          {/* Nội dung chính của nhận xét */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
              marginBottom: "4rem",
            }}
          >
            {/* Phía văn bản nhận xét */}
            <div
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "3rem",
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                position: "relative",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              {/* Biểu tượng trích dẫn */}
              <div
                style={{
                  position: "absolute",
                  top: "2rem",
                  right: "2rem",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.1,
                }}
              >
                <Quote size={24} color="white" />
              </div>

              {/* Nhãn chủ đề */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background:
                    "linear-gradient(45deg, #a8e6cf 0%, #88d8a3 100%)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "50px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  marginBottom: "1.5rem",
                }}
              >
                <Sparkles size={12} />
                {testimonials[currentTestimonial].subject ||
                  "Thành công học thuật"}
              </div>

              {/* Văn bản trích dẫn */}
              <blockquote
                style={{
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                  color: "#1a202c",
                  marginBottom: "2rem",
                  fontStyle: "italic",
                }}
              >
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Thông tin tác giả */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].author}
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      color: "#1a202c",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "0.875rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    {[...Array(testimonials[currentTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill="#fbbf24"
                          color="#fbbf24"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Phía hình ảnh */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              {/* Thẻ chỉ số thành công */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "20px",
                  padding: "2rem",
                  color: "white",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Award size={20} />
                </div>

                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  +40% Điểm số
                </div>
                <div
                  style={{
                    opacity: 0.9,
                    fontSize: "1rem",
                  }}
                >
                  Cải thiện trung bình
                </div>
              </div>

              {/* Hình ảnh học sinh */}
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "1.5rem",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
                  alt="Câu chuyện thành công"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "1rem",
                  }}
                />
                <div
                  style={{
                    fontWeight: "600",
                    color: "#1a202c",
                    marginBottom: "0.25rem",
                  }}
                >
                  Câu chuyện thành công
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "0.875rem",
                  }}
                >
                  Từ khó khăn đến xuất sắc
                </div>
              </div>
            </div>
          </div>

          {/* Điều hướng nâng cao */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {/* Nút Quay lại */}
            <button
              onClick={() =>
                setCurrentTestimonial(
                  (prev) =>
                    (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "white",
                border: "2px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <ChevronLeft size={20} color="#64748b" />
            </button>

            {/* Điểm điều hướng tròn */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  style={{
                    width: index === currentTestimonial ? "50px" : "40px",
                    height: index === currentTestimonial ? "50px" : "40px",
                    borderRadius: "50%",
                    background:
                      index === currentTestimonial
                        ? "linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
                        : "white",
                    border:
                      index === currentTestimonial
                        ? "none"
                        : "2px solid #e2e8f0",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      index === currentTestimonial
                        ? "0 8px 25px rgba(102, 126, 234, 0.4)"
                        : "0 2px 8px rgba(0,0,0,0.1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {index === currentTestimonial && (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                        }}
                      />
                    </div>
                  )}
                  {index !== currentTestimonial && (
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#cbd5e1",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Nút Tiếp theo */}
            <button
              onClick={() =>
                setCurrentTestimonial(
                  (prev) => (prev + 1) % testimonials.length
                )
              }
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "white",
                border: "2px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <ChevronRight size={20} color="#64748b" />
            </button>
          </div>
        </div>

        {/* Hiệu ứng CSS */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(180deg);
            }
          }

          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
          }

          .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.15) !important;
          }
        `}</style>
      </section>

      {/* Phần Kêu gọi hành động */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Sẵn sàng thay đổi{" "}
            <span className="cta-title-gradient">
              Hành trình học tập của bạn?
            </span>
          </h2>
          <p className="cta-description">
            Tham gia cùng hàng ngàn học sinh đã khám phá sức mạnh của học tập cá
            nhân hóa. Câu chuyện thành công của bạn bắt đầu từ đây.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn-primary">
              Bắt đầu dùng thử miễn phí
            </button>
            <button className="cta-btn-secondary">Lịch hẹn tư vấn</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernHomepage;
