import React from 'react';
import { Tab, List } from 'semantic-ui-react';

const CategoryTypeFilter = ({ categories, renderCategoryItem }) => {
  let categoriesMap = categories.reduce((accum, currentCategory) => {
    if (!accum[currentCategory.type]) {
      accum[currentCategory.type] = [currentCategory]
    } else {
      accum[currentCategory.type].push(currentCategory)
    }

    return accum;
  }, { expense: [], income: [] });

  const panes = Object.keys(categoriesMap).map(categoryType => {
    return {
      menuItem: categoryType,
      render: () => (
        <Tab.Pane>
          <List bulleted>
            {
              categoriesMap[categoryType].length ? categoriesMap[categoryType].map(renderCategoryItem) : <div>No categories yet on this Tab</div>
            }
          </List>
        </Tab.Pane>
      )
    }
  });

  return <Tab panes={panes} />
}

export default CategoryTypeFilter;;
