import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitLogin } from '../redux/actions';
import logo from './css/logo_trybe.png';

class Login extends React.Component {
  state = {
    email: '',
    pass: '',
    isDisabled: true,
  };

  enabledButton = () => {
    const { email, pass } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;
    const emailIsInvalid = !emailRegex.test(email);
    const numberSeis = 6;
    const passIsInvalid = pass.length < numberSeis;
    const disabled = emailIsInvalid || passIsInvalid;

    this.setState({
      isDisabled: disabled,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(({
      [name]: value,
    }), this.enabledButton);
  };

  saveForm = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(submitLogin({ email }));
    history.push('/carteira');
  };

  render() {
    const { email, pass, isDisabled } = this.state;
    return (
      <main className="login-form-main">
        <img src={ logo } alt="logo-trybe" />
        <form
          className="login-form"
          onSubmit={ this.saveForm }
        >
          <input
            className="login-input"
            type="text"
            data-testid="email-input"
            placeholder="Digite seu Email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
          <input
            className="login-input"
            type="password"
            data-testid="password-input"
            placeholder="Digite sua Senha"
            value={ pass }
            name="pass"
            onChange={ this.handleChange }
          />
          <button
            className="login-button"
            type="submit"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
