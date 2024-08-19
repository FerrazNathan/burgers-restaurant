import React, { useState } from 'react';
import { useRouter } from 'next/router';
import InputMask from 'react-input-mask';
import { Loading } from '../Loading';
import * as yup from 'yup';
import * as S from './styles';

const PaymentForm: React.FC = () => {
  const router = useRouter();
  const [verifyPayment, setVerifyPayment] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
  });

  const validationSchema = yup.object().shape({
    cardNumber: yup.string()
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "O número do cartão deve ter 16 dígitos")
      .required("O número do cartão é obrigatório"),
    cardHolderName: yup.string().required("O nome do titular do cartão é obrigatório"),
    expiryDate: yup.string()
      .matches(/^\d{2}\/\d{2}$/, "A data de validade deve estar no formato 'MM/AA'")
      .required("A data de validade é obrigatória"),
    cvv: yup.string()
      .matches(/^\d{3}$/, "O CVV deve ter 3 dígitos")
      .required("O CVV é obrigatório"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      setErrors({});
      await validationSchema.validate(formData, { abortEarly: false });
  
      setVerifyPayment(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      const validationErrors: Record<string, string> = {};
  
      (err as any).inner.forEach((error: yup.ValidationError) => {
        validationErrors[error.path as string] = error.message;
      });
  
      setErrors(validationErrors);
    }
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
              {errors.cardNumber && <S.ErrorMessage>{errors.cardNumber}</S.ErrorMessage>}
            </S.FormField>
            <S.FormField>
              <S.Label>Nome do Titular do Cartão</S.Label>
              <S.Input
                type="text"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleChange}
                placeholder="Nome Completo"
              />
              {errors.cardHolderName && <S.ErrorMessage>{errors.cardHolderName}</S.ErrorMessage>}
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
              {errors.expiryDate && <S.ErrorMessage>{errors.expiryDate}</S.ErrorMessage>}
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
              {errors.cvv && <S.ErrorMessage>{errors.cvv}</S.ErrorMessage>}
            </S.FormField>
            <S.Button type="submit">Pagar</S.Button>
          </form>
        </S.FormContainer>
      )}
    </S.PaymentFormContainer>
  );
};

export { PaymentForm };
