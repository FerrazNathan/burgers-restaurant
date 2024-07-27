import React from 'react';

import * as S from './styles';

interface LoadingProps {
  description?: string;
};

const Loading: React.FC<LoadingProps> = ({ description }) => {
  return (
    <S.ComponentLoading>
      <S.Loader
        className="spinner"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient">
            <stop offset="50%" className="spinnerStop" stopOpacity="1" />
            <stop offset="65%" className="spinnerStop" stopOpacity=".5" />
            <stop offset="100%" className="spinnerStop" stopOpacity="0" />
          </linearGradient>
        </defs>
        <S.Circle
          className="path"
          fill="transparent"
          cx="33"
          cy="33"
          r="30"
          stroke="#007bff"
        />
      </S.Loader>
      <span>{description}</span>
    </S.ComponentLoading>
  );
};

export { Loading };