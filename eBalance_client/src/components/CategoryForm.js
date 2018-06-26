import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Form from "./../common/Form";

import { createOne, updateOne } from './../actions/categories';

const CategoryForm = ({
  hideModal,
  createOne,
  updateOne,
  categories,
  itemId
}) => {
  let fields = [
    {
      name: "title",
      type: "text",
      placeholder: "category title",
      value: ""
    },
    {
      name: "type",
      type: "radio",
      options: ["income", "expense"],
      value: "expense"
    },
    {
      name: "categorylevel",
      type: "select",
      placeholder: "pick category",
      options: categories.map(cat => ({...cat, text: cat.title, key: cat.id, value: cat.id })),
      value: null
    }
  ];

  if (itemId) {
    let category = categories.find(a => a.id === itemId);

    fields.map(a => (a.value = category[a.name]));
  }

  const submitHandler = async formData => {
    let serverResponse;

    if (itemId) {
      serverResponse = await axios.patch(
        "http://localhost:2345/api/categories/" + itemId,
        formData
      );
      let { category } = serverResponse.data;

      updateOne(category);
    } else {
      serverResponse = await axios.post(
        "http://localhost:2345/api/categories",
        formData
      );
      let { category } = serverResponse.data;

      createOne(category);
    }

    let { errors } = serverResponse.data;

    if (errors) {
      return errors;
    }
    
    hideModal();
    return null;
  };

  return <Form fields={fields} submitHandler={submitHandler} />;
};

const mapStateToProps = ({ categories }) => ({
  categories
});

export default withRouter(connect(mapStateToProps, { createOne, updateOne })(CategoryForm));
