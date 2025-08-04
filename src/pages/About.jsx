import React from "react";
import { Button } from "antd";
import { FacebookFilled } from "@ant-design/icons";
import "../style/About.css";

const FANPAGE_LINK = "https://shorturl.at/E2TNK";

const About = () => {
  const handleFanpage = () => {
    window.open(FANPAGE_LINK, "_blank");
  };

  return (
    <div className="about-new-bg">
      {/* Square 1: Hero/About */}
      <section className="about-info-card main-card">
        <div className="about-info-content">
          <h1 className="about-card-title">Về Tutorify</h1>
          <p className="about-card-desc">
            Tutorify là một nền tảng hiện đại kết nối học sinh với những người hướng dẫn nhiệt huyết và các khóa học chất lượng cao.<br />
            Sứ mệnh của chúng tôi là làm cho việc học trở nên dễ tiếp cận, thú vị và hiệu quả cho mọi người.<br />
            Chúng tôi tin vào sức mạnh của giáo dục cá nhân hóa và một cộng đồng hỗ trợ.
          </p>
          <div className="about-info-stats">
            <div>
              <div>100+</div>
              <span>Gia sư</span>
            </div>
            <div>
              <div>10K+</div>
              <span>Học sinh</span>
            </div>
            <div>
              <div>200+</div>
              <span>Khóa học</span>
            </div>
          </div>
          <div className="about-info-actions">
            <Button type="primary" className="cta-btn main" size="large">
              Bắt đầu
            </Button>
            <Button className="cta-btn outline" size="large">
              Liên hệ với chúng tôi
            </Button>
            <Button
              className="cta-btn fanpage"
              size="large"
              icon={<FacebookFilled style={{ fontSize: 20, color: "#1877f3" }}/>}
              onClick={handleFanpage}
            >
              Fanpage Facebook
            </Button>
          </div>
        </div>
        <div className="about-info-img">
          <img
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=facearea&w=600&q=80"
            alt="Tutorify Team"
          />
        </div>
      </section>

      {/* Square 2: Who We Are */}
      <section className="about-info-card sub-card">
        <div className="about-info-img">
          <img
            src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=400&q=80"
            alt="Học tập"
          />
        </div>
        <div className="about-info-content">
          <h2 className="about-card-title sub">Chúng tôi là ai</h2>
          <p className="about-card-desc sub">
            Chúng tôi là đội ngũ gồm các nhà giáo dục, nhà phát triển và những người mơ mộng muốn trao quyền cho người học trên khắp thế giới.<br />
            Tutorify cung cấp nhiều môn học, từ Tiếng Anh và Toán đến Lập trình và Điện toán Đám mây.<br />
            Các gia sư của chúng tôi được chọn lọc kỹ lưỡng dựa trên chuyên môn và đam mê giảng dạy.
          </p>
          <ul className="about-list">
            <li>✓ Đường dẫn học tập cá nhân hóa cho mỗi học sinh</li>
            <li>✓ Gia sư thân thiện, giàu kinh nghiệm và hỗ trợ</li>
            <li>✓ Khóa học trực tuyến linh hoạt, bất cứ lúc nào và bất cứ đâu</li>
            <li>✓ Hỗ trợ và tài nguyên từ cộng đồng</li>
          </ul>
          <div className="about-info-actions bottom">
            <Button type="primary" className="cta-btn main" size="large">
              Tham gia với tư cách Học sinh
            </Button>
            <Button className="cta-btn outline" size="large">
              Trở thành Gia sư
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
