import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage/HomePage'
import { CharactersPage } from './pages/CharactersPage/CharactersPage'
import { CharacterDetailPage } from './pages/CharacterDetailPage/CharacterDetailPage'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
