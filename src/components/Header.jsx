import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../pages/css/logo_trybe.png';
import coin from '../pages/css/Vector.png';
import user from '../pages/css/Vector (1).png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const sumTotal = expenses
      .reduce((acum, e) => acum + e.value * e.exchangeRates[e.currency].ask, 0);
    return (
      <header className="header-header">
        <img src={ logo } alt="logo-trybe" />
        <div
          className="container-header-total"
        >
          <img src={ coin } alt="coins" />
          <p className="total-header-title">
            Total de despesas:
          </p>
          <p data-testid="total-field" className="total-header">
            {(+sumTotal).toFixed(2)}
          </p>
          <p
            data-testid="header-currency-field"
            className="total-header"
          >
            BRL
          </p>
        </div>

        <div
          className="container-header-total"
        >
          <img src={ user } alt="icon-user" />
          <p data-testid="email-field" className="email-header" />
          { email }
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
