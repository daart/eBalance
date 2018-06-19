import React from "react";
import CategoryItem from "./CategoryItem";

let createNewCategoryBtnConfig = {
  color: "green",
  txt: "Create New"
};

const CategoryList = ({ categories = [], groupTitle, showControls }) => {
  console.log('categories --> ', categories);
  
  return (
    <div className="l_dashboard_categories">
      <h3>{ groupTitle }</h3>
      <ul>
        {categories.map(category => (
          <CategoryItem
            showControls={showControls}
            category={category}
            key={category.id}
          />
        ))}
      </ul>
    </div>
  )
};

export default CategoryList;
