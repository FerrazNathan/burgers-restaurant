import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { HeaderData } from './HeaderData'
import { HeaderProps } from './Header.types'

import ImageHeader from '../../public/header.png'
import { GiShoppingCart } from "react-icons/gi";
import { Loading } from '../Loading'

import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';

import * as S from './styles'

function Header({ activePage }: HeaderProps ) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const pageCart = router.pathname === '/cart';
  const showIconCart = totalQuantity > 0;

  return (
    <S.ContainerHeader data-testid='HeaderContainer'>
      <S.ListMenuHeader showIconCart={showIconCart}>
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

      {showIconCart && (
        <S.ContainerCart isLoading={loading} pageCart={pageCart}>
          {!loading && (
            <React.Fragment>
              <span>{totalQuantity}</span>
              <GiShoppingCart 
                color='#FFF' 
                size={24}
                onClick={() => {
                  if(!pageCart) {
                    router.push('/cart')
                    setLoading(true)
                  }
                }}
              />
            </React.Fragment>
          )}

          {loading && <Loading />}
        </S.ContainerCart>
      )} 
      
      <Image 
        src={ImageHeader} 
        alt="Imagem do logotipo do restaurante" 
        objectFit='cover'
        objectPosition='center'
        loading="lazy"
      />

    </S.ContainerHeader>
  )
}

export { Header } 