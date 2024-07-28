import React, { useEffect, useState } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import { ManageContent } from '../../sections/ManageContent'
import { getMenu } from '../../services/menu'

export default function Edition() {
  const [response, setResponse] = useState()

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
		<React.Fragment>
			<Header />
      <ManageContent data={response} categories={[]}/>
      <Footer />
		</React.Fragment>
	)
}
