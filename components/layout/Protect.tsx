'use client'

import { getSettings } from '@/redux/slices/settings.slice'
import { checkUserSession, getCurrentUser, useCurrentUser } from '@/redux/slices/user.slice'
import { AppDispatch } from '@/redux/store'
import { auth } from '@/utils/firebase'
import { Spin } from 'antd'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

interface ProtectProps {
    children: any
}

export default function Protect({ children }: ProtectProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, verified, loading } = useCurrentUser();

    useEffect(() => {
        let unsubscribe: any;
        let settingsInterval: NodeJS.Timeout | null = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            await dispatch(checkUserSession(user));
        });

        dispatch(getSettings());

        // Set up interval to fetch settings every 5 seconds when page is visible
        const startInterval = () => {
            if (!settingsInterval) {
                settingsInterval = setInterval(() => {
                    dispatch(getSettings());
                    dispatch(getCurrentUser());
                }, 5000);
            }
        };

        const stopInterval = () => {
            if (settingsInterval) {
                clearInterval(settingsInterval);
                settingsInterval = null;
            }
        };

        // Handle visibility change
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopInterval();
            } else {
                startInterval();
            }
        };

        // Start interval if page is visible
        if (!document.hidden) {
            startInterval();
        }

        // Listen for visibility changes
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (unsubscribeAuth) unsubscribeAuth();
            if (unsubscribe) unsubscribe();
            stopInterval();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
    }, [])

    if (!isAuthenticated && loading) return (
        <div className='flex h-[90vh] justify-center items-center'>
            <Spin />
        </div>
    )

    if (isAuthenticated && !verified) return (
        <div className='flex h-[80vh] flex-col justify-center items-center gap-5'>
            <p className='text-neutral-50'>Thanks for joining!</p>
            <p className='text-neutral-50'>A host will see you in a moment.</p>
        </div>
    )

    return (
        <div>
            { verified && children}
        </div>
    )
}