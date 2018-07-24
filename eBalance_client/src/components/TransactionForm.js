import React, { Component, Fragment } from 'react';
import { Button, Form, Checkbox, Dropdown, Tab, Menu } from "semantic-ui-react";
import { connect } from 'react-redux';
import axios from 'axios';

import { updateOne, createOne  } from './../actions/transactions';

class TransactionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      inputValues: {
        fromId: null,
        toId: null,
        categoryId: null,
        description: "",
        createdAt: "",
        amount: 0,
        type: "expense"
      }
    };

  }

  onSwitchHandler = (e, data) => {
    const { name } = data;

    this.setState({
      inputValues: {
        ...this.state.inputValues,
        type: name
      }
    });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    
    const { inputValues } = this.state;
    const { transaction, createOne, updateOne } = this.props;
    let serverResponse;
    let formData = inputValues;

    if (transaction) {
      serverResponse = await axios.put(
        "http://localhost:2345/api/transactions/" + transaction.id,
        formData
      );

      updateOne(serverResponse.data.transaction);
    } else {
      serverResponse = await axios.post(
        "http://localhost:2345/api/transactions",
        formData
      );

      console.log('serverresponded on Create ==> ', serverResponse.data);

      createOne(serverResponse.data.transaction);
    }

    let { errors } = serverResponse.data;
    
    if (errors) {
      await this.setState({
        errors: {
          ...this.state.errors,
          errors
        }
      });

      return errors;
    } 

    return null;
  }

  inputHandler = (e, data) => {
    const { name, value } = data ? data : e.target;
    const { inputValues } = this.state;

    this.setState({
      inputValues: {
        ...inputValues,
        [name]: value
      }
    });
  };

  render() {
    const { inputValues } = this.state;
    const { type, fromId, toId } = inputValues;
    const { accounts, categories } = this.props;

    return <Fragment>
        <Menu secondary>
          {["income", "transfer", "expense"].map(t => (
            <Menu.Item
              name={t}
              key={t}
              active={type === t}
              onClick={this.onSwitchHandler}
            />
          ))}
        </Menu>

        <Form onSubmit={ this.submitHandler } >
          {
            type !== 'expense' && (
              <Form.Field>
                <Dropdown
                  selection
                  name="toId"
                  defaultOpen={true}
                  onChange={ this.inputHandler }
                  placeholder="toId"
                  options={
                    [
                      { text: 'Empty', value: null },
                      ...accounts
                        .filter(acc => acc.id !== fromId)
                        .map(acc => ({ text: acc.title, value: acc.id, name: acc.title }))
                    ]
                  }
                />
              </Form.Field>
            )
          }
          {
            type !== 'income' && (
              <Form.Field>
                <Dropdown
                  selection
                  name="fromId"
                  placeholder="fromId"
                  onChange={ this.inputHandler }
                  options={
                    [
                      { text: 'Empty', value: null },
                      ...accounts
                        .filter(acc => acc.id !== toId)
                        .map(acc => ({ text: acc.title, value: acc.id, name: acc.title }))
                    ]

                  }
                />
              </Form.Field>
            )
          }
          {
            type !== 'transfer' && (
              <Form.Field>
                <Dropdown
                  selection
                  name="categoryId"
                  placeholder="categoryId"
                  onChange={ this.inputHandler }
                  options={
                    [
                      { text: 'Empty', value: null },
                      ...categories
                        .filter(c => c.type === type)
                        .map(c => ({ text: c.title, value: c.id, name: c.title }))
                    ]

                  }
                />
              </Form.Field>
            )
          }
          <Form.Field>
            <Fragment>
              <label htmlFor='amount'>amount</label>
              <input
                name='amount'
                type='text'
                onChange={this.inputHandler}
                value={inputValues['amount']}
              />
            </Fragment>
          </Form.Field>

          <Form.Field>
            <Fragment>
              <label htmlFor='description'>description</label>
              <input
                name='description'
                type='text'
                onChange={this.inputHandler}
                value={inputValues['description']}
              />
            </Fragment>
          </Form.Field>
          <Button type="submit">Send</Button>
        </Form>
      </Fragment>;
  }
}

const mapStateToProps = ({ accounts, categories }) => {
  const categoriesMap = categories.reduce((accum, currentCategory) => {
    if (accum[currentCategory.type]) {
      accum[currentCategory.type].push({
        text: currentCategory.title,
        value: currentCategory.id,
        name: currentCategory.title
      });
    }

    return accum;
    }, { income: [], expense: [] }
  ) || {};

  return { accounts, categories };
};

export default connect(mapStateToProps, { createOne, updateOne })(TransactionForm);
