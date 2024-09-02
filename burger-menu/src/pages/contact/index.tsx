import React from 'react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactList } from '@/components/ContactList'
import { SocialMedia } from '@/components/SocialMedia'

import {ThemeSwitcher} from '@/components/SwitchTheme'

export default function Contact() {
  return (
    <div>
      <Header activePage="Contato" />
      <ThemeSwitcher />
      <ContactList />
      <SocialMedia />
      <Footer />
    </div>
  )
}