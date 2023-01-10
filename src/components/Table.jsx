import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletForm, idEdit } from '../redux/actions';
import photoEdit from '../pages/css/Vector (2).png';
import photoDelet from '../pages/css/Vector (3).png';

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
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="table-title">Descrição</th>
              <th className="table-title">Tag</th>
              <th className="table-title">Método de pagamento</th>
              <th className="table-title">Valor</th>
              <th className="table-title">Moeda</th>
              <th className="table-title">Câmbio utilizado</th>
              <th className="table-title">Valor convertido</th>
              <th className="table-title">Moeda de conversão</th>
              <th className="table-title">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expense.map((
              { id, description, tag, method, value, exchangeRates, currency },
            ) => (
              <tr key={ id } className="container-table-elements">
                <td className="table-elements">{ description }</td>
                <td className="table-elements">{ tag }</td>
                <td className="table-elements">{ method }</td>
                <td className="table-elements">{ parseFloat(value).toFixed(2) }</td>
                <td className="table-elements">{ exchangeRates[currency].name }</td>
                <td
                  className="table-elements"
                >
                  { parseFloat(exchangeRates[currency].ask).toFixed(2) }
                </td>
                <td
                  className="table-elements"
                >
                  { parseFloat(exchangeRates[currency].ask * value).toFixed(2) }
                </td>
                <td className="table-elements">Real</td>
                <td>
                  <button
                    className="button-table"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.buttonDelet(id) }
                  >
                    <img src={ photoDelet } alt="delet-button" />
                  </button>
                  <button
                    className="button-table"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editExpense(id) }
                  >
                    <img src={ photoEdit } alt="edit-button" />
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
