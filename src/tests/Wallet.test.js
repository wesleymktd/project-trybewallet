import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const mock = {
  user: {
    email: 'wesleymktd@gmail.com',
  },
  wallet: {
    currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR',
      'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

describe('teste de cobertura "Wallet component" rota "/carteira"...', () => {
  test('Verificando se os elementos da Header são renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: mock,
    });
    const emailEl = screen.getByTestId('email-field');
    // expect(emailEl).toHaveTextContent('wesleymktd@gmail.com');
    expect(emailEl).toHaveTextContent('wesleymktd@gm.com');
    // const { pathname } = history.location;
    // expect(pathname).toBe('/xablau');
  });
});
