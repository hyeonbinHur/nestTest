import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { API_URL } from '../config/api';
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

function RepositoriesPage() {
  const navigate = useNavigate();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/repositories`);

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

  const handleRepositoryClick = (id: number) => {
    navigate(`/repository/${id}`);
  };

  // 페이지 로드시 자동으로 리포지토리 가져오기
  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <>
      <Header onLogout={handleLogout} />
      <div className="fruit-list-container">
        <div className="fruit-list-card">
          <div className="fruit-list-header">
            <h1>OliveYoung Global Organization Repositories</h1>
            <p>리포지토리 목록</p>
          </div>

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
                  <li key={repo.id} onClick={() => handleRepositoryClick(repo.id)} className="clickable">
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

export default RepositoriesPage;
