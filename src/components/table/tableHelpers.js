import React from 'react';
import { SortByDirection } from '@patternfly/react-table';
import { helpers } from '../../common';

const tableKeyCache = {};
/*
const TdProps = [
  'dataLabel',
  'select',
  'actions',
  'expand',
  'compoundExpand',
  'favorites',
  'treeRow',
  'draggableRow',
  'noPadding',
  'isActionCell',
  'width',
  'onSelect'
];
*/

const generateTableKey = (value, prefix = 'table') => {
  let updatedValue = helpers.generateId();

  if (value === undefined || value === null || Number.isNaN(value)) {
    return `${prefix}-${updatedValue}`;
  }

  switch (typeof value) {
    case 'string':
      updatedValue = value;
      break;
    case 'object':
      try {
        updatedValue = JSON.stringify(value);
      } catch (e) {
        //
      }
      break;
    default:
      updatedValue = value.toString();
  }

  let key = `${prefix}-${updatedValue}`;

  if (tableKeyCache[key]) {
    key = helpers.generateId();
  }

  tableKeyCache[key] = true;

  return key;
};

const tableHeader = ({ allRowsSelected = false, columnHeaders = [], isRowExpand, onSelect, onSort } = {}) => {
  const updatedColumnHeaders = [];
  const updatedHeaderSelectProps = {};
  const isSelectTable = typeof onSelect === 'function';
  let isSortTable = false;

  if (isSelectTable) {
    updatedHeaderSelectProps.select = {
      onSelect: () => onSelect({ rowIndex: -1, type: 'all' }),
      isSelected: allRowsSelected
    };
  }

  columnHeaders.forEach((columnHeader, index) => {
    if (columnHeader?.content !== undefined) {
      const { isSort, isSortActive, sortDirection = SortByDirection.asc, content, ...props } = columnHeader;
      const tempColumnHeader = {
        content,
        props
      };

      console.log('>>>>>>>>>>>>> ONSORT 001', onSort);

      if (typeof onSort === 'function' && (isSort === true || isSortActive === true)) {
        isSortTable = true;
        let updatedColumnIndex = index;

        if (isRowExpand) {
          updatedColumnIndex += 1;
        }

        if (isSelectTable) {
          updatedColumnIndex += 1;
        }

        tempColumnHeader.props.sort = {
          columnIndex: updatedColumnIndex,
          sortBy: {},
          onSort: (_event, _colIndex, direction) =>
            onSort({ cellIndex: updatedColumnIndex, direction, originalIndex: index })
        };

        if (isSortActive) {
          tempColumnHeader.props.sort.sortBy.index = updatedColumnIndex;
        }

        tempColumnHeader.props.sort.sortBy.direction = sortDirection;

        console.log('>>>>>>>>>>>>> ONSORT 002', tempColumnHeader.props);
      }

      updatedColumnHeaders.push(tempColumnHeader);
    } else {
      updatedColumnHeaders.push({
        content:
          (React.isValidElement(columnHeader) && columnHeader) ||
          (typeof columnHeader === 'function' && columnHeader()) ||
          (typeof columnHeader === 'object' && `${columnHeader}`) ||
          columnHeader
      });
    }
  });

  console.log('>>>>>>>>>>>> header', updatedHeaderSelectProps);

  return {
    columnHeaders: updatedColumnHeaders,
    headerSelectProps: updatedHeaderSelectProps,
    isSortTable
  };
};

const tableRows = ({ onExpand, onSelect, rows = [] } = {}) => {
  const updatedRows = [];
  // const updateSelectedRows = new Set();
  // let isCollapsibleTable = false;
  // const isCollapsibleCell = false;
  let isExpandableCell = false;
  let isSelectTable = false;
  let selectedRows = 0;

  // rows.forEach(({ cells, isDisabled = false, isExpanded, isSelected = false, expandedContent }) => {
  rows.forEach(({ cells, isDisabled = false, isSelected = false }) => {
    const rowObj = {
      cells: [],
      select: undefined,
      expand: undefined
    };
    updatedRows.push(rowObj);
    rowObj.rowIndex = updatedRows.length - 1;

    if (typeof onSelect === 'function') {
      const updatedIsSelected = isSelected ?? false;

      if (updatedIsSelected === true) {
        selectedRows += 1;
      }

      isSelectTable = true;
      rowObj.select = {
        cells,
        rowIndex: rowObj.rowIndex,
        onSelect: () => onSelect({ rowIndex: rowObj.rowIndex, type: 'row' }),
        isSelected: updatedIsSelected,
        disable: isDisabled || false
      };
    }

    cells.forEach((cell, cellIndex) => {
      if (cell?.content !== undefined) {
        const { dataLabel, noPadding, width, ...remainingProps } = cell;
        const cellProps = { dataLabel, noPadding, width };

        if (cell?.expandedContent) {
          isExpandableCell = true;
          const updateIsExpanded = cell?.isExpanded ?? false;

          cellProps.compoundExpand = {
            isExpanded: updateIsExpanded,
            onToggle: () =>
              onExpand({
                rowIndex: rowObj.rowIndex,
                cellIndex,
                type: 'compound'
              })
          };
        }

        rowObj.cells.push({ ...remainingProps, props: cellProps });
      } else {
        rowObj.cells.push({
          content:
            (React.isValidElement(cell) && cell) ||
            (typeof cell === 'function' && cell()) ||
            (typeof cell === 'object' && `${cell}`) ||
            cell
        });
      }
    });
  });

  return {
    // selectedRows: updateSelectedRows,
    allRowsSelected: selectedRows === rows.length,
    // isCollapsibleCell,
    isExpandableCell,
    // isCollapsibleTable,
    isSelectTable,
    rows: updatedRows
  };
};

const tableHelpers = {
  generateTableKey,
  tableHeader,
  tableRows
};

export { tableHelpers as default, tableHelpers, generateTableKey, tableHeader, tableRows };
