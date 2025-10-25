export const config = {
  apiUrl: 'http://localhost:3001/api',
  uploadPath: 'http://localhost:3001/uploads',
};

export const messages = {
  errors: {
    login: 'Error al iniciar sesión. Por favor, verifica tus credenciales.',
    register: 'Error al registrar. Por favor, intenta nuevamente.',
    passwordMismatch: 'Las contraseñas no coinciden.',
    loadNotes: 'Error al cargar las notas.',
    network: 'Error de conexión. Por favor, verifica tu conexión a internet.',
    server: 'Error en el servidor. Por favor, intenta más tarde.',
  },
  success: {
    register: 'Registro exitoso. Por favor, inicia sesión.',
    login: 'Inicio de sesión exitoso.',
    noteCreated: 'Nota creada exitosamente.',
    noteUpdated: 'Nota actualizada exitosamente.',
  },
};