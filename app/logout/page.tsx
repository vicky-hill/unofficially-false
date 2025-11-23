 'use client'

import { signOut } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Logout() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await signOut(auth);
            localStorage.removeItem('token');
            router.push('/login');
        } catch (err) {
            console.error('Error logging out:', err);
            setIsLoading(false);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-[90vh]'>
            <h1 className='mb-10 text-neutral-50 text-3xl font-bold'>Logout</h1>
            <p className='text-neutral-400 text-center mb-8 max-w-md'>
                Are you sure you want to log out?
            </p>
            <Button 
                onClick={handleLogout}
                loading={isLoading}
                className='w-[300px] bg-[#363642]! text-neutral-50! hover:bg-[#42424e]! border-[#42424e]!'
            >
                Logout
            </Button>
        </div>
    )
}