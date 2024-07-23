import { useEffect, useState } from 'react'
import type { NextPage } from 'next'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Menu } from '@/components/Menu'

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
      <Menu itemsMenu={response} />
      <Footer />
    </>
  )
}

export default Home
