import React from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default layout
