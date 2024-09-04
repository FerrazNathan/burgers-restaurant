import React, { FC } from 'react';

import * as S from './Switch.style';
import { SwitchProps } from './Switch.types';

const Switch: FC<SwitchProps> = ({
  contrast = false,
  active = false,
  onChangeSwitch,
}) => {
  const handleSwitchSliderOnClick = () => {
    if (onChangeSwitch) {
      onChangeSwitch(!active);
    }
  };

  return (
    <S.SwitchMainComponent
      data-testid="switch"
      contrast={contrast}
    >
      <S.SwitchComponent data-testid="switch-component">
        <S.SwitchSliderWrapper contrast={contrast} data-testid="switch-component">
          <S.SwitchSlider
            contrast={contrast}
            active={active}
            aria-label="Botão de ativação"
            onClick={handleSwitchSliderOnClick}
            data-testid="switch-slider"
          />
        </S.SwitchSliderWrapper>
      </S.SwitchComponent>
    </S.SwitchMainComponent>
  );
};

export { Switch };
