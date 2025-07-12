"use client";
import { getToken } from '@/api/config';
import { Loading } from '@/components/Loading';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        setIsLoading(false);
        if (token) {
            redirect('/home');
        } 
    }, []);

    // Mostrar un estado de carga mientras se determina la redirección
    if (isLoading) {
        return <Loading message='Cargando...' />;
    }

    return <div className='h-[100vh] w-[100vw]'>{children}</div>;
}
