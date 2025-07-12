'use client'

import { Usuario } from '@/interfaces/tables'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function UsuariosPage() {
    const [users, setUsers] = useState<Usuario[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const { data: usersResponse, error } = await supabase
                .from('usuario')
                .select('*')

            console.log('data =>', usersResponse);
            if (error) {
                console.error('Error al traer usuarios:', error)
            } else {
                setUsers(usersResponse || [])
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">Usuarios</h1>
            <ul className="space-y-1">
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} - {user.password}
                    </li>
                ))}
            </ul>
        </div>
    )
}
