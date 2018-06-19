import React from "react";
import { Grid } from "semantic-ui-react";

import CategoryList from "./../components/CategoryList";
import CategoryForm from './../components/CategoryForm';
import CategoryGroupFilter from './../components/CategoryGroupFilter';

const Categories = () => {
  return <div className="l_categories">
      <Grid>
        <Grid.Row>
          <Grid.Column width="10" stretched>
            Categories!
            <CategoryGroupFilter />
          </Grid.Column>

          <Grid.Column width="6">
            @Add new Category!
            <CategoryForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>;
};

export default Categories;
