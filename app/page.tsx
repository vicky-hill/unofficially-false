'use client'

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { useRouter } from 'next/navigation'
import { checkUserSession, useCurrentUser } from '@/redux/slices/user.slice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useCurrentUser();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      await dispatch(checkUserSession(user));
    });

    return unsubscribeAuth;
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/drinks')
    }
  }, [isAuthenticated])

  return (
    <div>
    </div>
  );
}
