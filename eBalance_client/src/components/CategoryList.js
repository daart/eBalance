import React, { Fragment } from "react";
import CategoryItem from "./CategoryItem";
import { List } from 'semantic-ui-react';

import Modal from './../common/Modal';
import CategoryForm from './../components/CategoryForm';
import CategoryTypeFilter from './CategoryTypeFilter';

let createNewCategoryBtnConfig = {
  color: "green",
  basic: true,
  icon: 'add'
};

const renderCategoryItem = (category) => (
  <List.Item key={category.id}>
    <List.Content>
      <CategoryItem floated="left" showControls={true} category={category} />
      {category.children.length && <List.List>
          {category.children.map(renderCategoryItem)}
        </List.List>}
    </List.Content>
  </List.Item>
);

const CategoryList = ({ categories = [], groupTitle, showControls }) => {

  return (
    <div className="l_dashboard_categories">
      <h3>{groupTitle}</h3>
      <CategoryTypeFilter 
        categories={categories}
        renderCategoryItem={renderCategoryItem}
      />

      <Modal
        modalContent={CategoryForm}
        headerContent="Add New Category"
        triggerBtnConfig={createNewCategoryBtnConfig}
      />
    </div>
  )
};

export default CategoryList;
