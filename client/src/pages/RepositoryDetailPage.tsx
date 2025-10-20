import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { API_URL } from '../config/api';
import '../styles/RepositoryDetail.scss';

interface RepositoryConfig {
  geminiApiKey: string;
  claudeApiKey: string;
  githubToken: string;
  checklistPath: string;
  maxReviewComment: number;
  reviewLevel: 'CRITICAL' | 'MEDIUM' | 'LOW' | 'NITPICK';
  mode: string;
  autoTrigger: boolean;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  config: RepositoryConfig;
}

function RepositoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleBack = () => {
    navigate('/repositories');
  };

  const handleEdit = () => {
    navigate(`/repository/edit/${id}`);
  };

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await fetch(`${API_URL}/repositories`);
        const data = await response.json();
        const repo = data.find((r: Repository) => r.id === Number(id));
        setRepository(repo || null);
      } catch (error) {
        console.error('Failed to fetch repository:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepository();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header onLogout={handleLogout} />
        <div className="repository-detail">
          <div style={{ textAlign: 'center', padding: '40px', color: '#8b949e' }}>
            불러오는 중...
          </div>
        </div>
      </>
    );
  }

  if (!repository) {
    return (
      <>
        <Header onLogout={handleLogout} />
        <div className="repository-detail">
          <div style={{ textAlign: 'center', padding: '40px', color: '#f85149' }}>
            리포지토리를 찾을 수 없습니다.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header onLogout={handleLogout} />
      <div className="repository-detail">
        <button onClick={handleBack} className="back-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to List
        </button>

        <div className="detail-header">
          <h1>{repository.name}</h1>
          <div className="detail-stats">
            <span className="language">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="8"/>
              </svg>
              {repository.language}
            </span>
            <span className="stars">⭐ {repository.stars}</span>
          </div>
        </div>

        <div className="detail-content">
          <section className="detail-section">
            <h2>Description</h2>
            <p>{repository.description}</p>
          </section>

          <section className="detail-section">
            <div className="section-header">
              <h2>Configuration Settings</h2>
              <button onClick={handleEdit} className="edit-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit
              </button>
            </div>

            <div className="config-grid">
              <div className="config-item">
                <label className="config-label">
                  Gemini API Key
                  <span className="required">✅ 필수</span>
                </label>
                <span className="config-value">{repository.config.geminiApiKey}</span>
              </div>

              <div className="config-item">
                <label className="config-label">
                  Claude API Key
                  <span className="required">✅ 필수</span>
                </label>
                <span className="config-value">{repository.config.claudeApiKey}</span>
              </div>

              <div className="config-item">
                <label className="config-label">
                  GitHub Token
                  <span className="required">✅ 필수</span>
                </label>
                <span className="config-value">{repository.config.githubToken}</span>
              </div>

              <div className="config-item">
                <label className="config-label">
                  Checklist Path
                  <span className="optional">❌ 선택</span>
                </label>
                <span className="config-value">{repository.config.checklistPath}</span>
              </div>

              <div className="config-item">
                <label className="config-label">
                  Max Review Comment
                  <span className="optional">❌ 선택 (최대 50)</span>
                </label>
                <span className="config-value">{repository.config.maxReviewComment}</span>
              </div>

              <div className="config-item">
                <label className="config-label">
                  Review Level
                  <span className="optional">❌ 선택</span>
                </label>
                <span className={`config-value level-${repository.config.reviewLevel.toLowerCase()}`}>
                  {repository.config.reviewLevel}
                </span>
              </div>

              <div className="config-item">
                <label className="config-label">
                  Mode
                  <span className="optional">❌ 선택</span>
                </label>
                <span className="config-value">{repository.config.mode}</span>
              </div>

              <div className="config-item">
                <label className="config-label">
                  Auto Trigger
                  <span className="optional">❌ 선택</span>
                </label>
                <span className={`config-value ${repository.config.autoTrigger ? 'status-active' : 'status-inactive'}`}>
                  {repository.config.autoTrigger ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default RepositoryDetailPage;
