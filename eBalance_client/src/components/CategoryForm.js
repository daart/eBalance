import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Form from "./../common/Form";

import { createOne, updateOne } from './../actions/categories';

const CategoryForm = ({
  hideModal,
  type,
  createOne,
  updateOne,
  categories,
  category,
}) => {
  console.log('cats >>> ', categories);

  let fields = [
    {
      name: "title",
      type: "text",
      placeholder: "category title",
      value: ""
    },
    {
      name: "type",
      type: "text",
      value: type || null,
      readonly: true,
    },
    {
      name: "parentId",
      type: "select",
      placeholder: "pick category",
      options: [
        { text: 'No parent', value: null }, 
        ...categories
          .map(cat => ({ title: cat.title, text: cat.title, key: cat.id, value: cat.id }))
      ],
      value: null
    }
  ];
  
  if (category) {
   fields.forEach(c => (c.value = category[c.name]));
  }
  
  const submitHandler = async formData => {
    let serverResponse;

    if (category) {
      serverResponse = await axios.put(
        "http://localhost:2345/api/categories/" + category.id,
        formData
      );

      updateOne(serverResponse.data.category);
    } else {
      serverResponse = await axios.post(
        "http://localhost:2345/api/categories",
        formData
      );

      createOne(serverResponse.data.category);
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

const mapStateToProps = ({ categories }, { itemId, type }) => {
  let visibleCategories; 
  let category = categories.find(c => c.id === itemId);
  let hasChildren = false;

  if (category) {
    hasChildren = categories.some(cat => cat.parentId === category.id )
  }

  console.log('has children -< ', hasChildren);

  visibleCategories = categories.filter(cat => {
    if (cat.type !== type) return false
    if (cat.parentId !== null) return false
    if (hasChildren) return false
    if (category && cat.id === category.id) return false;
    
    return true
  });

  return {
    categories: visibleCategories,
    category,
    type,
  }
};

export default withRouter(connect(mapStateToProps, { createOne, updateOne })(CategoryForm));
