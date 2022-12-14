// Coloque aqui suas actions
import { FETCH_CURRENCIE,
  LOGIN_FORM,
  // SAVE_FORM,
  FETCH_SAVE_EXCHANGE_RATE,
  DELETE_LIST,
  ID_EDIT,
  SAVE_EDIT,
} from './actionTypes';
import getCurrencies from '../../services/getCurrencies';

export const idEdit = (id) => ({
  type: ID_EDIT,
  payload: id,
});

export const saveEdit = (expensesEdit) => ({
  type: SAVE_EDIT,
  payload: expensesEdit,
});

export const submitLogin = (emailLogin) => ({
  type: LOGIN_FORM,
  payload: emailLogin,
});

// const saveDataForm = (state) => ({
//   type: SAVE_FORM,
//   payload: state,
// });
export const deletForm = (payload) => ({
  type: DELETE_LIST,
  payload,
});

const saveDataFetch = (currency) => ({
  type: FETCH_SAVE_EXCHANGE_RATE,
  payload: currency,
});

const responseFetchCurr = (curr) => ({
  type: FETCH_CURRENCIE,
  payload: curr,
});

// requisições assincronas

export const fetchCurrencies = () => async (dispatch) => {
  const response = await getCurrencies();
  // console.log(response);
  const currencies = Object.keys(response);
  const currSelect = currencies.filter((currency) => currency !== 'USDT');
  // console.log(currSelect);
  dispatch(responseFetchCurr(currSelect));
};

export const fetchExchangeRates = (state) => async (dispatch) => {
  dispatch(saveDataFetch(state));
};
