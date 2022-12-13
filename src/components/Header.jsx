import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // const valueAsk = fetchCurrency[currency].ask;
  // const valueCalculed = +(valueAsk * value).toFixed(2);

  render() {
    const { email, expenses } = this.props;
    const sumTotal = expenses
      .reduce((acum, e) => acum + e.value * e.exchangeRates[e.currency].ask, 0);
    return (
      <header>
        <div
          data-testid="email-field"
        >
          { email }
        </div>
        <span
          data-testid="total-field"
        >
          {(+sumTotal).toFixed(2)}
        </span>
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
