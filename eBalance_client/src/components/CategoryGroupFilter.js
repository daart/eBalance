import React from 'react';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';

import CategoryList from './CategoryList';

const CategoryGroupFilter = ({ categories }) => {
  console.log('categories in Filter ', categories);

  const panesMap = categories.reduce((accum, current) => {
    if (accum[current.categoryType]) {
      accum[current.categoryType].push(current);
    } else {
      accum[current.categoryType] = [current]
    }

    return accum;
  }, {})

  const panes = Object.keys(panesMap).map(groupTitle => {
    return {
      menuItem: groupTitle,
      render: () => (
        <Tab.Pane>
          <CategoryList categories={panesMap[groupTitle]} groupTitle={groupTitle}/>
        </Tab.Pane>
      )
    }
  });

  return (
    !categories.length ? (<div>No Categories Yet!</div> ) : (<Tab panes={panes} />) 
  );
};

const mapStateToProps = ({ categories }) => ({
  categories
})

export default connect(mapStateToProps)(CategoryGroupFilter);

