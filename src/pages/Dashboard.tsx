import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'
import profilePhoto from '../assets/profile.png'
import { useAppContext } from '../context/AppContext'

const fakeNotesDB: Record<string, { id: number; title: string }[]> = {
  Algoritmos: [
    { id: 1, title: 'Apuntes de Algoritmos' },
    { id: 2, title: 'Ejercicios básicos' },
  ],
  'Bases de datos': [
    { id: 3, title: 'Apuntes de SQL' },
    { id: 4, title: 'Diseño de BD' },
  ],
  Redes: [
    { id: 5, title: 'Fundamentos de redes' },
    { id: 6, title: 'Configuraciones Cisco' },
  ],
}

interface Category {
  id: number
  name: string
  count: number
}

function Dashboard() {
  const { user } = useAppContext()
  const [categories, setCategories] = useState<Category[]>([])
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loadedCategories: Category[] = Object.keys(fakeNotesDB).map((name, index) => ({
      id: index + 1,
      name,
      count: fakeNotesDB[name].length,
    }))
    setCategories(loadedCategories)
  }, [])

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/notes/${categoryName}`)
  }

  return (
    <div className="min-h-screen bg-gray-light">
  {/* Header */}
  <header className="bg-white flex items-center justify-between px-8 py-4 shadow-soft">
    {/* Logo */}
    <div className="logo-section">
      <h1 className="text-primary text-xl font-bold">SHARE NOTES</h1>
    </div>

    {/* Navegación */}
    <nav className="flex gap-5">
      <button className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-dark hover:bg-gray-light transition text-base font-medium text-primary bg-primary/10">
        📝 Mis Apuntes
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-dark hover:bg-gray-light transition text-base font-medium">
        ⬆️ Subir Material
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-dark hover:bg-gray-light transition text-base font-medium">
        🔍 Buscar Apuntes
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-dark hover:bg-gray-light transition text-base font-medium">
        ⭐ Favoritos
      </button>
    </nav>

    {/* Usuario */}
    <div
      onClick={() => setShowProfile(!showProfile)}
      className="flex items-center gap-3 cursor-pointer"
    >
      <img
        src={user?.avatar || profilePhoto}
        alt={user?.name || 'Usuario'} 
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="font-medium text-gray-800">{user?.name || 'Usuario'}</span>
    </div>
  </header>

  {/* Contenido principal */}
  <main className="px-8 py-10 max-w-6xl mx-auto">
    <h2 className="text-2xl text-text-primary mb-6 font-semibold">Materias</h2>

    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.name)}
          className="bg-white p-6 rounded-lg shadow-soft text-center cursor-pointer hover:-translate-y-1 hover:shadow-softHover transition"
        >
          <span className="block text-4xl mb-3">📚</span>
          <h3 className="text-lg text-text-primary font-semibold mb-1">
            {category.name}
          </h3>
          <p className="text-text-secondary mb-4">
            {category.count} apuntes
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
            Ver apuntes
          </button>
        </div>
      ))}
    </div>
  </main>

  {/* Ventana flotante del perfil */}
  {showProfile && (
    <Profile
      name={user?.name || 'Usuario'}
      email={user?.email || 'no definido'}
      avatar={user?.avatar || profilePhoto}
      onClose={() => setShowProfile(false)}
    />
  )}
</div>

  )
}

export default Dashboard
