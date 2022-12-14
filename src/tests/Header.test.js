import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('teste de cobertura "Header component" rota "/carteira"...', () => {
  test('Verificando se os elementos da Header são renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');
    const buttonEl = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'wesleypianista@hotmail.com');
    userEvent.type(inputPass, '5645659');

    userEvent.click(buttonEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const inputEmail2 = screen.getByText('wesleypianista@hotmail.com');
    const totalField = screen.getByTestId('total-field');
    const headerCurrency = screen.getByTestId('header-currency-field');
    const number0 = 0.00;

    expect(totalField).toHaveTextContent(number0);
    expect(inputEmail2).toBeInTheDocument();
    expect(headerCurrency).toHaveTextContent('BRL');

    const descriptionField = screen.getByRole('textbox', { name: /descrição:/i });
    const buttonExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(descriptionField, 'Mc Donald');
    userEvent.click(buttonExpense);

    expect(descriptionField).toBeInTheDocument();
    expect(buttonExpense).toBeInTheDocument();
  });
});
