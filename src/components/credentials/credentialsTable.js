/* eslint-disable */
import React from 'react';
// import PropTypes from 'prop-types';
// import {} from '@patternfly/react-core';
import { TableComposable, TableVariant, Thead, Tbody, Tr, Th, Td, ExpandableRowContent } from '@patternfly/react-table';

const CredentialsTable = () => (
  <TableComposable variant={TableVariant.compact}>
    <Thead>
      <Tr>
        <Td />
        <Th>one</Th>
        <Th>two</Th>
        <Th>three</Th>
      </Tr>
    </Thead>
    <Tbody key="test001" isExpanded={false}>
      <Tr>
        <Td select={{ onSelect: (a, b, c) => console.log(' ROW SELECT >>>>', a, b, c) }} />
        <Th>row 001</Th>
        <Td>cell 001</Td>
        <Td>cell 002</Td>
        <Td>cell 003</Td>
        <Td isActionCell>row action</Td>
      </Tr>
    </Tbody>
    <Tbody key="test002" isExpanded>
      <Tr key="test002-001">
        <Td key="test002-001-001" select={{ onSelect: (a, b, c) => console.log(' ROW SELECT >>>>', a, b, c) }} />
        <Th key="test002-001-002">row 001</Th>
        <Td key="test002-001-003" compoundExpand={{ isExpanded: false, onToggle: (a, b, c) => console.log('COMP EXPAND >>>>', a, b, c)}}>
          cell 001
        </Td>
        <Td key="test002-001-004">cell 002</Td>
        <Td key="test002-001-005">cell 003</Td>
        <Td key="test002-001-006" isActionCell>
          row action
        </Td>
      </Tr>
      <Tr key="test002-002" isExpanded>
        <Td noPadding>
          <ExpandableRowContent>hello world</ExpandableRowContent>
        </Td>
      </Tr>
    </Tbody>
  </TableComposable>
);

CredentialsTable.propTypes = {};

CredentialsTable.defaultProps = {};

export { CredentialsTable as default, CredentialsTable };
