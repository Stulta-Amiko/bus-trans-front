import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootStrapClient from '../components/BootstrapClient'
import SearchCard from '../components/SearchCard'
import type { Metadata } from 'next'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'Next.js',
  icons: {
    icon: '/busicon.png',
  },
}

export default function Page() {
  return (
    <main>
      <Head>
        <title>시간표기반 버스환승정보 플랫폼</title>
        <link rel='icon' href='/busicon.png'></link>
      </Head>
      <BootStrapClient />
      <SearchCard />
    </main>
  )
}
