import React from "react";
import { Message } from 'semantic-ui-react';

const FormErrors = ({ errors = [] }) => (
  <div className="l_form_fielderror">
    {
      errors.length ? (<Message color='orange'>
        <Message.List>
          {errors.map((err, index) => <Message.Item key={index}>{err}</Message.Item>)}
        </Message.List>
      </Message>) : ''
    }
  </div>
);

export default FormErrors;
