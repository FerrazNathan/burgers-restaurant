import React from 'react'
import Image from 'next/image'

import { HeaderData } from './HeaderData'
import { HeaderProps } from './Header.types'

import ImageHeader from '../../public/header.png'

import * as S from './styles'

function Header({ activePage }: HeaderProps ) {
  return (
    <S.ContainerHeader data-testid='HeaderContainer'>
      <S.ListMenuHeader>
        {HeaderData && HeaderData.map((item, index) => (
          <S.ItemMenuHeader key={index} data-testid='menu-item'>
            <S.LinkMenuHeader 
              href={item.url}
              isActive={activePage === item.page ? true : false}
            >
              {item.page}
            </S.LinkMenuHeader>
          </S.ItemMenuHeader>
        ))}
      </S.ListMenuHeader>
        <Image 
          src={ImageHeader} 
          alt="Imagem do logotipo do restaurante" 
          objectFit='cover'
          objectPosition='center'
        />
    </S.ContainerHeader>
  )
}

export { Header } 