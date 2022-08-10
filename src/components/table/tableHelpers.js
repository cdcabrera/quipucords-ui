import React from 'react';
import { SortByDirection } from '@patternfly/react-table';

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
        const cellProps = {};

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

        rowObj.cells.push({ ...cell, ...cellProps });
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
  tableHeader,
  tableRows
};

export { tableHelpers as default, tableHelpers, tableHeader, tableRows };
