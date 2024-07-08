import React from 'react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { LoginForm } from '@/components/LoginForm'

export default function Signin() {
  return (
    <div>
      <Header activePage="Entrar" />
      <LoginForm />
      <Footer />
    </div>
  )
}