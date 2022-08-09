import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useShallowCompareEffect } from 'react-use';
import { Grid, GridItem } from '@patternfly/react-core';
// import { TableComposable, TableVariant, Thead, Tbody, Tr, Th, Td, ExpandableRowContent } from '@patternfly/react-table';
import { SortByDirection, TableComposable, TableVariant, Tbody, Thead, Tr, Th, Td } from '@patternfly/react-table';
import { TableEmpty } from './tableEmpty';
import { tableRows } from './tableHelpers';

const Table = ({
  ariaLabel,
  children,
  className,
  columnHeaders,
  isBorders,
  isHeader,
  rows,
  summary,
  variant,
  onSelect,
  onExpand
}) => {
  // const [updatedHeaders, setUpdatedHeaders] = useState([]);
  const [updatedHeaders] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  // const [updatedIsCollapsibleCell, setUpdatedIsCollapsibleCell] = useState(false);
  // const [updatedIsSortTable, setUpdatedIsSortTable] = useState(false);
  // const [updatedIsCollapsibleTable, setUpdatedIsCollapsibleTable] = useState(false);
  // const [updatedIsSelectTable, setUpdatedIsSelectTable] = useState(false);

  const [selectedRows, setSelectedRows] = useState({});
  // const [expandedRows, setExpandedRows] = useState([]);
  // const [expandedCells, setExpandedCells] = useState([]);
  let isSelectTable = false;

  const onExpandTable =
    typeof onExpand === 'function'
      ? ({ rowIndex, isSelected, cells }) => {
          console.log('expanded', rowIndex, isSelected, cells);
          onExpand();
        }
      : undefined;

  const onSelectTable =
    typeof onSelect === 'function'
      ? ({ rowIndex, isSelected, cells }) => {
          console.log('selected', rowIndex, isSelected, cells);
          // setSelectedRows(selectedRows.add(rowIndex));
          selectedRows[rowIndex] = isSelected;
          setSelectedRows(selectedRows);
          onSelect();
        }
      : undefined;

  useShallowCompareEffect(() => {
    console.log('>>>> update stuff');
    const { isSelectTable: parsedIsSelectTable, rows: parsedRows } = tableRows({
      onExpand: onExpandTable,
      onSelect: onSelectTable,
      rows,
      selectedRows
    });

    isSelectTable = parsedIsSelectTable;
    setUpdatedRows(parsedRows);
    // setUpdatedIsSelectTable(isSelectTable);
  }, [columnHeaders, rows, selectedRows]);

  const renderHeader = () => (
    <Thead>
      <Tr>
        {isSelectTable && <Td key="select-th-cell" />}
        {updatedHeaders.map(({ content, props, sort }) => (
          <Th key={`th-cell-${window.btoa(content)}`} sort={sort} {...props}>
            {content}
          </Th>
        ))}
      </Tr>
    </Thead>
  );

  const renderRows = () => (
    <Tbody>
      {updatedRows.map(({ cells, select }) => (
        <Tr key={`row-${window.btoa(JSON.stringify(cells))}`}>
          {select && <Td key={`row-${window.btoa(JSON.stringify(cells))}`} select={select} />}
          {cells.map(({ content, isTHeader }) => {
            const WrapperCell = (isTHeader && Th) || Td;
            const wrapperCellProps = {};

            return (
              <WrapperCell key={window.btoa(content)} {...wrapperCellProps}>
                {content}
              </WrapperCell>
            );
          })}
        </Tr>
      ))}
    </Tbody>
  );

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
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
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
            // onExpand: PropTypes.func,
            expandedContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
          })
        ])
      ),
      isDisabled: PropTypes.bool,
      isExpanded: PropTypes.bool,
      isSelected: PropTypes.bool,
      // onSelect: PropTypes.func,
      // onExpand: PropTypes.func,
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
  onExpand: null,
  onSelect: null,
  rows: [],
  summary: null,
  variant: TableVariant.compact
};

export { Table as default, Table };
