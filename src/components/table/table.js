import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useShallowCompareEffect } from 'react-use';
import { Grid, GridItem } from '@patternfly/react-core';
// import { TableComposable, TableVariant, Thead, Tbody, Tr, Th, Td, ExpandableRowContent } from '@patternfly/react-table';
import { SortByDirection, TableComposable, TableVariant, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { TableEmpty } from './tableEmpty';
import { tableData } from './tableHelpers';

const Table = ({ ariaLabel, children, className, columnHeaders, isBorders, isHeader, rows, summary, variant }) => {
  // const [isCollapsible, setIsCollapsible] = useState(false);
  // const [isSortable, setIsSortable] = useState(false);
  // const [isSortable, setIsSortable] = useState(false);
  const [updatedHeaders, setUpdatedHeaders] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const [updatedIsCollapsibleCell, setUpdatedIsCollapsibleCell] = useState(false);
  // const [updatedIsSortTable, setUpdatedIsSortTable] = useState(false);
  const [updatedIsCollapsibleTable, setUpdatedIsCollapsibleTable] = useState(false);
  const [updatedIsSelectTable, setUpdatedIsSelectTable] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  // const [expandedRows, setExpandedRows] = useState([]);
  // const [expandedCells, setExpandedCells] = useState([]);

  // console.log(columnHeaders, updatedHeaders, setUpdatedHeaders, setUpdatedRows);

  useShallowCompareEffect(() => {
    const {
      columnHeaders: updatedColumnHeaders,
      // isSortTable,
      rows: updatedTableRows,
      isCollapsibleCell,
      isCollapsibleTable,
      isSelectTable
    } = tableData({ columnHeaders, rows });

    setUpdatedHeaders(updatedColumnHeaders);
    // setUpdatedIsSortTable(isSortTable);
    setUpdatedIsCollapsibleCell(isCollapsibleCell);
    setUpdatedRows(updatedTableRows);
    setUpdatedIsCollapsibleTable(isCollapsibleTable);
    setUpdatedIsSelectTable(isSelectTable);
  }, [columnHeaders, rows]);

  const renderHeader = () => (
    <Thead>
      <Tr>
        {updatedIsSelectTable && <Td key="select-table-header" />}
        {updatedIsCollapsibleTable && <Td key="collapsible-table-header" aria-hidden />}
        {updatedHeaders.map(({ content, props, sort }) => (
          <Th key={window.btoa(content)} sort={sort} {...props}>
            {content}
          </Th>
        ))}
      </Tr>
    </Thead>
  );

  const renderRows = () => {
    const generatedBody = [];

    updatedRows.forEach(({ cells, expand, select }) => {
      console.log('>>>>>>>>>>>>>>', cells, expand, select, updatedIsCollapsibleCell);
      const tempRow = [];

      // cells.forEach(({ content, isTHeader, isExpanded, onExpand, expandedContent }) => {
      cells.forEach(({ content, isTHeader }) => {
        const WrapperCell = (isTHeader && Th) || Td;
        const wrapperCellProps = {};

        tempRow.push(
          <WrapperCell key={window.btoa(content)} {...wrapperCellProps}>
            {content}
          </WrapperCell>
        );
      });

      generatedBody.push(<Tr key={window.btoa(JSON.stringify(cells))}>{tempRow}</Tr>);
      // updatedIsCollapsibleCell
      /*
      const tempRow = [];
      const tempRowProps = { expand, select };

      cells.forEach(({ content, isTHeader, isExpanded, onExpand, expandedContent }) => {
        const WrapperCell = (isTHeader && Th) || Td;
        const wrapperCellProps = {};

        if (onExpand) {
          wrapperCellProps.compoundExpand = {
            isExpanded,
            onToggle: (a, b, c) => {
              console.log(a, b, c, expandedContent);
            }
          };
        }

        tempRow.push(<WrapperCell {...wrapperCellProps}>{content}</WrapperCell>);
      });

      return <Tr>{tempRow}</Tr>;
      */

      // content: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.instanceOf(Date)]).isRequired,
      //             isTHeader: PropTypes.bool,
      //             isExpanded: PropTypes.bool,
      //             onExpand: PropTypes.func,
      //             expandedContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    });

    return <Tbody>{generatedBody}</Tbody>;
  };

  const renderEmpty = () => children || <TableEmpty />;

  return (
    <Grid>
      <GridItem span={12}>
        {(updatedRows?.length && (
          <TableComposable
            aria-label={ariaLabel}
            borders={isBorders}
            className={`quipucords-table ${className}`}
            summary={summary}
            variant={variant}
          >
            {isHeader && renderHeader()}
            {renderRows()}
          </TableComposable>
        )) ||
          renderEmpty()}
      </GridItem>
    </Grid>
  );
  /*
  return  (
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
  */
};

Table.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  columnHeaders: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
      PropTypes.shape({
        content: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
        isSort: PropTypes.bool,
        onSort: PropTypes.func,
        sortDirection: PropTypes.oneOf([...Object.values(SortByDirection)])
      })
    ])
  ),
  isBorders: PropTypes.bool,
  isHeader: PropTypes.bool,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      cells: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.node,
          PropTypes.instanceOf(Date),
          PropTypes.shape({
            // cells, isDisabled = false, isExpanded, isSelected = false, onSelect, onExpand, expandedContent
            // title: PropTypes.oneOfType([PropTypes.node, PropTypes.instanceOf(Date)]).isRequired,
            content: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.instanceOf(Date)]).isRequired,
            isTHeader: PropTypes.bool,
            isExpanded: PropTypes.bool,
            onExpand: PropTypes.func,
            expandedContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
          })
        ])
      ),
      isDisabled: PropTypes.bool,
      isExpanded: PropTypes.bool,
      isSelected: PropTypes.bool,
      onSelect: PropTypes.func,
      onExpand: PropTypes.func,
      expandedContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    })
  ),
  summary: PropTypes.string,
  variant: PropTypes.oneOf([...Object.values(TableVariant)])
};

Table.defaultProps = {
  ariaLabel: null,
  children: null,
  className: null,
  columnHeaders: [],
  isBorders: true,
  isHeader: false,
  rows: [],
  summary: null,
  variant: TableVariant.compact
};

export { Table as default, Table };
