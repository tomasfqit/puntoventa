"use client";

interface LoadingProps {
    message?: string;
}

export const Loading = ({ message }: LoadingProps) => {
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
            <div className='animate-spin'>
                <svg 
                    height="80px" 
                    width="80px" 
                    version="1.1" 
                    id="Layer_1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlnsXlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 496 496" 
                    xmlSpace="preserve"
                >
                    <circle style={{fill:"#383A39"}} cx="248" cy="24" r="24"/>
                    <circle style={{fill:"#ECEEEE"}} cx="248" cy="472" r="24"/>
                    <circle style={{fill:"#77807F"}} cx="136" cy="53.6" r="24"/>
                    <path style={{fill:"#F2F4F4"}} d="M380.8,430.4c6.4,11.2,2.4,25.6-8.8,32.8c-11.2,6.4-25.6,2.4-32.8-8.8c-6.4-11.2-2.4-25.6,8.8-32.8 C359.2,415.2,374.4,419.2,380.8,430.4z"/>
                    <path style={{fill:"#9FAAA9"}} d="M65.6,115.2c11.2,6.4,15.2,20.8,8.8,32.8c-6.4,11.2-20.8,15.2-32.8,8.8c-11.2-6.4-15.2-20.8-8.8-32.8 S54.4,108.8,65.6,115.2z"/>
                    <path style={{fill:"#F2F7F7"}} d="M454.4,339.2c11.2,6.4,15.2,20.8,8.8,32.8c-6.4,11.2-20.8,15.2-32.8,8.8 c-11.2-6.4-15.2-20.8-8.8-32.8C428,336.8,442.4,332.8,454.4,339.2z"/>
                    <circle style={{fill:"#B2BBBA"}} cx="24" cy="248" r="24"/>
                    <circle style={{fill:"#FFFFFF"}} cx="472" cy="248" r="24"/>
                    <path style={{fill:"#C5CCCB"}} d="M41.6,339.2c11.2-6.4,25.6-2.4,32.8,8.8c6.4,11.2,2.4,25.6-8.8,32.8c-11.2,6.4-25.6,2.4-32.8-8.8 S30.4,346.4,41.6,339.2z"/>
                    <path d="M430.4,115.2c11.2-6.4,25.6-2.4,32.8,8.8c6.4,11.2,2.4,25.6-8.8,32.8c-11.2,6.4-25.6,2.4-32.8-8.8 C415.2,136.8,419.2,121.6,430.4,115.2z"/>
                    <path style={{fill:"#D9DDDD"}} d="M115.2,430.4c6.4-11.2,20.8-15.2,32.8-8.8c11.2,6.4,15.2,20.8,8.8,32.8c-6.4,11.2-20.8,15.2-32.8,8.8 C112.8,456,108.8,441.6,115.2,430.4z"/>
                    <path style={{fill:"#111111"}} d="M339.2,41.6c6.4-11.2,20.8-15.2,32.8-8.8c11.2,6.4,15.2,20.8,8.8,32.8c-6.4,11.2-20.8,15.2-32.8,8.8 C336.8,68,332.8,53.6,339.2,41.6z"/>
                </svg>
            </div>
            {message && <p className='text-gray-900 mt-4 text-lg'>{message}</p>}
        </div>
    )
}