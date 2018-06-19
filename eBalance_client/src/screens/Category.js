import React from 'react';
import { Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CategoryItem from './../components/CategoryItem';
import CategoryForm from './../components/CategoryForm';

import { getOne } from './../actions/categories';

const Category = ({ match, categories }) => {
  const category = categories.find(category => category.id === match.params.id) || {};

  console.log('category title by id -->--> ', category);

  return <div className="l_category-info">
      <Grid>
        <Grid.Row>
          <Grid.Column width="10" stretched>
            Categories!
            <CategoryItem category={category} showControls={true} />
          </Grid.Column>

          <Grid.Column width="6">
            @Edit Category!
            <CategoryForm categoryId={ category.id } />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>;
};

const mapStateToProps = ({ categories }) => ({
  categories,
});

export default withRouter(connect(mapStateToProps)(Category));
