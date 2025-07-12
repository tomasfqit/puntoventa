"use client";
import { Loading } from '@/components/Loading';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/home');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <Loading message='Cargando...' />;
    }

    if (isAuthenticated) {
        return <Loading message='Redirigiendo...' />;
    }

    return <div className='h-[100vh] w-[100vw]'>{children}</div>;
}
