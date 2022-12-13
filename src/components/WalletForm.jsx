import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExchangeRates } from '../redux/actions';
import getCurrencies from '../services/getCurrencies';

const PAYMENT = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const EXPENSE_TAG = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveForm = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { value } = this.state;
    const fetchCurrency = await getCurrencies();
    delete fetchCurrency.USDT;
    console.log(this.state);
    // const valueAsk = fetchCurrency[currency].ask;
    // const valueCalculed = +(valueAsk * value).toFixed(2); // calculo conversão
    this.setState((prevState) => ({
      id: prevState.id,
      value,
      exchangeRates: fetchCurrency,
    }), () => {
      dispatch(fetchExchangeRates(this.state));
      this.setState((prevState) => ({
        id: prevState.id + 1,
        value: '',
        description: '',
      }));
    });
    console.log(this.state);
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currencies } = this.props;

    return (
      <form onSubmit={ this.saveForm }>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="number"
            data-testid="value-input"
            value={ value }
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            data-testid="description-input"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((coin, index) => (
                <option key={ index }>{ coin }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            {
              EXPENSE_TAG.map((descriptionTag, index) => (
                <option key={ index }>{ descriptionTag }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            {
              PAYMENT.map((payment, index) => (
                <option key={ index }>{ payment }</option>
              ))
            }
          </select>
        </label>
        <button
          type="submit"
          onClick={ this.saveForm }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (global) => ({
  currencies: global.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
