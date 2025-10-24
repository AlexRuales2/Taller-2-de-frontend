import { useNavigate } from 'react-router-dom'

interface ProfileProps {
name: string
email: string
avatar: string
onClose: () => void
}

function Profile({ name, email, avatar, onClose }: ProfileProps) {
const navigate = useNavigate()

const handleLogout = () => {
    // Simulación del cierre de sesión
    localStorage.removeItem('user')
    alert('Has cerrado sesión correctamente.')
    navigate('/')
}

return (
    <div className="fixed top-0 right-0 mt-16 mr-4 w-72 bg-white rounded-xl shadow-lg p-4 z-50">
<div className="flex items-center space-x-4 mb-4">
    <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
    <div>
    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    <p className="text-sm text-gray-500">{email}</p>
    </div>
</div>

<div className="flex flex-col space-y-2">
    <button
    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
    onClick={handleLogout}
    >
    Cerrar sesión
    </button>
    <button
    className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
    onClick={onClose}
    >
    Cerrar
    </button>
</div>
</div>

)
}

export default Profile
