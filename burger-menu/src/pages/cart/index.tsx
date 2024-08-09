import React from 'react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SectionShoppingCart } from '../../sections/SectionShoppingCart'

export default function Cart() {
  return (
    <div>
      <Header />
      <SectionShoppingCart />
      <Footer />
    </div>
  )
}