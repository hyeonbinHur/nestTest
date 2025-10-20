import { useState } from 'react';
import Header from './Header';
import RepositoryDetail from './RepositoryDetail';
import '../styles/FruitList.scss';

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

interface FruitListProps {
  onLogout: () => void;
}

function FruitList({ onLogout }: FruitListProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/repositories');

      if (!response.ok) {
        throw new Error('리포지토리 목록을 가져오는데 실패했습니다.');
      }

      const data = await response.json();
      console.log('API Response:', data);
      setRepositories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRepositoryClick = (repository: Repository) => {
    setSelectedRepository(repository);
  };

  const handleBackToList = () => {
    setSelectedRepository(null);
  };

  // 상세 페이지 렌더링
  if (selectedRepository) {
    return (
      <>
        <Header onLogout={onLogout} />
        <RepositoryDetail repository={selectedRepository} onBack={handleBackToList} />
      </>
    );
  }

  return (
    <>
      <Header onLogout={onLogout} />
      <div className="fruit-list-container">
        <div className="fruit-list-card">
          <div className="fruit-list-header">
            <h1>OliveYoung Global Organization Repositories</h1>
            <p>버튼을 눌러 리포지토리 목록을 불러오세요</p>
          </div>

        {repositories.length === 0 && !loading && (
          <button
            onClick={fetchRepositories}
            className="fetch-button"
          >
            리포지토리 가져오기
          </button>
        )}

        {loading && (
          <div className="loading-message">
            불러오는 중...
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {repositories.length > 0 && (
          <div className="fruit-list-content">
            <h2>총 {repositories.length}개의 리포지토리</h2>
            <ul>
              {repositories.map((repo) => (
                <li key={repo.id} onClick={() => handleRepositoryClick(repo)} className="clickable">
                  <strong>{repo.name}</strong>
                  <p style={{ margin: '4px 0', fontSize: '13px', color: '#6b7280' }}>
                    {repo.description}
                  </p>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                    {repo.language} • ⭐ {repo.stars}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        </div>
      </div>
    </>
  );
}

export default FruitList;
