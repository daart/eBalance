import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { List, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import { getAll } from "./../actions/transactions";
import TransactionItem from "./TransactionItem";
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
      localTransactions: [],
      currentPage: 1
    }
  }

  async componentDidMount() {
    this.loadMore(this.state.currentPage);
  }

  loadMore = async (pageNum) => {
    let { getAll } = this.props;
    let { localTransactions } = this.state;
    let transactionsPack = await getAll(pageNum);

    this.setState({
      localTransactions: [
        ...localTransactions,
        ...transactionsPack
      ],
      currentPage: pageNum
    })
  }

  render() {
    const { total } = this.props;
    const { currentPage, localTransactions } = this.state;
    const isThereNextPage = localTransactions.length < total;

    return (
      <Fragment>

        <Modal
          modalContent={ TransactionForm }
          headerContent="Create Transaction"
          triggerBtnConfig={ createNewTransactionBtnConfig }
        />

        <List>

          {
            localTransactions.length > 0 ? (localTransactions.map(t => {
              return (
                <List.Item key={t.id}>
                  <TransactionItem transaction={t} />
                </List.Item>
              )
            })) : <div>loading</div>
          }
        </List>

        {
          isThereNextPage && (
            <Button
              onClick={() => {
                this.loadMore(currentPage + 1)
              }}
            >
              Load More
            </Button>
          )
        }
      </Fragment>
    )
  }
};

const mapStateToProps = ({ transactions }) => {
  const { rows, count, limit } = transactions;

  return {
    transactions: rows,
    total: count,
    limit
  }
}

export default connect(mapStateToProps, { getAll })(TransactionList);