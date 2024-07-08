import React from 'react'

import * as S from './styles'

function Footer() {
  return (
    <S.ContainerFooter data-testid='footerContainer'>
      <S.CopyrightText data-testid='copyrightText'>
        &copy; Nathan Ferraz - 2024 - Todos os direitos reservados
      </S.CopyrightText>
    </S.ContainerFooter>
  )
}

export { Footer } 