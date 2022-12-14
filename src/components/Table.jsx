import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletForm, idEdit } from '../redux/actions';

class Table extends Component {
  buttonDelet = (id) => {
    const { expense, dispatch } = this.props;
    const newList = expense.filter((expensy) => expensy.id !== id);
    dispatch(deletForm(newList));
  };

  editExpense = (id) => {
    const { dispatch, expense } = this.props;
    const editExpense = expense.find((exp) => exp.id === id);
    // console.log(editExpense.id);
    dispatch(idEdit(editExpense.id));
  };

  render() {
    const { expense } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expense.map((
              { id, description, tag, method, value, exchangeRates, currency },
            ) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ parseFloat(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ parseFloat(exchangeRates[currency].ask * value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.buttonDelet(id) }
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editExpense(id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (global) => ({
  expense: global.wallet.expenses,
});

Table.propTypes = {
  expense: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
