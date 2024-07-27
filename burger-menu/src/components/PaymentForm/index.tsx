import React, { useState } from 'react';
import { useRouter } from 'next/router';
import InputMask from 'react-input-mask';
import { Loading } from '../Loading';

import * as S from './styles';

const PaymentForm: React.FC = () => {
  const router = useRouter();
  const [verifyPayment, setVerifyPayment] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVerifyPayment(true);
    setTimeout(() => {
      router.push('/');
    }, 4000);
  };

  return (
    <S.PaymentFormContainer>
      {verifyPayment && (
        <S.ContainerMessageLoading>
          <S.PaymentSuccess>Transação em Andamento. Você receberá uma atualização do seu banco com o status da sua transação.</S.PaymentSuccess>
          <Loading description='Carregando ...' />
        </S.ContainerMessageLoading>
      )}
      {!verifyPayment && (
        <S.FormContainer>
          <S.PaymentSuccess>Formulário de Pagamento</S.PaymentSuccess>
          <form onSubmit={handleSubmit}>
            <S.FormField>
              <S.Label>Número do Cartão</S.Label>
              <InputMask
                mask="9999 9999 9999 9999"
                maskChar=" "
                value={formData.cardNumber}
                onChange={handleChange}
                name="cardNumber"
                placeholder="1234 5678 9101 1121"
                className='input-mask'
              />
            </S.FormField>
            <S.FormField>
              <S.Label>Nome do Titular do Cartão</S.Label>
              <S.Input
                required
                type="text"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleChange}
                placeholder="Nome Completo"
              />
            </S.FormField>
            <S.FormField>
              <S.Label>Data de Validade</S.Label>
              <InputMask
                mask="99/99"
                value={formData.expiryDate}
                onChange={handleChange}
                name="expiryDate"
                placeholder="MM/AA"
                className='input-mask'
              />
            </S.FormField>
            <S.FormField>
              <S.Label>CVV</S.Label>
              <InputMask
                mask="999"
                value={formData.cvv}
                onChange={handleChange}
                name="cvv"
                placeholder="123"
                className='input-mask'
              />
            </S.FormField>
            <S.Button type="submit">Pagar</S.Button>
          </form>
        </S.FormContainer>
      )}
    </S.PaymentFormContainer>
  );
};

export { PaymentForm };
