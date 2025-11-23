'use client'

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? router.push('/drinks') : router.push('/login');
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div>
    </div>
  );
}
