import React, { Fragment } from 'react';

const TransactionItem = ({ transaction = {}  }) => {
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

  return (
    <Fragment>
    {
      type === 'expense' && (
        <div>
          <span>{fromId} --> </span>
          <span>{categoryId}</span>
          <span>{amount}</span>
        </div> 
      )
    }
    {
      type === 'income' && (
        <div>
          <span>{toId} --></span>
          <span>{categoryId}</span>
          <span>{amount}</span>
        </div> 
      )
    }
    {
      type === 'transfer' && (
        <div>
          <span>{fromId} ==> </span>
          <span>{toId}</span>
          <span>{amount}</span>
        </div> 
      )
    }
    </Fragment>
  );
}

export default TransactionItem;
