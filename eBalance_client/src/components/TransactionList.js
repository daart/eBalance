import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { List, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import { getAll } from './../actions/transactions';
import TransactionItem from './TransactionItem';
import Modal from "./../common/Modal";
import TransactionForm from "./TransactionForm";

const createNewTransactionBtnConfig = {
  color: "green",
  basic: true,
  icon: "add"
};

class TransactionList extends Component {
  state = {
    currentPage: 1,
    currentPageTransactions: [],
    transactionsPerPage: {},
    loading: null
  }

  componentDidMount() {
    this.loadPage(this.state.currentPage, true);
  }

  loadPage = (page, saveLocally = false) => {
    // transactions are cached
    if (this.state.transactionsPerPage[page]) {
      this.setState({currentPage: page})
      return;
    }

    this.setState({loading: page});

    this.props.getAll(page)
      .then((transactions) => {
        let newState = {
          currentPage: page,
          loading: null
        };
        
        if (saveLocally) {
          newState.transactionsPerPage = {
            ...this.state.transactionsPerPage,
            [page]: transactions
          }
        }
        
        this.setState(newState);
      })
  }

  render() {
    let { currentPage, currentPageTransactions } = this.state;
    
    const { transactions, total } = this.props;

    const thereIsNextPage = transactions.length < total;

    const pages = Math.ceil(total/5);

    return (
      <Fragment>
        <Modal
          modalContent={TransactionForm}
          headerContent="Add New Transaction"
          triggerBtnConfig={createNewTransactionBtnConfig}
        />

        {transactions.length > 0 ? (
          <Fragment>
            <List>

              {thereIsNextPage && (
                <Button onClick={() => this.loadPage(currentPage + 1)}>
                  Load More
                </Button>
              )}
              
              {Array(pages).fill(null).map((_, i) => 
                <Button
                  onClick={() => {
                    this.loadPage(i + 1, true)
                  }}
                  color={currentPage === i + 1 ? 'green' : null}
                  loading={this.state.loading === i + 1}
                >{i + 1}</Button>
              )}

              {this.state.transactionsPerPage[currentPage] && this.state.transactionsPerPage[currentPage].map(transaction => (
                <List.Item key={transaction.id}>
                  <TransactionItem transaction={transaction} />
                </List.Item>
              ))}
            </List>
            
          </Fragment>
        ) : (
          <div>No Transactions yet!</div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ transactions }) => {
  console.log('transactions :: ', transactions.rows, transactions.count);
  
  return {
    transactions: transactions.rows,
    total: transactions.count
  }
}

export default withRouter(connect(mapStateToProps, { getAll })(TransactionList));