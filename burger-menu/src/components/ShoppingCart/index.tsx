import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { increaseItemQuantity, decreaseItemQuantity, clearCart } from '../../store/cartSlice';
import { formatPrice } from '../../utils/FormatPrice/formatPrice';
import { MdAddCircleOutline } from "react-icons/md";
import { GrSubtractCircle } from "react-icons/gr";

import * as S from './styles';

const ShoppingCart: React.FC = () => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCheckout = () => {
    setCheckoutSuccess(true);

    setTimeout(() => {
      dispatch(clearCart());
      setCheckoutSuccess(false);
      router.push('/payment');
    }, 4000);
  };

  const sizeIcon = 20;
  
  return (
    <S.ContainerCart>
      <h2>Carrinho</h2>
      {checkoutSuccess && <h2>Você será redirecionado para a página de pagamentos!</h2>}
      {!checkoutSuccess && (
        <S.ProductsList>
          {items.map(item => (
            <S.ProductsListItem key={item.id}>
              <span>{item.name}</span>
              <S.ContainerButtons>
                <S.ButtonRemove 
                  onClick={() => dispatch(decreaseItemQuantity(item.id))}
                >
                  <GrSubtractCircle size={sizeIcon} color='red' />
                </S.ButtonRemove>
                <span>{item.quantity}</span>
                <S.ButtonRemove 
                  onClick={() => dispatch(increaseItemQuantity(item.id))}
                >
                  <MdAddCircleOutline size={sizeIcon} color='green' />
                </S.ButtonRemove>
              </S.ContainerButtons>
              <span>{formatPrice(item.price)}</span>
            </S.ProductsListItem>
          ))}
        </S.ProductsList>
      )}

      {!checkoutSuccess && (
        <S.ContainerFinally>
          <span>Total: {formatPrice(totalPrice)}</span>
          <button disabled={totalQuantity < 1} onClick={handleCheckout}>
            Finalizar compra
          </button>
        </S.ContainerFinally>
      )}
    </S.ContainerCart>
  );
};

export { ShoppingCart };

