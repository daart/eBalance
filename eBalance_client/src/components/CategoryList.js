import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { List, Menu } from 'semantic-ui-react';

import CategoryItem from "./CategoryItem";
import Modal from './../common/Modal';
import CategoryForm from './../components/CategoryForm';
// import CategoryTypeFilter from './CategoryTypeFilter';
// import CategoryTypeSwithcer from './CategoryTypeSwitcher';

const createNewCategoryBtnConfig = {
  color: "green",
  basic: true,
  icon: 'add'
};

class CategoryList extends Component {
  state = {
    activeCategoryType: 'expense'
  }

  toggleCategoryType = (e, { name }) => {
    this.setState({
      activeCategoryType: name
    })
  }

  renderCategoryItem = (category) => (
    <List.Item key={category.id}>
      <List.Content>
        <CategoryItem 
          showControls={true} 
          category={category} 
          type={this.state.activeCategoryType}
        />
          { category.children.length ? (
            <List.List>
             { category.children.map(this.renderCategoryItem) }
            </List.List>) : ''
          }
      </List.Content>
    </List.Item>
  );

  render() {
    const { renderCategoryItem } = this;
    const { activeCategoryType } = this.state;
    const { categoriesMap, groupTitle } = this.props;

    return (
      <div className="l_dashboard_categories">
        <h3>{groupTitle}</h3>
         
        <Menu pointing secondary>
          {Object.keys(categoriesMap).map((type, index) => (
            <Menu.Item
              key={type+index}
              onClick={this.toggleCategoryType}
              name={type}
              active={activeCategoryType === type}
            />
          ))}
        </Menu>

        <List>
          {categoriesMap[activeCategoryType].map(renderCategoryItem)}
        </List>

        <Modal 
          type={ activeCategoryType }
          modalContent={CategoryForm} 
          headerContent="Add New Category" 
          triggerBtnConfig={createNewCategoryBtnConfig} 
        />
      </div>
    ); 
  }
};

const mapStateToProps = (state, { categories }) => {
  let categoriesMap = categories.reduce((accum, currentCategory) => {
    if (!accum[currentCategory.type]) {
      accum[currentCategory.type] = [currentCategory];
    } else {
      accum[currentCategory.type].push(currentCategory)
    }

    return accum
  }, { expense: [], income: [] });
  
  return { categories, categoriesMap };
};

export default connect(mapStateToProps)(CategoryList);
