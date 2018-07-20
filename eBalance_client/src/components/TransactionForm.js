import React, { Component, Fragment } from 'react';
import { Button, Form, Checkbox, Dropdown, Tab, Menu } from "semantic-ui-react";
import { connect } from 'react-redux';

class TransactionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValues: {
        fromAccount: "",
        toAccount: "",
        category: "",
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

  inputHandler = (e, data) => {
    const { name, value } = data ? data : e.target;
    const { inputValues } = this.state;

    console.log("Dropdown val ===> ", data);

    this.setState({
      inputValues: {
        ...inputValues,
        [name]: value
      }
    });
  };

  render() {
    const { inputValues } = this.state;
    const { type, fromAccount, toAccount } = inputValues;
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

        <Form>
          {
            type !== 'expense' && (
              <Form.Field>
                <Dropdown
                  selection
                  name="toAccount"
                  defaultOpen={true}
                  onChange={ this.inputHandler }
                  placeholder="toAccount"
                  options={
                    [
                      { text: 'Empty', value: null },
                      ...accounts
                        .filter(acc => acc.id !== fromAccount)
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
                  name="fromAccount"
                  placeholder="fromAccount"
                  onChange={ this.inputHandler }
                  options={
                    [
                      { text: 'Empty', value: null },
                      ...accounts
                        .filter(acc => acc.id !== toAccount)
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
                  name="category"
                  placeholder="category"
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

  // const fields = [
  //   {
  //     name: "fromAccount",
  //     type: "select",
  //     options: function (exclude) {
  //       return accounts.filter(a => a.id !== exclude).map(acc => ({ text: acc.title, value: acc.id, name: acc.title }))
  //     },
  //     value: ""
  //   },
  //   {
  //     name: "toAccount",
  //     type: "select",
  //     options: function (exclude) {
  //       return accounts.filter(a => a.id !== exclude).map(acc => ({ text: acc.title, value: acc.id, name: acc.title }))
  //     },
  //     value: ""
  //   },
  //   {
  //     name: "category",
  //     type: "select",
  //     options: function(type) {
  //       return categoriesMap[type]
  //     },
  //     value: ""
  //   },
  //   {
  //     name: "description",
  //     type: "text",
  //     value: ""
  //   },
  //   {
  //     name: "amount",
  //     type: "text",
  //     value: ""
  //   },
  //   {
  //     name: "createdAt",
  //     type: "text",
  //     value: ""
  //   },
  // ]

  return { accounts, categories };
};

export default connect(mapStateToProps)(TransactionForm);
