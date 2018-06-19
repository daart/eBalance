import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Form from "./../common/Form";

import { createOne, updateOne } from './../actions/categories';

const CategoryForm = ({ createOne, updateOne, categories, categoryId }) => {
  let fields = [
    {
      name: "title",
      type: "text",
      value: ""
    },
    {
      name: "categoryType",
      type: "radio",
      options: ['income', 'expense'],
      value: "expense"
    }
  ];

  if (categoryId) {
    let category = categories.find(a => a.id === categoryId);

    fields.map(a => a.value = category[a.name]);
  }

  const submitHandler = async formData => {
    let serverResponse;

    if (categoryId) {
      serverResponse = await axios.patch("http://localhost:2345/api/categories/" + categoryId, formData);
      let { category } = serverResponse.data;

      updateOne(category);
    } else {
      serverResponse = await axios.post("http://localhost:2345/api/categories", formData);
      let { category } = serverResponse.data;

      createOne(category);
    }

    let { errors } = serverResponse.data;

    if (errors) {
      return errors;
    }

    return null;
  };

  return <Form fields={fields} submitHandler={submitHandler} />;
};

const mapStateToProps = ({ categories }) => ({
  categories
});

export default withRouter(connect(mapStateToProps, { createOne, updateOne })(CategoryForm));
