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
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      currentTransactionsList: [],
      cachedTransactions: {},
      isLoading: null,
    };
  }

  componentDidMount() {
    this.loadPage(this.state.currentPage);
  }

  renderControls = pages => {
    let { currentPage, isLoading } = this.state;
    
    return new Array(pages).fill(null).map((el, i) => (
      <Button
        active={ currentPage === i + 1 }
        loading={ isLoading === i + 1 }
        onClick={() => {
          this.loadPage(i + 1)
        }}
      >
        {i + 1}
      </Button>
      )
    );
  };

  loadPage = async (pageNum) => {
    let { cachedTransactions } = this.state;
    const { getAll } = this.props;

    if (cachedTransactions[pageNum]) {
      this.setState({
        currentPage: pageNum
      })
      return 
    } 

    this.setState({
      isLoading: pageNum
    })

    let transactionsResponse = await getAll(pageNum);
    let newStateObj = {
      currentPage: pageNum,
      cachedTransactions: {
        ...cachedTransactions,
        [pageNum]: transactionsResponse
      },
      isLoading: null
    }

    this.setState(newStateObj);
  };

  render() {
    const { total, limit } = this.props;
    const {
      currentPage,
      cachedTransactions,
      currentTransactionsList,
    } = this.state;
    const pages = Math.ceil(total / limit);

    console.log(
      this.state
    );

    return (
      <Fragment>
        @List of TransActions
        { total && this.renderControls(pages) }

        <List>
          {cachedTransactions[currentPage] && (
            cachedTransactions[currentPage].map(t => {
                return (
                  <List.Item key={t.id}>
                    <TransactionItem transaction={t} />
                  </List.Item>
                );
              })
            )
          }
        </List>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ transactions }) => {
  const { rows, count, limit } = transactions;
  console.log('transactions :: ', rows, count, limit);
  
  return {
    transactions: rows,
    total: count,
    limit
  }
}

export default withRouter(connect(mapStateToProps, { getAll })(TransactionList));