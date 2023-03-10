// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURRENCIE,
  FETCH_SAVE_EXCHANGE_RATE,
  DELETE_LIST,
  ID_EDIT,
  SAVE_EDIT,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIE: {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  case FETCH_SAVE_EXCHANGE_RATE: {
    // console.log(action.payload);
    // console.log(state.expenses);
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  }
  case DELETE_LIST:
    return {
      ...state,
      expenses: action.payload,
    };
  case ID_EDIT:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  case SAVE_EDIT:
    return {
      ...state,
      expenses: action.payload,
      editor: false,
    };

  default: return state;
  }
};

export default wallet;
