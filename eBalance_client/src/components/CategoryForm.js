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
  // console.log('cats >>> ', categories, ' current Category :: ', category, ' active type >> ', type);
  let fields = [
    {
      name: "title",
      type: "text",
      placeholder: "category title",
      value: ""
    },
    {
      name: "type",
      type: category ? 'text' : 'radio',
      options: ['expense', 'income'],
      value: type || null,
      readonly: category ? true : false,
    },
    {
      name: "parentId",
      type: "select",
      placeholder: "pick category",
      options: function(type) {
        let hasChildren = false;
        let visibleCategories = [];

        if (category) {
          hasChildren = categories.some(cat => cat.parentId === category.id)
        }

        visibleCategories = categories
          .filter(cat => {
            if (cat.type !== type) return false;
            if (cat.parentId !== null) return false;
            if (hasChildren) return false;
            if (category && cat.id === category.id) return false;

            return true;
          })

        return [
          { text: "No Parent", value: null }, 
          ...visibleCategories.map(
            cat => ({
              title: cat.title,
              text: cat.title,
              key: cat.id,
              value: cat.id
            })
          )
        ];
      },
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

  console.log('has children -< ', hasChildren, ' fuck that ttype >> ', type);

  visibleCategories = categories.filter(cat => {
    if (cat.type !== type) return false
    if (cat.parentId !== null) return false
    if (hasChildren) return false
    if (category && cat.id === category.id) return false;
    
    return true
  });

  return {
    // categories: visibleCategories,
    categories,
    category,
    type,
  }
};

export default withRouter(connect(mapStateToProps, { createOne, updateOne })(CategoryForm));
