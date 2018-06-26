import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from 'react-redux';

import CategoryList from "./../components/CategoryList";

class Categories extends Component {
  render() {
    const { categories } = this.props;
    
    return (
      <div className="l_categories">
        <CategoryList showControls={true} categories={categories} />
      </div>
    );
  }
};

let nestCategories = (arr, parentId) => (
  arr
    .filter(upperLvlCategory => upperLvlCategory.parentId === parentId)
    .map(lowerLvlCategory => (
      {
        ...lowerLvlCategory,
        children: lowerLvlCategory.parentId === parentId ? nestCategories(arr, lowerLvlCategory.id) : []
      }
    ))
);

export default connect(({ categories }) => ({
  categories: nestCategories(categories, null)
}))(Categories);
