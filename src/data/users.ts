// src/data/fakeUsers.ts
export interface User {
id: number
name: string
email: string
password: string
avatar: string
}

// Usuarios predefinidos
export const fakeUsers: User[] = [
{
    id: 1,
    name: 'Juan Pérez',
    email: 'juanperez@email.com',
    password: '123456',
    avatar: '/avatar',
},
{
    id: 2,
    name: 'Ana López',
    email: 'analopez@email.com',
    password: 'abcdef',
    avatar: '/avatar',
},
{
    id: 3,
    name: 'Carlos Ruiz',
    email: 'carlosruiz@email.com',
    password: 'password123',
    avatar: '/avatar',
},
]
