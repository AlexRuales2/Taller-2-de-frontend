import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotesView from './pages/NotesView'
import NoteDetail from './pages/NoteDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notes/:category" element={<NotesView />} />
      <Route path="/note/:id" element={<NoteDetail />} />
    </Routes>
  )
}

export default App