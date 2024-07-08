function formatPrice(value: number, locale: string = 'pt-BR', currency: string = 'BRL'): string {
  const formattedValue = value.toString() + ',00';

  const numberValue = parseFloat(formattedValue.replace(',', '.'));

  return numberValue.toLocaleString(locale, {
    style: 'currency',
    currency: currency
  });
}

export { formatPrice }