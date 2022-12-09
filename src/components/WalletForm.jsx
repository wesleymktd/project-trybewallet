import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PAYMENT = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const EXPENSE_TAG = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    expense: 0,
    description: '',
    currenceAct: 'USD',
    paymentSelect: 'Dinheiro',
    expenseTag: 'Alimentação',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(({
      [name]: value,
    }), this.enabledButton);
  };

  render() {
    const {
      expense,
      description,
      currenceAct,
      paymentSelect,
      expenseTag,
    } = this.state;
    const { currencies } = this.props;

    return (
      <form onSubmit={ this.saveForm }>
        <label htmlFor="expense">
          Valor:
          <input
            id="expense"
            type="number"
            data-testid="value-input"
            value={ expense }
            name="expense"
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
        <label htmlFor="currenceAct">
          Moeda:
          <select
            name="currenceAct"
            id="currenceAct"
            data-testid="currency-input"
            value={ currenceAct }
            onChange={ this.handleChange }
          >
            {
              currencies.map((currence, index) => (
                <option key={ index }>{ currence }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="expenseTag">
          Método de pagamento:
          <select
            name="expenseTag"
            id="expenseTag"
            data-testid="method-input"
            value={ expenseTag }
            onChange={ this.handleChange }
          >
            {
              PAYMENT.map((descriptionTag, index) => (
                <option key={ index }>{ descriptionTag }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="paymentSelect">
          Categoria:
          <select
            name="paymentSelect"
            id="paymentSelect"
            data-testid="tag-input"
            value={ paymentSelect }
            onChange={ this.handleChange }
          >
            {
              EXPENSE_TAG.map((payment, index) => (
                <option key={ index }>{ payment }</option>
              ))
            }
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (global) => ({
  currencies: global.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
