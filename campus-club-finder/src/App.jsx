import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ClubDetailPage from './pages/ClubDetailPage.jsx'
import ClubListPage from './pages/ClubListPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="clubs" element={<ClubListPage />} />
        <Route path="clubs/:clubId" element={<ClubDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
