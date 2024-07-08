import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
      {verifyPayment && <S.PaymentSuccess>Pagamento efetuado com sucesso!</S.PaymentSuccess>}
      {!verifyPayment && (
        <S.FormContainer>
          <h2>Formulário de Pagamento</h2>
          <form onSubmit={handleSubmit}>
            <S.FormField>
              <S.Label>Número do Cartão</S.Label>
              <S.Input
                required
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9101 1121"
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
              <S.Input
                required
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/AA"
              />
            </S.FormField>
            <S.FormField>
              <S.Label>CVV</S.Label>
              <S.Input
                required
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
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
