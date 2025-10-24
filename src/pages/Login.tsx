import { useState, FormEvent, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { login } = useAppContext()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (!email || !password) {
      alert('Por favor llena todos los campos')
      return
    }

    try {
      const result = await login(email, password)
      if (!result.success) {
        alert(result.message || 'Correo o contraseña incorrectos')
      }
      // si es exitoso, el contexto ya navega a /dashboard
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Error al iniciar sesión')
      }
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
    {/* Logo */}
    <div className="flex flex-col items-center mb-6">
      <img src="/book-icon.svg" alt="Share Notes Logo" className="w-16 h-16 mb-2" />
      <h1 className="text-2xl font-bold text-primary">SHARE NOTES</h1>
    </div>

    <h2 className="text-xl font-semibold text-gray-800 mb-1">Inicio de Sesión</h2>
    <p className="text-gray-500 mb-6 text-center">Tu ayuda a organizar tus apuntes</p>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700">Correo</label>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={handleEmailChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700">Contraseña</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={handlePasswordChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition"
      >
        Iniciar sesión
      </button>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
      >
        <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
        Sign in with Google
      </button>
    </form>

    <div className="flex justify-between mt-6 text-sm text-gray-500">
      <Link to="/forgot-password" className="hover:underline">¿Olvidaste tu contraseña?</Link>
      <Link to="/register" className="hover:underline">Registrarse</Link>
    </div>
  </div>
</div>

  )
}

export default Login
