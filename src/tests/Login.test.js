import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('teste de cobertura Login...', () => {
  test('Verificando se os elementos de login são renderizados', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');
    const buttonEl = screen.getByRole('button', { name: /entrar/i });

    expect(inputEmail).toBeInTheDocument(inputEmail);
    expect(inputPass).toBeInTheDocument(inputEmail);
    expect(buttonEl).toBeInTheDocument(inputEmail);
  });
  test('Teste das regras de negócio do botão de login e se a rota é alterada ao clicar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');
    const buttonEl = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'xablau');
    userEvent.type(inputPass, '356');

    expect(buttonEl).toBeDisabled();

    userEvent.type(inputEmail, 'wesleypianista@hotmail.com');
    userEvent.type(inputPass, '5645659');

    expect(buttonEl).toBeEnabled();

    userEvent.click(buttonEl);
    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });
});
