import { formatPrice } from '../formatPrice';

describe('formatPrice', () => {
  test('Deve formatar um valor como uma moeda', () => {
    const value = 33;
    const formattedValue = formatPrice(value);
    expect(formattedValue).toBe('R$ 33,00');
  });

  test('Deve formatar um valor diferente como moeda', () => {
    const value = 18;
    const formattedValue = formatPrice(value);
    expect(formattedValue).toBe('R$ 18,00');
  });

  test('Deve formatar um valor como uma moeda com localidade e moeda diferentes', () => {
    const value = 50;
    const formattedValue = formatPrice(value, 'en-US', 'USD');
    expect(formattedValue).toBe('$50.00');
  });

  test('Deve lidar com o valor zero corretamente', () => {
    const value = 0;
    const formattedValue = formatPrice(value);
    expect(formattedValue).toBe('R$ 0,00');
  });

  test('Deve lidar com valores grandes corretamente', () => {
    const value = 1000000;
    const formattedValue = formatPrice(value);
    expect(formattedValue).toBe('R$ 1.000.000,00');
  });
});
