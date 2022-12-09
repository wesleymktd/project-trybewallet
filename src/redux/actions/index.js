// Coloque aqui suas actions
import { FETCH_CURRENCIE, LOGIN_FORM } from './actionTypes';
import getCurrencies from '../../services/getCurrencies';

export const submitLogin = (emailLogin) => ({
  type: LOGIN_FORM,
  payload: emailLogin,
});

const responseFetchCurr = (curr) => ({
  type: FETCH_CURRENCIE,
  payload: curr,
});

export const fetchCurrencies = () => async (dispatch) => {
  console.log('vem hexa');
  const response = await getCurrencies();
  // console.log(Object.keys(response));
  const currencies = Object.keys(response);
  const currSelect = currencies.filter((currence) => currence !== 'USDT');
  // console.log(currSelect);
  dispatch(responseFetchCurr(currSelect));
};
