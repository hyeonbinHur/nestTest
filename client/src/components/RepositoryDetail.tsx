import { useState } from 'react';
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

interface RepositoryDetailProps {
  repository: Repository;
  onBack: () => void;
}

function RepositoryDetail({ repository, onBack }: RepositoryDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [config, setConfig] = useState<RepositoryConfig>(repository.config);
  const [isSaving, setIsSaving] = useState(false);

  const handleConfigChange = (field: keyof RepositoryConfig, value: string | number | boolean) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // API 호출로 설정 저장
      const response = await fetch(`http://localhost:3000/repositories/${repository.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config }),
      });

      if (response.ok) {
        setIsEditing(false);
        alert('설정이 저장되었습니다.');
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
    setConfig(repository.config);
    setIsEditing(false);
  };

  return (
    <div className="repository-detail">
      <button onClick={onBack} className="back-button">
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
          <div className="section-header">
            <h2>Configuration Settings</h2>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="edit-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={handleSave} disabled={isSaving} className="save-button">
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button onClick={handleCancel} disabled={isSaving} className="cancel-button">
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="config-grid">
            <div className="config-item">
              <label className="config-label">
                Gemini API Key
                <span className="required">✅ 필수</span>
              </label>
              {isEditing ? (
                <input
                  type="password"
                  value={config.geminiApiKey}
                  onChange={(e) => handleConfigChange('geminiApiKey', e.target.value)}
                  className="config-input"
                />
              ) : (
                <span className="config-value">{config.geminiApiKey}</span>
              )}
            </div>

            <div className="config-item">
              <label className="config-label">
                Claude API Key
                <span className="required">✅ 필수</span>
              </label>
              {isEditing ? (
                <input
                  type="password"
                  value={config.claudeApiKey}
                  onChange={(e) => handleConfigChange('claudeApiKey', e.target.value)}
                  className="config-input"
                />
              ) : (
                <span className="config-value">{config.claudeApiKey}</span>
              )}
            </div>

            <div className="config-item">
              <label className="config-label">
                GitHub Token
                <span className="required">✅ 필수</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={config.githubToken}
                  onChange={(e) => handleConfigChange('githubToken', e.target.value)}
                  className="config-input"
                />
              ) : (
                <span className="config-value">{config.githubToken}</span>
              )}
            </div>

            <div className="config-item">
              <label className="config-label">
                Checklist Path
                <span className="optional">❌ 선택</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={config.checklistPath}
                  onChange={(e) => handleConfigChange('checklistPath', e.target.value)}
                  className="config-input"
                />
              ) : (
                <span className="config-value">{config.checklistPath}</span>
              )}
            </div>

            <div className="config-item">
              <label className="config-label">
                Max Review Comment
                <span className="optional">❌ 선택 (최대 50)</span>
              </label>
              {isEditing ? (
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={config.maxReviewComment}
                  onChange={(e) => handleConfigChange('maxReviewComment', parseInt(e.target.value))}
                  className="config-input"
                />
              ) : (
                <span className="config-value">{config.maxReviewComment}</span>
              )}
            </div>

            <div className="config-item">
              <label className="config-label">
                Review Level
                <span className="optional">❌ 선택</span>
              </label>
              {isEditing ? (
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
              ) : (
                <span className={`config-value level-${config.reviewLevel.toLowerCase()}`}>
                  {config.reviewLevel}
                </span>
              )}
            </div>

            <div className="config-item">
              <label className="config-label">
                Mode
                <span className="optional">❌ 선택</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={config.mode}
                  onChange={(e) => handleConfigChange('mode', e.target.value)}
                  className="config-input"
                />
              ) : (
                <span className="config-value">{config.mode}</span>
              )}
            </div>

            <div className="config-item">
              <label className="config-label">
                Auto Trigger
                <span className="optional">❌ 선택</span>
              </label>
              {isEditing ? (
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={config.autoTrigger}
                    onChange={(e) => handleConfigChange('autoTrigger', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              ) : (
                <span className={`config-value ${config.autoTrigger ? 'status-active' : 'status-inactive'}`}>
                  {config.autoTrigger ? 'Enabled' : 'Disabled'}
                </span>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RepositoryDetail;
