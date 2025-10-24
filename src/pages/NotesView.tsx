import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface Note {
  id: number
  title: string
  author: string
  rating: number
  downloads: number
  preview: string
}

const fakeNotesDB: Record<string, Note[]> = {
  Algoritmos: [
    { id: 1, title: 'Apuntes de Algoritmos', author: 'Carlos Ruiz', rating: 5, downloads: 120, preview: 'Introducción a estructuras de control y funciones...' },
    { id: 2, title: 'Ejercicios básicos', author: 'Ana López', rating: 4, downloads: 85, preview: 'Listas, bucles y diagramas de flujo...' }
  ],
  'Bases de datos': [
    { id: 3, title: 'Apuntes de SQL', author: 'Pedro Torres', rating: 5, downloads: 200, preview: 'Normalización, consultas básicas y avanzadas...' },
    { id: 4, title: 'Diseño de BD', author: 'María González', rating: 4, downloads: 150, preview: 'Modelado relacional y ER diagrams...' }
  ],
  Redes: [
    { id: 5, title: 'Fundamentos de redes', author: 'Luis Gómez', rating: 5, downloads: 90, preview: 'Topologías, protocolos y direccionamiento IP...' },
    { id: 6, title: 'Configuraciones Cisco', author: 'Laura Pérez', rating: 4, downloads: 60, preview: 'Configuración básica de routers y switches...' },
    { id: 7, title: 'Configuraciones GNS3', author: 'Laura Pérez', rating: 3, downloads: 30, preview: 'Configuración básica de gns3 y...' }
  ]
}

function NotesView() {
  const { category } = useParams<{ category: string }>()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      if (category && fakeNotesDB[category]) {
        setNotes(fakeNotesDB[category])
      } else {
        setNotes([])
      }
      setLoading(false)
    }, 500)
  }, [category])

  if (loading) return <p className="loading-text">Cargando notas...</p>

  return (
    <div className="min-h-screen bg-gray-light">
  {/* Header */}
  <header className="flex items-center justify-between px-8 py-4 bg-white shadow-soft">
    <button
      onClick={() => navigate(-1)}
      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition"
    >
      ←
    </button>
    <h1 className="text-xl font-bold text-gray-800">Apuntes</h1>
    <div></div>
  </header>

  {/* Contenido */}
  <main className="px-8 py-10 max-w-5xl mx-auto">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">{category}</h2>

    {notes.length === 0 ? (
      <p className="text-gray-500 text-center">No hay apuntes disponibles para esta categoría.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-5 rounded-lg shadow-soft cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/note/${note.id}`)}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{note.title}</h3>
              <p className="text-gray-600 mb-2">Por: {note.author}</p>
              <div className="flex items-center mb-2">
                {Array.from({ length: note.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-500 mb-2">{note.downloads} descargas</p>
              <p className="text-gray-700">{note.preview}</p>
            </div>

            <div className="flex gap-3">
              <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
                Descargar
              </button>
              <button className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/10 transition">
                Comentar
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </main>
</div>

  )
}

export default NotesView
