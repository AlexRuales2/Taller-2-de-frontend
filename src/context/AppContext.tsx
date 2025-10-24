import { createContext, useContext, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { fakeUsers } from '../data/users' // tus usuarios predefinidos

// Tipos
export interface User {
name: string
email: string
password: string
avatar?: string
}

interface AppContextType {
user: User | null
users: User[]
login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>
logout: () => void
isLoggedIn: boolean
}

// Creamos el contexto
const AppContext = createContext<AppContextType | undefined>(undefined)

// Proveedor global
export function AppProvider({ children }: { children: ReactNode }) {
const navigate = useNavigate()

const [user, setUser] = useState<User | null>(null)

// Inicializamos con los usuarios predefinidos
const [users, setUsers] = useState<User[]>([...fakeUsers])

const isLoggedIn = !!user

// Simulación de login
const login = async (email: string, password: string) => {
    const foundUser = users.find((u) => u.email === email && u.password === password)
    if (!foundUser) {
    return { success: false, message: 'Correo o contraseña incorrectos' }
    }

    setUser(foundUser)
    navigate('/dashboard')
    return { success: true }
}

// Simulación de registro
const register = async (name: string, email: string, password: string) => {
    const existing = users.find((u) => u.email === email)
    if (existing) {
    return { success: false, message: 'El correo ya está registrado' }
    }

    const newUser: User = { name, email, password }
    setUsers([...users, newUser])
    alert('Registro exitoso. Ahora puedes iniciar sesión.')
    navigate('/')
    return { success: true }
}

// Cerrar sesión
const logout = () => {
    setUser(null)
    navigate('/')
}

return (
    <AppContext.Provider
    value={{ user, users, login, register, logout, isLoggedIn }}
    >
    {children}
    </AppContext.Provider>
)
}

// Hook personalizado
export function useAppContext() {
const context = useContext(AppContext)
if (!context) {
    throw new Error('useAppContext debe usarse dentro de un AppProvider')
}
return context
}
