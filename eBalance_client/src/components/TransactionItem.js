import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Confirm from './../common/Confirm'; 

let editTransactionBtnConfig = {
  color: "teal",
  icon: "pencil",
  basic: true
};

let deleteBtnConfig = {
  color: "red",
  icon: "remove",
  basic: true
};

const TransactionItem = ({ transaction = {}, fromAccount = {}, toAccount = {}, category = {} }) => {
  const {
    id,
    amount,
    type,
    description,
    fromId,
    toId,
    categoryId,
    createdAt,
    updatedAt
  } = transaction;

  console.log(this.props);

  return <Fragment>
      {
        type === "expense" && (<div>
          <span>{amount}<Icon name="dollar" color="green"/></span>
          <span>{fromAccount.title}</span>
          <Icon color="red" name="arrow alternate circle right big icon" />
          <span>{category.title}</span>
          <span>{updatedAt}</span>
        </div>)
      }
      {
        type === "income" && (<div>
          <span>{amount}<Icon name="dollar" color="green"/></span>
          <span>{toId}</span>
          <Icon color="green" name="arrow alternate circle right big icon" />
          <span>{category.title}</span>
          <span>{updatedAt}</span>
        </div>)
      }
      {
        type === "transfer" && (<div>
          <span>{amount}<Icon name="dollar" color="green"/></span>
          <span>{fromAccount.title}</span>
          <Icon color="blue" name="arrow alternate circle right big icon" />
          <span>{toAccount.title}</span>
          <span>{updatedAt}</span>
        </div>)
      }
    </Fragment>;
}

const mapStateToProps = ({ accounts, categories }, { transaction }) => {
  const { fromId, toId, categoryId } = transaction;
  console.log('action transaction --> ', transaction, ' ::: ', fromId, toId);

  return {
    fromAccount: accounts.find(acc => acc.id === fromId),
    toAccount: accounts.find(acc => acc.id === toId),
    category: categories.find(cat => cat.id === categoryId),
  }
}
export default connect(mapStateToProps)(TransactionItem);
