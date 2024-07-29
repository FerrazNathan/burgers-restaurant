import React from 'react'
import { ManageCategories } from '@/components/ManageCategories'
import { ManageProducts } from '@/components/ManageProducts'

import * as S from './styles'

function ManageContent() {

  const isAdmin = sessionStorage.getItem('isAdmin');
  
  return (
    <React.Fragment>
      {isAdmin && (
        <React.Fragment>
          <S.ContainerComponent data-testid='ContainerComponent'>
            <ManageCategories />
            <ManageProducts />
          </S.ContainerComponent>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export { ManageContent } 