import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';

import TransactionItem from './TransactionItem';

class TransactionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: props.transactions || [],
      count: props.count || 0
    }
  }

  render() {
    const { transactions } = this.state;

    return (
      <List>
        {
          transactions.map(transaction => (
              <List.Item key={transaction.id}>
                <TransactionItem 
                  transaction={transaction}
                />
              </List.Item>
            )
          )
        }
      </List>
    )
  }
}

const mapStateToProps = ({ transactions }) => ({
  transactions: transactions.rows,
  count: transactions.count
})

export default connect(mapStateToProps)(TransactionList);