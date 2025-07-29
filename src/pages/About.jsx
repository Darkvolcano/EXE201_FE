import React from "react";
import { Button } from "antd";
import "../style/About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Phần Hero */}
      <div className="about-hero">
        <img
          className="about-hero-img"
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=facearea&w=600&q=80"
          alt="Đội ngũ Tutorify"
        />
        <div className="about-hero-content">
          <div className="about-hero-title">Về Tutorify</div>
          <div className="about-hero-desc">
            Tutorify là một nền tảng hiện đại kết nối học sinh với những người
            hướng dẫn nhiệt huyết và các khóa học chất lượng cao.
            <br />
            Sứ mệnh của chúng tôi là làm cho việc học trở nên dễ tiếp cận, thú
            vị và hiệu quả cho mọi người.
            <br />
            Chúng tôi tin vào sức mạnh của giáo dục cá nhân hóa và một cộng đồng
            hỗ trợ.
          </div>
          <div className="about-hero-stats">
            <div className="about-stat">
              <div className="about-stat-number">100+</div>
              <div className="about-stat-label">Gia sư</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-number">10K+</div>
              <div className="about-stat-label">Học sinh</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-number">200+</div>
              <div className="about-stat-label">Khóa học</div>
            </div>
          </div>
          <div className="about-cta-buttons">
            <Button type="primary" size="large">
              Bắt đầu
            </Button>
            <Button type="default" size="large">
              Liên hệ với chúng tôi
            </Button>
          </div>
        </div>
      </div>

      {/* Phần Giới thiệu */}
      <div className="about-section">
        <img
          className="about-section-img"
          src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=400&q=80"
          alt="Học tập"
        />
        <div className="about-section-content">
          <div className="about-section-title">Chúng tôi là ai</div>
          <div className="about-section-desc">
            Chúng tôi là đội ngũ gồm các nhà giáo dục, nhà phát triển và những
            người mơ mộng muốn trao quyền cho người học trên khắp thế giới.
            <br />
            Tutorify cung cấp nhiều môn học, từ Tiếng Anh và Toán đến Lập trình
            và Điện toán Đám mây.
            <br />
            Các gia sư của chúng tôi được chọn lọc kỹ lưỡng dựa trên chuyên môn
            và đam mê giảng dạy.
          </div>
          <ul className="about-values-list">
            <li>✔ Đường dẫn học tập cá nhân hóa cho mỗi học sinh</li>
            <li>✔ Gia sư thân thiện, giàu kinh nghiệm và hỗ trợ</li>
            <li>
              ✔ Khóa học trực tuyến linh hoạt, bất cứ lúc nào và bất cứ đâu
            </li>
            <li>✔ Hỗ trợ và tài nguyên từ cộng đồng</li>
          </ul>
          <div className="about-cta-buttons">
            <Button type="primary">Tham gia với tư cách Học sinh</Button>
            <Button>Trở thành Gia sư</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
