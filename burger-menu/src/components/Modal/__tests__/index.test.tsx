import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import { Modal } from '../index';
import { themes } from '../../../configs/themes';
import { ThemeProvider } from 'styled-components';

describe('Modal Component', () => {
  test('Renderiza corretamente o modal quando isOpen é true', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Modal isOpen={true} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>
    );
    const modalOverlay = getByTestId('modal-overlay');
    const modalContent = getByTestId('modal-content');

    expect(modalOverlay).toBeInTheDocument();
    expect(modalContent).toBeInTheDocument();
  });

  test('Não renderiza o modal quando isOpen é false', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Modal isOpen={false} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>
    );
    const modalOverlay = queryByTestId('modal-overlay');
    const modalContent = queryByTestId('modal-content');

    expect(modalOverlay).not.toBeInTheDocument();
    expect(modalContent).not.toBeInTheDocument();
  });

  test('Chama onClose ao clicar no botão de fechar', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>
    );
    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  test('Chama onClose ao clicar fora do conteúdo do modal', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>
    );
    const modalOverlay = getByTestId('modal-overlay');
    fireEvent.mouseDown(modalOverlay);

    expect(onCloseMock).toHaveBeenCalled();
  });

  test('Chama onClose ao pressionar a tecla Escape', () => {
    const onCloseMock = jest.fn();
    render(
      <ThemeProvider theme={themes.light}>
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>
    );
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(onCloseMock).toHaveBeenCalled();
  });
});
