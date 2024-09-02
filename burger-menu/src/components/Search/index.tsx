import React, { useState, useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import { getMenu } from '../../services/menu';
import { FaSearch } from 'react-icons/fa';
import { SearchProps, OptionType, MenuItem } from './Search.types';

import * as S from './styles'

const Search: React.FC<SearchProps> = ({ optionsMessage = '', onItemSelect }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValue, setInputValue] = useState<string>('');

  const debounce = (fn: (...args: any[]) => void, delay = 250) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const loadOptions = useCallback(
    debounce(async (inputValue: string, callback: (options: any[]) => void) => {
      if (inputValue && inputValue.length > 3) {
        setLoading(true);
        try {
          const response = await getMenu();
          if (response) {
            const searchResults: MenuItem[] = response.categories.flatMap((section: any) => section.products.flatMap((product: any) => product));
            const filteredResults = searchResults.filter(item =>
              item.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            const options = filteredResults.map(result => ({
              label: result.name,
              value: result.id,
              item: result
            }));
            callback(options);
          } else {
            setErrorMessage('Nenhum resultado encontrado');
            callback([]);
          }
        } catch (error) {
          setErrorMessage('Nenhum resultado encontrado');
          callback([]);
        } finally {
          setLoading(false);
        }
      } else {
        setErrorMessage('Nenhum resultado encontrado');
        callback([]);
      }
    }, 500),
    []
  );

  return (
    <S.ContainerSearch data-testid="search-component">
      <AsyncSelect
        instanceId="Select"
        loadOptions={loadOptions}
        loadingMessage={() => 'Buscando ...'}
        isClearable={true} // Permite limpar o campo
        placeholder="Busque por itens do cardápio"
        noOptionsMessage={() => errorMessage || optionsMessage}
        className="select"
        classNamePrefix="select"
        aria-label="Barra de pesquisa de cursos"
        tabSelectsValue
        inputValue={inputValue} // Passa o estado do inputValue
        onInputChange={(newValue) => setInputValue(newValue)} // Atualiza o estado do inputValue
        onChange={(selectedOption: OptionType | null) => {
          if (selectedOption && selectedOption.item) {
            onItemSelect(selectedOption.item);
            setInputValue(''); // Limpa o valor do input após seleção
          }
        }}
        components={{
          DropdownIndicator: () => <FaSearch />,
          IndicatorSeparator: () => null,
        }}
      />
    </S.ContainerSearch>
  );
};

export { Search };
