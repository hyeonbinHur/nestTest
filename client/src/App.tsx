import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RepositoriesPage from './pages/RepositoriesPage';
import RepositoryDetailPage from './pages/RepositoryDetailPage';
import RepositoryEditPage from './pages/RepositoryEditPage';
import './styles/App.scss';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 - / */}
        <Route path="/" element={<LoginPage />} />

        {/* 리포지토리 목록 페이지 - /repositories */}
        <Route
          path="/repositories"
          element={
            <ProtectedRoute>
              <RepositoriesPage />
            </ProtectedRoute>
          }
        />

        {/* 리포지토리 상세 페이지 - /repository/:id */}
        <Route
          path="/repository/:id"
          element={
            <ProtectedRoute>
              <RepositoryDetailPage />
            </ProtectedRoute>
          }
        />

        {/* 리포지토리 수정 페이지 - /repository/edit/:id */}
        <Route
          path="/repository/edit/:id"
          element={
            <ProtectedRoute>
              <RepositoryEditPage />
            </ProtectedRoute>
          }
        />

        {/* 404 - 기본 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
