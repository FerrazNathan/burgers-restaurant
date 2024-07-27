import React from "react";
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { Footer } from "../index";

describe("Footer Component", () => {
  test("Verifica se o componente Footer renderiza todos os elementos esperados", () => {
    const { getByTestId } = render(<Footer />);
    const footerContainer = getByTestId("footerContainer");

    expect(footerContainer).toBeInTheDocument();
  });

  test("Renderiza corretamente o texto de direitos autorais", () => {
    const { getByTestId } = render(<Footer />);
    const copyrightText = getByTestId("copyrightText");

    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText).toHaveTextContent(
      "© Nathan Ferraz - Todos os direitos reservados"
    );
  });
})