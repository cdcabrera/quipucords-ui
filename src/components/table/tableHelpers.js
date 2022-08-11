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

const tableHeader = (columnHeaders = [], isCollapsibleTable, isSelectTable) => {
  const updatedColumnHeaders = [];
  let isSortTable = false;

  columnHeaders.forEach((columnHeader, index) => {
    if (columnHeader?.content !== undefined) {
      const { onSort, isSortActive, sortDirection, content, ...props } = columnHeader;
      const tempColumnHeader = {
        content,
        props
      };

      if (typeof onSort === 'function') {
        isSortTable = true;
        let updatedColumnIndex = index;

        if (isCollapsibleTable) {
          updatedColumnIndex += 1;
        }

        if (isSelectTable) {
          updatedColumnIndex += 1;
        }

        tempColumnHeader.sort = {
          sortBy: {},
          onSort: (_event, _colIndex, direction) => onSort({ index: updatedColumnIndex, direction })
        };

        if (isSortActive) {
          tempColumnHeader.sort.sortBy = {
            index: updatedColumnIndex,
            direction: SortByDirection.asc
          };
        }

        if (sortDirection) {
          tempColumnHeader.sort.sortBy = { ...tempColumnHeader.sort.sortBy, direction: sortDirection };
        }
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

  return {
    columnHeaders: updatedColumnHeaders,
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
        // 'dataLabel',
        //   'select',
        //   'actions',
        //   'expand',
        //   'compoundExpand',
        //   'favorites',
        //   'treeRow',
        //   'draggableRow',
        //   'noPadding',
        //   'isActionCell',
        //   'width',
        //   'onSelect'
        // const cellProps = { width: cell?.width, dataLabel: cell?.dataLabel, noPadding: cell?.noPadding };
        // const { content, isTHeader, isExpanded, expandedContent } = cell;
        // const cellProps = { ...remainingCellProps };
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
    rows: updatedRows,
    // isCollapsibleCell,
    isExpandableCell,
    // isCollapsibleTable,
    isSelectTable
  };
};

const tableHelpers = {
  generateTableKey,
  tableHeader,
  tableRows
};

export { tableHelpers as default, tableHelpers, generateTableKey, tableHeader, tableRows };
