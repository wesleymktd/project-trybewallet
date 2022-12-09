// Coloque aqui suas actions
import LOGIN_FORM from './actionTypes';

const submitLogin = (emailLogin) => ({
  type: LOGIN_FORM,
  payload: emailLogin,
});

export default submitLogin;
