import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">
          올리브영 스타일 앱
        </h1>
        <p className="text-xl text-primary font-semibold mb-4">
          Olive Young Theme
        </p>
        <p className="text-lg text-gray-600 mb-8">
          React + Vite + TypeScript + Tailwind CSS + shadcn/ui
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/about"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg font-medium"
          >
            About 페이지로 이동
          </Link>
        </div>
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          About 페이지
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          올리브영 브랜드 컬러를 적용한 데모 페이지입니다
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg font-medium"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  )
}

export default App
