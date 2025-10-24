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

interface Comment {
  id: number
  author: string
  date: string
  text: string
}

const notes: Note[] = [
  { id: 1, title: 'Apuntes de Algoritmos', author: 'Carlos Ruiz', rating: 5, downloads: 120, preview: 'Introducción a estructuras de control y funciones...' },
  { id: 2, title: 'Ejercicios básicos', author: 'Ana López', rating: 4, downloads: 85, preview: 'Listas, bucles y diagramas de flujo...' },
  { id: 3, title: 'Apuntes de SQL', author: 'Pedro Torres', rating: 5, downloads: 200, preview: 'Normalización, consultas básicas y avanzadas...' },
  { id: 4, title: 'Diseño de BD', author: 'María González', rating: 4, downloads: 150, preview: 'Modelado relacional y ER diagrams...' }
]

const comments: Record<number, Comment[]> = {
  1: [
    { id: 1, author: 'Lucía Pérez', date: '2024-10-10', text: 'Muy buenos apuntes, me sirvieron mucho!' },
    { id: 2, author: 'David Rojas', date: '2024-10-12', text: 'Podrías agregar ejemplos de recursividad?' }
  ],
  2: [
    { id: 3, author: 'Laura Torres', date: '2024-10-15', text: 'Excelente guía para estudiar antes del parcial!' }
  ],
  3: [
    { id: 4, author: 'Juan Gómez', date: '2024-10-17', text: 'El apartado de consultas JOIN está muy claro 👏' }
  ],
  4: []
}

function NoteDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [note, setNote] = useState<Note | null>(null)
  const [commentsList, setCommentsList] = useState<Comment[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setTimeout(() => {
      const noteId = parseInt(id)
      const foundNote = notes.find((n) => n.id === noteId) || null
      const noteComments = comments[noteId] || []
      setNote(foundNote)
      setCommentsList(noteComments)
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) return <div className="loading">Cargando...</div>

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
    <h1 className="text-xl font-bold text-gray-800">Detalles del Apunte</h1>
    <div></div>
  </header>

  {/* Contenido */}
  {note ? (
    <main className="px-8 py-10 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-soft">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{note.title}</h2>
        <p className="text-gray-600 mb-3">Por: {note.author}</p>
        <div className="flex items-center mb-3">
          {Array.from({ length: note.rating }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">★</span>
          ))}
        </div>
        <p className="text-gray-500 mb-3">{note.downloads} descargas</p>
        <p className="text-gray-700 mb-4">{note.preview}</p>

        <div className="flex gap-4 mb-6">
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
            Descargar
          </button>
          <button className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/10 transition">
            Comentar
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Comentarios</h3>
          {commentsList.length > 0 ? (
            <div className="space-y-4">
              {commentsList.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded-md shadow-inner">
                  <div className="flex justify-between text-gray-600 text-sm mb-1">
                    <span>{comment.author}</span>
                    <span>{comment.date}</span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay comentarios aún.</p>
          )}
        </div>
      </div>
    </main>
  ) : (
    <div className="text-center text-gray-500 mt-10">No se encontró la nota seleccionada.</div>
  )}
</div>

  )
}

export default NoteDetail
