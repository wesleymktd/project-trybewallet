import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // const valueAsk = fetchCurrency[currency].ask;
  // const valueCalculed = +(valueAsk * value).toFixed(2);
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <div
          data-testid="email-field"
        >
          { email }
        </div>
        <div
          data-testid="total-field"
        >
          { expenses.reduce((acum, expense) => {
            const valueAsk = expense.exchangeRates[expense.currency].ask;
            const valueCalculed = +(valueAsk * expense.value).toFixed(2);
            return acum + valueCalculed;
          }, 0.00) }
        </div>
        <div
          data-testid="header-currency-field"
        >
          BRL
        </div>
      </header>
    );
  }
}

const mapStateToProps = (global) => ({
  email: global.user.email,
  expenses: global.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
