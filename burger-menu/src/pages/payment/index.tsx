import React from 'react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PaymentForm } from '@/components/PaymentForm'

export default function Payment() {
  return (
    <div>
      <Header />
      <PaymentForm />
      <Footer />
    </div>
  )
}