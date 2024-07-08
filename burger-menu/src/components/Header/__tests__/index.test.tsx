import React from "react";
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { Header } from "../index";
import { HeaderData } from "../HeaderData";

describe("Header Component", () => {

  test("Renderiza corretamente o container principal do header", () => {
    const { getByTestId } = render(<Header activePage="Menu" />);
    const headerContainer = getByTestId("HeaderContainer");

    expect(headerContainer).toBeInTheDocument();
  });

  test("Verifica se o menu é renderizado corretamente com base nos dados", () => {
    const { getAllByTestId } = render(<Header activePage="Menu" />);
    const menuItems = getAllByTestId("menu-item");

    expect(menuItems.length).toEqual(HeaderData.length);

    menuItems.forEach((menuItem: any, index: number) => {
      expect(menuItem).toHaveTextContent(HeaderData[index].page);
    });
  });

  test("Verifica se a imagem do logotipo é renderizada corretamente", () => {
    const { getByAltText } = render(<Header activePage="Menu" />);
    const logoImage = getByAltText("Imagem do logotipo do restaurante");

    expect(logoImage).toBeInTheDocument();
  });
});
