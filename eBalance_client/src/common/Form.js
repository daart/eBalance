import React, { Component } from "react";
import { Button, Form } from 'semantic-ui-react';

import FormErrors from "./FormErrors";

class FormComponent extends Component {
  state = {
    errors: {},
    inputValues:
      this.props.fields.reduce((fields, currentField) => {
        fields[currentField.name] = currentField.value;
        return fields;
      }, {}) || {}
  };

  fields = this.props.fields;

  inputHandler = e => {
    const { name, value } = e.target;
    const { inputValues } = this.state;

    this.setState({
      inputValues: {
        ...inputValues,
        [name]: value
      }
    });
  };

  formHandler = async e => {
    e.preventDefault();

    const { submitHandler } = this.props;
    const { inputValues } = this.state;
    const errors = {};

    if (!submitHandler) return;

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors
      });
    } else {
      this.setState({
        errors: {}
      });

      const errors = await submitHandler(inputValues);

      if (errors) {
        this.setState({ errors });
      }
    }
  };

  render() {
    const { fields, inputHandler, formHandler } = this;
    const { inputValues, errors } = this.state;
    
    return (
      <Form onSubmit={formHandler} >
        {
          fields.map((field, index) => {
            const { name, type } = field;

            return (
              <div key={index} >
                <Form.Field error={!!errors[name]}>
                  <label htmlFor={name}>{name}</label>
                  <input 
                    name={name}
                    type={type}
                    onChange={inputHandler}
                    value={inputValues[name]}
                  />
                </Form.Field>
                
                <FormErrors errors={errors[name]} />
              </div>
            );
          })
        }
        <Button type="submit"> Submit </Button>
      </Form>
    );
  }
}

export default FormComponent;
