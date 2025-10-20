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

function RepositoryEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [config, setConfig] = useState<RepositoryConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleBack = () => {
    navigate(`/repository/${id}`);
  };

  const handleConfigChange = (field: keyof RepositoryConfig, value: string | number | boolean) => {
    if (config) {
      setConfig(prev => ({
        ...prev!,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    if (!config || !repository) return;

    setIsSaving(true);
    try {
      const response = await fetch(`${API_URL}/repositories/${repository.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config }),
      });

      if (response.ok) {
        alert('설정이 저장되었습니다.');
        navigate(`/repository/${id}`);
      } else {
        alert('설정 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('설정 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/repository/${id}`);
  };

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await fetch(`${API_URL}/repositories`);
        const data = await response.json();
        const repo = data.find((r: Repository) => r.id === Number(id));
        if (repo) {
          setRepository(repo);
          setConfig(repo.config);
        }
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

  if (!repository || !config) {
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
          Back to Detail
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
              <h2>Edit Configuration Settings</h2>
              <div className="edit-actions">
                <button onClick={handleSave} disabled={isSaving} className="save-button">
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button onClick={handleCancel} disabled={isSaving} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>

            <div className="config-grid">
              <div className="config-item">
                <label className="config-label">
                  Gemini API Key
                  <span className="required">✅ 필수</span>
                </label>
                <input
                  type="password"
                  value={config.geminiApiKey}
                  onChange={(e) => handleConfigChange('geminiApiKey', e.target.value)}
                  className="config-input"
                />
              </div>

              <div className="config-item">
                <label className="config-label">
                  Claude API Key
                  <span className="required">✅ 필수</span>
                </label>
                <input
                  type="password"
                  value={config.claudeApiKey}
                  onChange={(e) => handleConfigChange('claudeApiKey', e.target.value)}
                  className="config-input"
                />
              </div>

              <div className="config-item">
                <label className="config-label">
                  GitHub Token
                  <span className="required">✅ 필수</span>
                </label>
                <input
                  type="text"
                  value={config.githubToken}
                  onChange={(e) => handleConfigChange('githubToken', e.target.value)}
                  className="config-input"
                />
              </div>

              <div className="config-item">
                <label className="config-label">
                  Checklist Path
                  <span className="optional">❌ 선택</span>
                </label>
                <input
                  type="text"
                  value={config.checklistPath}
                  onChange={(e) => handleConfigChange('checklistPath', e.target.value)}
                  className="config-input"
                />
              </div>

              <div className="config-item">
                <label className="config-label">
                  Max Review Comment
                  <span className="optional">❌ 선택 (최대 50)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={config.maxReviewComment}
                  onChange={(e) => handleConfigChange('maxReviewComment', parseInt(e.target.value))}
                  className="config-input"
                />
              </div>

              <div className="config-item">
                <label className="config-label">
                  Review Level
                  <span className="optional">❌ 선택</span>
                </label>
                <select
                  value={config.reviewLevel}
                  onChange={(e) => handleConfigChange('reviewLevel', e.target.value)}
                  className="config-select"
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                  <option value="NITPICK">NITPICK</option>
                </select>
              </div>

              <div className="config-item">
                <label className="config-label">
                  Mode
                  <span className="optional">❌ 선택</span>
                </label>
                <input
                  type="text"
                  value={config.mode}
                  onChange={(e) => handleConfigChange('mode', e.target.value)}
                  className="config-input"
                />
              </div>

              <div className="config-item">
                <label className="config-label">
                  Auto Trigger
                  <span className="optional">❌ 선택</span>
                </label>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={config.autoTrigger}
                    onChange={(e) => handleConfigChange('autoTrigger', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default RepositoryEditPage;
