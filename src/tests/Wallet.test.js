import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

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
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const emailEl = screen.getByTestId('email-field');
    expect(emailEl).toHaveTextContent('wesleymktd@gmail.com');

    const value = screen.getByTestId('value-input');
    const description = screen.getByRole('textbox', { name: /descrição:/i });
    const currence = screen.getByRole('combobox', { name: /moeda:/i });
    const category = screen.getByRole('combobox', { name: /categoria:/i });
    const method = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const buttonAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    const textBrl = screen.getByText(/brl/i);

    userEvent.type(value, '56');
    userEvent.type(description, 'macarrão');

    expect(buttonAddExpense).toBeInTheDocument();
    expect(textBrl).toHaveTextContent('BRL');

    expect(value.value).toBe('56');
    expect(description.value).toBe('macarrão');
    expect(currence.value).toBe('USD');
    expect(category.value).toBe('Alimentação');
    expect(method.value).toBe('Dinheiro');
  });
  test('Se ao clicar em add dispesa as informações são salvas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: mock,
    });

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const value = screen.getByTestId('value-input');
    const description = screen.getByRole('textbox', { name: /descrição:/i });
    const buttonAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '56');
    userEvent.type(description, 'macarrão');
    userEvent.click(buttonAddExpense);

    const descriptionHead = screen.queryByRole('columnheader', { name: /descrição/i });
    const tagHead = screen.getByRole('columnheader', { name: /tag/i });
    const methodHead = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const exchangeHead = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const exchangeConvertHead = screen.getByRole('columnheader', { name: /valor convertido/i });
    const coinDefault = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const buttonDelet = await screen.findByRole('button', { name: /excluir/i });
    const buttonEdit = await screen.findByRole('button', { name: /editar/i });

    const headTotalExpense = await screen.findByTestId('total-field');

    userEvent.click(buttonEdit);

    expect(headTotalExpense).toHaveTextContent('266.17');

    expect(descriptionHead).toBeInTheDocument();
    expect(tagHead).toBeInTheDocument();
    expect(methodHead).toBeInTheDocument();
    expect(exchangeHead).toBeInTheDocument();
    expect(exchangeConvertHead).toBeInTheDocument();
    expect(coinDefault).toBeInTheDocument();
    expect(buttonDelet).toBeInTheDocument();
    // expect(coinDefault).toBeInTheDocument();

    const editDesp = await screen.findByRole('button', { name: /editar despesa/i });
    expect(editDesp).toBeInTheDocument();

    const tabDesc = await screen.findByRole('cell', { name: /macarrão/i });
    const tabTag = await screen.findByRole('cell', { name: /alimentação/i });
    const tabMethod = await screen.findByRole('cell', { name: /dinheiro/i });
    const tabValue = await screen.findByRole('cell', { name: /56\.00/i });
    const tabCoin = await screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i });
    const tabExchange = await screen.findByRole('cell', { name: /4\.75/i });
    const tabValueConv = await screen.findByRole('cell', { name: /266\.17/i });

    expect(tabDesc).toBeInTheDocument();
    expect(tabTag).toBeInTheDocument();
    expect(tabMethod).toBeInTheDocument();
    expect(tabValue).toBeInTheDocument();
    expect(tabCoin).toBeInTheDocument();
    expect(tabExchange).toBeInTheDocument();
    expect(tabValueConv).toBeInTheDocument();

    const buttonEditExpense = await screen.findByRole('button', { name: /editar despesa/i });

    userEvent.click(buttonEditExpense);

    userEvent.click(buttonDelet);
  });
});
