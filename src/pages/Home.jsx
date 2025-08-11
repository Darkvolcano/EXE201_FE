import React, { useState, useEffect } from 'react';
import { Search, Star, Clock, Check, Play, ChevronLeft, ChevronRight, Users, Award, TrendingUp, Heart, Quote, Sparkles, Loader2, AlertCircle, Zap, Crown, Trophy, BookOpen, Target} from 'lucide-react';
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
import { useMentors } from '../hooks/useMentors';
const ModernHomepage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
   const [hoveredPlan, setHoveredPlan] = useState(null);

  // Sử dụng hook tùy chỉnh
  const { mentors, loading, error, searchMentors, getTopMentors, refreshMentors } = useMentors();
  
  // Lấy danh sách cố vấn đã lọc dựa trên truy vấn tìm kiếm
  const filteredMentors = searchQuery ? searchMentors(searchQuery) : getTopMentors(3);

  const testimonials = [
    { text: "Tutorify đã thay đổi hoàn toàn kết quả học tập của tôi! Cố vấn của tôi đã giúp tôi hiểu các khái niệm toán học phức tạp mà tôi đã phải vật lộn trong nhiều tháng.", author: "Trần Thị Sarah", role: "Học sinh Trung học", rating: 5, image: testimonial1Image },
    { text: "Chất lượng giảng dạy ở đây thật đặc biệt. Điểm số môn vật lý của tôi đã cải thiện đáng kể chỉ sau một vài buổi học.", author: "Nguyễn Văn Michael", role: "Sinh viên Đại học", rating: 5, image: testimonial2Image },
    { text: "Tôi đã phải vật lộn với môn hóa học cho đến khi tôi tìm thấy Tutorify. Cố vấn của tôi đã làm cho các phản ứng phức tạp có vẻ đơn giản và thú vị.", author: "Lê Thị Emma", role: "Học sinh cuối cấp", rating: 5, image: testimonial3Image },
    { text: "Khoản đầu tư tốt nhất mà tôi đã thực hiện cho việc học của mình. Các kế hoạch học tập được cá nhân hóa đã giúp tôi đạt được điểm SAT mơ ước.", author: "Phạm Văn David", role: "Học sinh trung học cơ sở", rating: 5, image: testimonial4Image }
  ];


  const pricingPlans = [
    {
      name: "Cơ bản",
      price: "19",
      description: "Hoàn hảo để bắt đầu hành trình học tập của bạn",
      icon: BookOpen,
      color: "gradient-blue",
      bgColor: "bg-white-10",
      features: [
        "Truy cập hơn 10 khóa học",
        "Tài liệu học tập cơ bản",
        "Hỗ trợ qua email",
        "Truy cập ứng dụng di động",
        "Theo dõi tiến độ"
      ],
      popular: false
    },
    {
      name: "Chuyên nghiệp",
      price: "39",
      description: "Tốt nhất cho những người học nghiêm túc muốn có nguồn tài nguyên toàn diện",
      icon: Target,
      color: "gradient-green",
      bgColor: "bg-white-20",
      features: [
        "Truy cập hơn 50 khóa học",
        "Tài liệu học tập nâng cao",
        "Hỗ trợ ưu tiên",
        "Tải xuống ngoại tuyến",
        "Lộ trình học tập được cá nhân hóa",
        "Hội thảo trực tuyến trực tiếp",
        "Chứng chỉ hoàn thành"
      ],
      popular: true
    },
    {
      name: "Cao cấp",
      price: "59",
      description: "Dành cho các chuyên gia tìm kiếm các kỹ năng và chứng chỉ nâng cao",
      icon: Star,
      color: "gradient-purple",
      bgColor: "bg-white-30",
      features: [
        "Truy cập hơn 100 khóa học",
        "Tài liệu học tập cao cấp",
        "Các buổi dạy kèm 1 kèm 1",
        "Hướng nghiệp",
        "Chứng chỉ ngành",
        "Hội thảo độc quyền",
        "Hỗ trợ tìm việc làm"
      ],
      popular: false
    },
    {
      name: "Doanh nghiệp",
      price: "99",
      description: "Giải pháp hoàn chỉnh cho các nhóm và tổ chức",
      icon: Crown,
      color: "gradient-pink",
      bgColor: "bg-white-20",
      features: [
        "Truy cập khóa học không giới hạn",
        "Tạo nội dung tùy chỉnh",
        "Quản lý tài khoản chuyên dụng",
        "Phân tích nhóm",
        "Tích hợp API",
        "Giải pháp nhãn trắng",
        "Hỗ trợ cao cấp 24/7"
      ],
      popular: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

 // Xử lý đặt lịch học
  const handleBookSession = (mentor) => {
    // Bạn có thể triển khai điều hướng đến trang đặt lịch hoặc mở modal
    console.log('Đặt lịch học với:', mentor);
    // Ví dụ: điều hướng đến trang đặt lịch
    // navigate(`/booking/${mentor.courseId}`);
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Hiển thị thẻ cố vấn với trạng thái đang tải
  const renderMentorCard = (mentor, index) => (
    <div key={mentor.id || index} className="mentor-card">
      <img 
        src={mentor.image || '/default-avatar.png'} 
        alt={mentor.name} 
        className="mentor-avatar"
        onError={(e) => {
          e.target.src = '/default-avatar.png';
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
              {mentor.rating > 0 ? `${mentor.rating} (${mentor.reviews})` : 'Gia sư mới'}
            </span>
          </div>
        </div>

        {mentor.price && (
          <div className="mentor-price">
            <span>${mentor.price}/buổi học</span>
          </div>
        )}

        <button 
          className="mentor-btn"
          onClick={() => handleBookSession(mentor)}
        >
          Đặt lịch học
        </button>
      </div>
    </div>
  );

  // Hiển thị trạng thái đang tải
  const renderLoadingState = () => (
    <div className="mentors-loading">
      <Loader2 className="icon-lg animate-spin" />
      <p>Đang tải các cố vấn tuyệt vời của chúng tôi...</p>
    </div>
  );

  // Hiển thị trạng thái lỗi
  const renderErrorState = () => (
    <div className="mentors-error">
      <AlertCircle className="icon-lg text-red-500" />
      <p>Không thể tải cố vấn. Vui lòng thử lại.</p>
      <button 
        className="retry-btn"
        onClick={refreshMentors}
      >
        Thử lại
      </button>
    </div>
  );


   return (
       <div style={{ fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.6, color: '#1a202c' }}>
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
      {/* Phần Hero - Bố cục được cải thiện */}
      <section style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Các yếu tố nền hoạt hình */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(61, 90, 219, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '60px',
          height: '60px',
          background: 'rgba(61, 90, 219, 0.05)',
          borderRadius: '50%',
          animation: 'float 4s ease-in-out infinite reverse'
        }}></div>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 2rem',
          width: '100%',
          marginTop: 10
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '4rem', 
            alignItems: 'center',
            minHeight: '80vh'
          }}>
            <div style={{ color: '#1a202c', zIndex: 2 }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                background: 'rgba(61, 90, 219, 0.1)', 
                color: 'rgb(61, 90, 219)',
                padding: '0.5rem 1rem', 
                borderRadius: '50px', 
                fontSize: '0.875rem', 
                marginBottom: '2rem',
                border: '1px solid rgba(61, 90, 219, 0.2)'
              }}>
                <Heart size={16} />
                Chuyển đổi hành trình học tập của bạn
              </div>
              
              <h1 style={{ 
                fontSize: '3.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                lineHeight: 1.1,
                color: '#1a202c'
              }}>
                Mở khóa{' '}
                <span style={{ 
                  background: 'linear-gradient(45deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block'
                }}>
                  Tiềm năng học tập của bạn
                </span>
              </h1>
              
              <p style={{ 
                fontSize: '1.25rem', 
                marginBottom: '3rem',
                color: '#64748b',
                maxWidth: '500px'
              }}>
                Kết nối với các cố vấn đẳng cấp thế giới, những người cung cấp dịch vụ dạy kèm 1 kèm 1 được cá nhân hóa được thiết kế để đẩy nhanh việc học của bạn và đạt được sự xuất sắc trong mọi môn học.
              </p>

              {/* Lưới thống kê - Nâng cao với Gradient và hoạt hình */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '2rem', 
                marginBottom: '3rem'
              }}>
                {[
                  { number: "500+", label: "Cố vấn chuyên gia", icon: Users },
                  { number: "25K+", label: "Câu chuyện thành công", icon: Award },
                  { number: "98%", label: "Tỷ lệ thành công", icon: TrendingUp }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      textAlign: 'center',
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ 
                      background: 'linear-gradient(135deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)', 
                      borderRadius: '16px', 
                      padding: '1.5rem', 
                      marginBottom: '1rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: '0 8px 25px rgba(61, 90, 219, 0.3)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                        transform: 'rotate(45deg)',
                        animation: 'shimmer 3s infinite'
                      }}></div>
                      <stat.icon size={28} style={{ position: 'relative', zIndex: 1 }} />
                    </div>
                    <div style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.5rem', 
                      background: 'linear-gradient(135deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      transition: 'all 0.3s ease'
                    }}>
                      {stat.number}
                    </div>
                    <div style={{ 
                      color: '#64748b', 
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      letterSpacing: '0.5px'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hộp tìm kiếm nâng cao với các hiệu ứng hiện đại */}
              <div style={{ 
                background: 'white', 
                borderRadius: '20px', 
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(61, 90, 219, 0.15), 0 0 0 1px rgba(61, 90, 219, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgb(61, 90, 219), transparent)',
                  animation: 'slideRight 2s infinite'
                }}></div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    flex: 1,
                    background: '#f8fafc',
                    borderRadius: '16px',
                    padding: '1rem 1.25rem',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '2px solid rgb(61, 90, 219)';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(61, 90, 219, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '2px solid transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <Search size={22} style={{ color: '#6b7280', marginRight: '1rem' }} />
                    <input
                      type="text"
                      placeholder="Tìm kiếm môn học, cố vấn hoặc chủ đề..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        width: '100%',
                        color: '#1a202c',
                        fontSize: '1.05rem',
                        fontWeight: '400'
                      }}
                    />
                  </div>
                  <button 
                    style={{
                      background: 'linear-gradient(135deg, rgb(61, 90, 219) 0%, rgb(45, 70, 180) 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '1rem 2.5rem',
                      fontSize: '1.05rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(61, 90, 219, 0.4)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(61, 90, 219, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(61, 90, 219, 0.4)';
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>Tìm cố vấn</span>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '0',
                      height: '0',
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.6s ease'
                    }}></div>
                  </button>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ 
                background: 'white', 
                borderRadius: '24px', 
                padding: '2rem',
                boxShadow: '0 25px 50px rgba(61, 90, 219, 0.15)',
                border: '1px solid rgba(61, 90, 219, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 35px 60px rgba(61, 90, 219, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(61, 90, 219, 0.15)';
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  height: '4px',
                  background: 'linear-gradient(90deg, rgb(61, 90, 219), rgb(45, 70, 180), rgb(61, 90, 219))',
                  borderRadius: '24px 24px 0 0'
                }}></div>
                <img 
                  src={heroImage} 
                  alt="Học sinh đang học" 
                  style={{ 
                    width: '100%', 
                    height: '400px', 
                    objectFit: 'cover', 
                    borderRadius: '16px',
                    transition: 'all 0.3s ease'
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
{/* Phần Giới thiệu - Đã sửa */}
<section style={{
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  padding: '6rem 0',
  position: 'relative'
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
      gap: '6rem',
      alignItems: 'center'
    }}>
      {/* Phía hình ảnh */}
      <div style={{
        position: 'relative'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <img 
            src={aboutImage} 
            alt="Trải nghiệm học tập" 
            style={{
              width: '100%',
              height: '300px 80%',
              objectFit: 'cover',
              borderRadius: '16px',
              marginBottom: '2rem'
            }}
          />
          
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Tại sao học sinh chọn Tutorify
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {[
              "Trải nghiệm học tập 1 kèm 1 được cá nhân hóa",
              "Cố vấn chuyên gia với thành tích đã được chứng minh", 
              "Lịch học linh hoạt phù hợp với lối sống của bạn",
              "Phân tích học tập và theo dõi tiến độ nâng cao"
            ].map((feature, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.5rem 0'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <Check size={12} color="white" />
                </div>
                <span style={{
                  color: '#374151',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phía nội dung */}
      <div style={{
        paddingLeft: '2rem'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '50px',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '2rem',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
        }}>
          <Heart size={16} />
          Về Tutorify
        </div>

        <h2 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#1a202c',
          marginBottom: '2rem',
          lineHeight: '1.2'
        }}>
          Trao quyền cho học sinh
          <span style={{
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'block',
            marginTop: '0.5rem'
          }}>
            Xuất sắc trong mọi môn học
          </span>
        </h2>

        <p style={{
          fontSize: '1.2rem',
          color: '#64748b',
          lineHeight: '1.8',
          marginBottom: '3rem',
          maxWidth: '500px'
        }}>
          Tại Tutorify, chúng tôi tin rằng mỗi học sinh đều có tiềm năng để đạt được thành công. Nền tảng của chúng tôi kết nối bạn với các cố vấn đẳng cấp thế giới, những người cung cấp trải nghiệm học tập được cá nhân hóa phù hợp với nhu cầu và mục tiêu riêng của bạn.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button style={{
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
          }}>
            Bắt đầu ngay hôm nay
          </button>
          
          <button style={{
            background: 'transparent',
            color: '#667eea',
            border: '2px solid #667eea',
            borderRadius: '12px',
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Play size={16} />
            Xem Demo
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Phần Cố vấn */}
      <section className="mentors-section">
        <div className="mentors-container">
          <div className="section-header">
            <h2 className="section-title">
              Gặp gỡ <span className="title-highlight">Các cố vấn ưu tú</span> của chúng tôi
            </h2>
            <p className="section-description">
              Học hỏi từ những người giỏi nhất. Các cố vấn của chúng tôi là những chuyên gia được lựa chọn cẩn thận, những người đam mê giúp đỡ sinh viên đạt được ước mơ học tập của mình.
            </p>
            
            {/* Thanh tìm kiếm cố vấn */}
            <div className="mentor-search">
              <div className="search-input-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Tìm kiếm cố vấn theo tên hoặc môn học..."
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
                <p>Không tìm thấy cố vấn nào phù hợp với tìm kiếm của bạn.</p>
              </div>
            )}
            
            {!loading && !error && filteredMentors.length > 0 && 
              filteredMentors.map((mentor, index) => renderMentorCard(mentor, index))
            }
          </div>

        </div>
      </section>

      {/* Phần Giá cả */}
      <section class="pricing-section">
        <div class="pricing-container">
            {/* Tiêu đề */}
            <div class="pricing-header">
                <div class="pricing-badge">
                    <span class="pulse-dot"></span>
                    <span class="badge-text">Các gói giá</span>
                </div>
                
                <h2 class="pricing-title">
                    
                    <span class="gradient-text">Chọn gói học tập của bạn</span>
                </h2>
                
                <p class="pricing-subtitle">
                    Giá cả linh hoạt được thiết kế để phù hợp với ngân sách và mục tiêu học tập của mọi sinh viên. 
                    Hãy bắt đầu hành trình đến với sự xuất sắc trong học tập ngay hôm nay.
                </p>
            </div>


            <div class="pricing-grid">
                
                <div class="pricing-card">
                    <div class="card-container">
                        <div class="card-content">
                            <div class="plan-icon bg-blue">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                </svg>
                            </div>

                            <div class="plan-header">
                                <h3 class="plan-name">Cơ bản</h3>
                                <p class="plan-description">Hoàn hảo để bắt đầu hành trình học tập của bạn</p>
                            </div>

                            <div class="price-container">
                                <div class="price-display">
                                    <span class="price-amount">$19</span>
                                    <span class="price-period">/tháng</span>
                                </div>
                            </div>

                            <div class="features-list">
                                <div class="feature-item">
                                    <div class="feature-icon bg-blue">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Truy cập hơn 10 khóa học</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-blue">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Tài liệu học tập cơ bản</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-blue">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Hỗ trợ qua email</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-blue">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Truy cập ứng dụng di động</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-blue">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Theo dõi tiến độ</span>
                                </div>
                            </div>

                            <button class="plan-button standard">Chọn gói</button>
                        </div>
                    </div>
                </div>

               
                <div class="pricing-card popular">
                    <div class="popular-badge">
                        <div class="popular-badge-inner">⭐ Phổ biến nhất</div>
                    </div>
                    <div class="card-container">
                        <div class="card-content">
                            <div class="plan-icon bg-green">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M12 1v6m0 6v6"/>
                                    <path d="m15.5 4.5-3 3m0 0-3-3m3 3v6"/>
                                </svg>
                            </div>

                            <div class="plan-header">
                                <h3 class="plan-name">Chuyên nghiệp</h3>
                                <p class="plan-description">Tốt nhất cho những người học nghiêm túc muốn có nguồn tài nguyên toàn diện</p>
                            </div>

                            <div class="price-container">
                                <div class="price-display">
                                    <span class="price-amount">$39</span>
                                    <span class="price-period">/tháng</span>
                                </div>
                            </div>

                            <div class="features-list">
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Truy cập hơn 50 khóa học</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Tài liệu học tập nâng cao</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Hỗ trợ ưu tiên</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Tải xuống ngoại tuyến</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Lộ trình học tập được cá nhân hóa</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Hội thảo trực tuyến trực tiếp</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-green">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Chứng chỉ hoàn thành</span>
                                </div>
                            </div>

                            <button class="plan-button popular bg-green">Bắt đầu ngay</button>
                        </div>
                    </div>
                </div>

                
                <div class="pricing-card">
                    <div class="card-container">
                        <div class="card-content">
                            <div class="plan-icon bg-purple">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                                </svg>
                            </div>

                            <div class="plan-header">
                                <h3 class="plan-name">Cao cấp</h3>
                                <p class="plan-description">Dành cho các chuyên gia tìm kiếm các kỹ năng và chứng chỉ nâng cao</p>
                            </div>

                            <div class="price-container">
                                <div class="price-display">
                                    <span class="price-amount">$59</span>
                                    <span class="price-period">/tháng</span>
                                </div>
                            </div>

                            <div class="features-list">
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Truy cập hơn 100 khóa học</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Tài liệu học tập cao cấp</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Các buổi dạy kèm 1 kèm 1</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Hướng nghiệp</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Chứng chỉ ngành</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Hội thảo độc quyền</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-purple">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Hỗ trợ tìm việc làm</span>
                                </div>
                            </div>

                            <button class="plan-button standard">Chọn gói</button>
                        </div>
                    </div>
                </div>

                
                <div class="pricing-card">
                    <div class="card-container">
                        <div class="card-content">
                            <div class="plan-icon bg-pink">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>

                            <div class="plan-header">
                                <h3 class="plan-name">Doanh nghiệp</h3>
                                <p class="plan-description">Giải pháp hoàn chỉnh cho các nhóm và tổ chức</p>
                            </div>

                            <div class="price-container">
                                <div class="price-display">
                                    <span class="price-amount">$99</span>
                                    <span class="price-period">/tháng</span>
                                </div>
                            </div>

                            <div class="features-list">
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Truy cập khóa học không giới hạn</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Tạo nội dung tùy chỉnh</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Quản lý tài khoản chuyên dụng</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Phân tích nhóm</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Tích hợp API</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Giải pháp nhãn trắng</span>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon bg-pink">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                            <polyline points="20,6 9,17 4,12"/>
                                        </svg>
                                    </div>
                                    <span class="feature-text">Hỗ trợ cao cấp 24/7</span>
                                </div>
                            </div>

                            <button class="plan-button standard">Chọn gói</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

      <style jsx>{`
        

        /* Phần Giá cả */
        .pricing-section {
            position: relative;
            padding: 3rem 1.5rem;
        }

        .pricing-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Kiểu Tiêu đề */
        .pricing-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .pricing-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            border-radius: 50px;
            padding: 0.5rem 1rem;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .pulse-dot {
            width: 0.5rem;
            height: 0.5rem;
            background: #4ade80;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        .badge-text {
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.875rem;
            font-weight: 500;
        }

        .pricing-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1rem;
            line-height: 1.2;
        }

        .gradient-text {
            background: linear-gradient(to right, #22d3ee, #a855f7, #ec4899);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradient-pulse 3s ease-in-out infinite;
        }

        .pricing-subtitle {
            font-size: 1.125rem;
            color: rgba(255, 255, 255, 0.8);
            max-width: 28rem;
            margin: 0 auto;
            line-height: 1.6;
        }

        /* Bố cục Lưới */
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            max-width: 1100px;
            margin: 0 auto;
        }

        @media (min-width: 768px) {
            .pricing-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 1024px) {
            .pricing-grid {
                grid-template-columns: repeat(4, 1fr);
                gap: 1.25rem;
            }
        }

        /* Kiểu Thẻ */
        .pricing-card {
            position: relative;
            cursor: pointer;
            transition: all 0.4s ease;
            transform-origin: center;
            height: 100%;
        }

        .pricing-card:hover {
            transform: scale(1.03);
        }

        .pricing-card.popular {
            transform: scale(1.05);
        }

        .pricing-card.popular:hover {
            transform: scale(1.08);
        }

        .popular-badge {
            position: absolute;
            top: -0.75rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 20;
        }

        .popular-badge-inner {
            background: linear-gradient(to right, #facc15, #f97316);
            color: white;
            padding: 0.25rem 0.875rem;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: bounce 2s infinite;
        }

        .card-container {
            position: relative;
            overflow: hidden;
            border-radius: 1.25rem;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            transition: all 0.4s ease;
            background: rgba(255, 255, 255, 0.95);
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .card-container:hover {
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
        }

        .card-content {
            position: relative;
            padding: 1.75rem 1.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        /* Kiểu Biểu tượng */
        .plan-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 1rem;
            margin-bottom: 1.25rem;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            flex-shrink: 0;
        }

        /* Tiêu đề Gói */
        .plan-header {
            margin-bottom: 1.25rem;
            flex-shrink: 0;
        }

        .plan-name {
            font-size: 1.375rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
        }

        .plan-description {
            color: #6b7280;
            font-size: 0.875rem;
            line-height: 1.5;
        }

        /* Giá */
        .price-container {
            margin-bottom: 1.5rem;
            flex-shrink: 0;
        }

        .price-display {
            display: flex;
            align-items: baseline;
        }

        .price-amount {
            font-size: 2.5rem;
            font-weight: 700;
            color: #111827;
        }

        .price-period {
            color: #6b7280;
            margin-left: 0.5rem;
            font-size: 0.875rem;
        }

        /* Tính năng */
        .features-list {
            margin-bottom: 1.5rem;
            flex: 1;
        }

        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 0.75rem;
            transition: all 0.2s ease;
        }

        .feature-item:hover .feature-text {
            color: #111827;
        }

        .feature-icon {
            flex-shrink: 0;
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .feature-text {
            margin-left: 0.75rem;
            color: #374151;
            transition: color 0.2s ease;
            font-size: 0.875rem;
            line-height: 1.4;
        }

        /* Nút */
        .plan-button {
            width: 100%;
            padding: 0.875rem 1rem;
            border-radius: 0.875rem;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 0.875rem;
            margin-top: auto;
            flex-shrink: 0;
        }

        .plan-button.popular {
            color: white;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .plan-button.popular:hover {
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
        }

        .plan-button.standard {
            background: rgba(255, 255, 255, 0.8);
            color: #111827;
            border: 1px solid #e5e7eb;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .plan-button.standard:hover {
            background: white;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
        }

        /* Màu nền */
        .bg-blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
        .bg-green { background: linear-gradient(135deg, #10b981, #059669); }
        .bg-purple { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
        .bg-pink { background: linear-gradient(135deg, #ec4899, #be185d); }

        /* Hoạt ảnh */
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        @keyframes gradient-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
        }

        /* Thiết kế đáp ứng */
        @media (min-width: 768px) {
            .pricing-title {
                font-size: 3rem;
            }
        }

        @media (max-width: 767px) {
            .pricing-grid {
                grid-template-columns: 1fr;
                max-width: 400px;
            }
            
            .pricing-title {
                font-size: 2rem;
            }
        }
      `}</style>
      {/* Phần đánh giá nâng cao */}
<section style={{
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: '4rem 0',
  position: 'relative',
  overflow: 'hidden'
}}>
  {/* Các vòng tròn trang trí */}
  <div style={{
    position: 'absolute',
    top: '15%',
    left: '8%',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    opacity: 0.1,
    animation: 'float 8s ease-in-out infinite'
  }} />
  
  <div style={{
    position: 'absolute',
    bottom: '20%',
    right: '10%',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #ffd89b 0%, #19547b 100%)',
    opacity: 0.15,
    animation: 'float 6s ease-in-out infinite reverse'
  }} />

  <div style={{
    position: 'absolute',
    top: '60%',
    left: '5%',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #a8e6cf 0%, #88d8a3 100%)',
    opacity: 0.2,
    animation: 'float 7s ease-in-out infinite'
  }} />

  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    width: '100%',
    position: 'relative',
    zIndex: 2
  }}>
    {/* Tiêu đề phần */}
    <div style={{
      textAlign: 'center',
      marginBottom: '4rem'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '50px',
        fontSize: '0.875rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
      }}>
        <Heart size={16} />
        Câu chuyện thành công của học sinh
      </div>

      <h2 style={{
        fontSize: '3.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: '#1a202c',
        lineHeight: 1.1
      }}>
        Học sinh của chúng tôi{' '}
        <span style={{
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          nói gì
        </span>
      </h2>

      <p style={{
        fontSize: '1.25rem',
        color: '#64748b',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: 1.6
      }}>
        Những câu chuyện có thật từ những học sinh đã thay đổi hành trình học tập của mình với Tutorify.
      </p>
    </div>

    {/* Nội dung đánh giá chính */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center',
      marginBottom: '4rem'
    }}>
      {/* Phần văn bản đánh giá */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '3rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        position: 'relative',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        {/* Biểu tượng trích dẫn */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.1
        }}>
          <Quote size={24} color="white" />
        </div>

        {/* Huy hiệu môn học */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(45deg, #a8e6cf 0%, #88d8a3 100%)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '50px',
          fontSize: '0.75rem',
          fontWeight: '600',
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={12} />
          {testimonials[currentTestimonial].subject || 'Thành công trong học tập'}
        </div>

        {/* Văn bản trích dẫn */}
        <blockquote style={{
          fontSize: '1.25rem',
          lineHeight: 1.7,
          color: '#1a202c',
          marginBottom: '2rem',
          fontStyle: 'italic'
        }}>
          "{testimonials[currentTestimonial].text}"
        </blockquote>

        {/* Thông tin tác giả */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={testimonials[currentTestimonial].image} 
              alt={testimonials[currentTestimonial].author}
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          </div>
          <div>
            <div style={{
              fontWeight: '600',
              fontSize: '1.1rem',
              color: '#1a202c',
              marginBottom: '0.25rem'
            }}>
              {testimonials[currentTestimonial].author}
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '0.875rem',
              marginBottom: '0.5rem'
            }}>
              {testimonials[currentTestimonial].role}
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phần hình ảnh */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Thẻ chỉ số thành công */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '2rem',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={20} />
          </div>
          
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            +40% Điểm
          </div>
          <div style={{
            opacity: 0.9,
            fontSize: '1rem'
          }}>
            Cải thiện trung bình
          </div>
        </div>

        {/* Hình ảnh học sinh */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
            alt="Câu chuyện thành công" 
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '1rem'
            }}
          />
          <div style={{
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '0.25rem'
          }}>
            Câu chuyện thành công
          </div>
          <div style={{
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            Từ khó khăn đến xuất sắc
          </div>
        </div>
      </div>
    </div>

    {/* Điều hướng nâng cao */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem'
    }}>
      {/* Nút Quay lại */}
      <button 
        onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'white',
          border: '2px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <ChevronLeft size={20} color="#64748b" />
      </button>

      {/* Điều hướng bằng các chấm tròn */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            style={{
              width: index === currentTestimonial ? '50px' : '40px',
              height: index === currentTestimonial ? '50px' : '40px',
              borderRadius: '50%',
              background: index === currentTestimonial 
                ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' 
                : 'white',
              border: index === currentTestimonial 
                ? 'none' 
                : '2px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: index === currentTestimonial 
                ? '0 8px 25px rgba(102, 126, 234, 0.4)' 
                : '0 2px 8px rgba(0,0,0,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {index === currentTestimonial && (
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
                }} />
              </div>
            )}
            {index !== currentTestimonial && (
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#cbd5e1'
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Nút Tiếp theo */}
      <button 
        onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'white',
          border: '2px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <ChevronRight size={20} color="#64748b" />
      </button>
    </div>
  </div>

  {/* Hoạt ảnh CSS */}
  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(180deg); }
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
    }
    
    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 25px 70px rgba(0,0,0,0.15) !important;
    }
  `}</style>
</section>

      {/* Phần Kêu gọi hành động */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Sẵn sàng chuyển đổi hành trình
            <span className="cta-title-gradient">học tập của bạn?</span>
          </h2>
          <p className="cta-description">
            Tham gia cùng hàng nghìn sinh viên đã khám phá sức mạnh của việc học tập được cá nhân hóa. Câu chuyện thành công của bạn bắt đầu từ đây.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn-primary">Bắt đầu dùng thử miễn phí</button>
            <button className="cta-btn-secondary">Lên lịch tư vấn</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernHomepage;