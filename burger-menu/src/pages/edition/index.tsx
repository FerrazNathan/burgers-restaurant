import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ManageContent } from '../../sections/ManageContent'

export default function Edition() {

	return (
		<React.Fragment>
			<Header />
      <ManageContent />
      <Footer />
		</React.Fragment>
	)
}
