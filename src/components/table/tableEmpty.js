import React from 'react';
import { Grid, GridItem } from '@patternfly/react-core';

const TableEmpty = () => (
  <Grid>
    <GridItem span={12}>Somethings busted...</GridItem>
  </Grid>
);

TableEmpty.propTypes = {};

TableEmpty.defaultProps = {};

export { TableEmpty as default, TableEmpty };
