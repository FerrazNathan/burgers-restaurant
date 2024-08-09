import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { HeaderData } from './HeaderData'
import { HeaderProps } from './Header.types'

import ImageHeader from '../../public/header.png'
import { GiShoppingCart } from "react-icons/gi";

import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';

import * as S from './styles'

function Header({ activePage }: HeaderProps ) {
  const router = useRouter();
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  
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


      {totalQuantity > 0 && (
        <S.ContainerCart>
          <span>{totalQuantity}</span>
          <GiShoppingCart 
            color='#FFF' 
            size={24}
            onClick={() => router.push('/cart')}
          />
        </S.ContainerCart>
      )} 
      
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