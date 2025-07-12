"use client";

interface LoadingProps {
    message?: string;
}

export const Loading = ({ message }: LoadingProps) => {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-gray-100'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
            {message && <p className='text-gray-900'>{message}</p>}
        </div>
    )
}