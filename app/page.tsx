'use client'

import Protect from '@/components/layout/Protect'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter();

  router.push('/drinks')

  return (
    <Protect>
      <div></div>
    </Protect>
  );
}
