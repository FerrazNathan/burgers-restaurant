import React, { useEffect, useState } from 'react'
import { ManageCategories } from '@/components/ManageCategories'
import { ManageProducts } from '@/components/ManageProducts'

import * as S from './styles'

function ManageContent() {
  const [updatePage, setUpdatePage] = useState(false);
  const isAdmin = sessionStorage.getItem('isAdmin');

  useEffect(() => {
    if(updatePage){
      window.location.reload()
    }
  }, [updatePage])
  
  return (
    <React.Fragment>
      {isAdmin && (
        <React.Fragment>
          <S.ContainerComponent data-testid='ContainerComponent'>
            <ManageCategories setUpdatePage={setUpdatePage} />
            <ManageProducts setUpdatePage={setUpdatePage} />
          </S.ContainerComponent>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export { ManageContent } 