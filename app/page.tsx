'use client'

import Protect from '@/components/layout/Protect'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/drinks')
  }, [])

  router.push('/drinks')

  return (
    <Protect>
      <div></div>
    </Protect>
  );
}
