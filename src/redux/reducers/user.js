// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_FORM } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_FORM:
    return action.payload;
  default: return state;
  }
};

export default user;
