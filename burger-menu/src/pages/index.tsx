import { useEffect, useState } from 'react'
import type { NextPage } from 'next'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SectionMenu } from '../sections/SectionMenu'

import { getMenu } from '../services/menu'

const Home: NextPage = () => {

  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMenu();
        setResponse(response);
      } catch (error) {
        console.error('Error fetching menu:');
      }
    };
    fetchData();
  }, [])

  return (
    <> 
      <Header activePage="Menu" />  
        <SectionMenu itemsMenu={response} categories={[]} />
      <Footer />
    </>
  )
}

export default Home
