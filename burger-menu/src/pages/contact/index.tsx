import React from 'react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactList } from '@/components/ContactList'
import { SocialMedia } from '@/components/SocialMedia'
import { Loading } from '@/components/Loading'

export default function Contact() {
  return (
    <div>
      <Header activePage="Contato" />
      <ContactList />
      <SocialMedia />
      <Loading />
      <h1>Loading</h1>
      <Footer />
    </div>
  )
}