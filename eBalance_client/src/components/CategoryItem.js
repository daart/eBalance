import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteOne } from './../actions/categories';

import Confirmation from './../common/Confirm';
import Modal from './../common/Modal';
import CategoryForm from './CategoryForm';

let editCategoryBtnConfig = {
  color: "teal",
  txt: "Edit"
};

const CategoryItem = ({ category, removeCategory, showControls }) => {
  const { title, id } = category;

  return (
    <li key={id}>
      <Link to={`/categories/${id}`}>
        <div className="category-title">{title}</div>
      </Link>
      <div className="category-id">{id}</div>

      {
        showControls && (
          <div>
            <Confirmation removeCategory={removeCategory} accountId={id} />

          </div>
        )
      }
    </li>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeCategory(id) {
    dispatch(deleteOne(id))
  }
});

export default connect(null, mapDispatchToProps)(CategoryItem);
