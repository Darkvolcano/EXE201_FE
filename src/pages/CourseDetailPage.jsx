import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  FileTextOutlined,
  PlayCircleOutlined 
} from '@ant-design/icons';
import { Card, Button, Modal, Form, Input, message, Tag, Empty } from 'antd';
import { useContentApi } from '../hooks/contentApiExtend';
import { useChapterApi } from '../hooks/chapterApiExtend';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../style/CourseDetailPage.css';

const { Meta } = Card;
const { TextArea } = Input;

const ChapterDetailPage = () => {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();
  const { 
    contents, 
    isLoading: contentsLoading, 
    error: contentsError, 
    createContent, 
    getContentsByChapter,
    clearError: clearContentError
  } = useContentApi();
  
  const { chapters } = useChapterApi();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(null);

  useEffect(() => {
    if (chapterId) {
      // Find current chapter from the chapters list
      const chapter = chapters.find(c => (c._id || c.id) === chapterId);
      setCurrentChapter(chapter);
      
      // Fetch contents for this chapter
      getContentsByChapter(chapterId);
    }
  }, [chapterId, chapters]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    clearContentError();
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const contentData = {
        ...values,
        chapterId: chapterId,
        createdBy: "682953018ebb6ea503ccd14b" // This should come from auth context
      };
      
      await createContent(contentData);
      message.success('Content created successfully!');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to create content. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const goBackToCourse = () => {
    navigate(`/profile-tutor/course/${courseId}`);
  };

  if (!currentChapter && !contentsLoading) {
    return (
      <div className="chapter-detail-container">
        <div className="chapter-detail-header">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={goBackToCourse}
          >
            Back to Course
          </Button>
        </div>
        <Empty description="Chapter not found" />
      </div>
    );
  }

  return (
    <div className="chapter-detail-container">
      <div className="chapter-detail-header">
        <div className="header-left">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={goBackToCourse}
            className="back-button"
          >
            Back to Course
          </Button>
          {currentChapter && (
            <div className="chapter-info">
              <h1><PlayCircleOutlined /> {currentChapter.title}</h1>
              <div className="chapter-meta">
                <Tag color="purple">
                  Chapter ID: {currentChapter._id || currentChapter.id}
                </Tag>
                {currentChapter.isActive !== undefined && (
                  <Tag color={currentChapter.isActive ? 'green' : 'red'}>
                    {currentChapter.isActive ? 'Active' : 'Inactive'}
                  </Tag>
                )}
              </div>
              {currentChapter.createdAt && (
                <p className="chapter-date">
                  Created: {formatDate(currentChapter.createdAt)}
                </p>
              )}
            </div>
          )}
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={showModal}
          size="large"
        >
          Add Content
        </Button>
      </div>

      <div className="contents-section">
        <div className="section-header">
          <h2><FileTextOutlined /> Chapter Contents</h2>
          <span className="content-count">{contents.length} contents</span>
        </div>

        {contentsLoading ? (
          <LoadingSpinner />
        ) : contentsError ? (
          <ErrorMessage message={contentsError} />
        ) : (
          <>
            <div className="contents-grid">
              {contents.map((content, index) => (
                <Card
                  key={content._id || content.id}
                  className="content-card"
                  actions={[
                    <EditOutlined key="edit" title="Edit Content" />,
                    <DeleteOutlined key="delete" title="Delete Content" />
                  ]}
                >
                  <Meta
                    avatar={<FileTextOutlined style={{ fontSize: '24px', color: '#52c41a' }} />}
                    title={
                      <div className="content-title">
                        <span className="content-number">Content {index + 1}</span>
                      </div>
                    }
                    description={
                      <div className="content-details">
                        <div className="content-description">
                          <p>{content.contentDescription}</p>
                        </div>
                        <div className="content-info">
                          <Tag color="cyan">
                            ID: {content._id || content.id}
                          </Tag>
                          {content.isActive !== undefined && (
                            <Tag color={content.isActive ? 'green' : 'red'}>
                              {content.isActive ? 'Active' : 'Inactive'}
                            </Tag>
                          )}
                        </div>
                        {content.createdAt && (
                          <div className="content-dates">
                            <small>Created: {formatDate(content.createdAt)}</small>
                            {content.updatedAt && content.updatedAt !== content.createdAt && (
                              <small>Updated: {formatDate(content.updatedAt)}</small>
                            )}
                          </div>
                        )}
                        {content.createdBy && (
                          <div className="content-author">
                            <small>By: {content.createdBy._id || content.createdBy}</small>
                          </div>
                        )}
                      </div>
                    }
                  />
                </Card>
              ))}
            </div>

              {contents.length === 0 && (
                <div className="empty-state">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span>
                        No contents yet. <br />
                        Create your first content to get started!
                      </span>
                    }
                  >
                    <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                      Create Content
                    </Button>
                  </Empty>
                </div>
              )}
                        </>
        )}
      </div>

      <Modal
        title="Create New Content"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            name="contentDescription"
            label="Content Description"
            rules={[{ required: true, message: 'Please enter content description' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Enter content description"
            />
          </Form.Item>

          <div className="form-buttons">
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Create Content
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ChapterDetailPage;