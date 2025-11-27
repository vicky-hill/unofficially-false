'use client'

import { User } from '@/types/user.types'
import api from '@/utils/api'
import { useEffect, useState } from 'react'
import { Switch } from 'antd'
import { IoMdSettings } from 'react-icons/io'
import Link from 'next/link'

export default function page() {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getCurrentUser();
    }, [])

    useEffect(() => {
        currentUser?.isAdmin && getAllUsers();
    }, [currentUser])

    const getCurrentUser = async () => {
        const user = await api.get('/users/current');
        setCurrentUser(user);
    }

    const getAllUsers = async () => {
        const users: User[] = await api.get('/users');
        setUsers(users);
    }

    const onChange = async (userId: string, verified: boolean) => {
        try {
            const updatedUser: User = await api.put(`/users/${userId}`, { verified });
            setUsers(users => users.map(user => user.userId === userId ? updatedUser : user));
        } catch (err) {
            console.log(err);
        }
    }

    if (!currentUser?.isAdmin) return null;

    return (
        <div className='flex h-[80vh] flex-col justify-center items-center gap-5 relative'>
            <Link href='/settings'>
                <IoMdSettings size={20} color="white" className='absolute top-7 right-9' />
            </Link>


            <p className='text-neutral-50 text-2xl font-bold mb-5'>Users</p>
            <div className='w-full px-12 space-y-4'>
                {
                    users.map(user => (
                        <div key={user.userId} className='text-white flex gap-3'>
                            <Switch value={user.verified} className='w-3' defaultChecked onChange={(e) => onChange(user.userId, e)} />
                            <p>{user.email}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}