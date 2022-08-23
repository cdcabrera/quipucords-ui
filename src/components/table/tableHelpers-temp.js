import React from 'react';
import { SortByDirection } from '@patternfly/react-table';

const parseContent = content =>
  (React.isValidElement(content) && content) ||
  (typeof content === 'function' && content()) ||
  (typeof content === 'object' && `${content}`) ||
  content ||
  '';

const tableHeader = ({
  columnHeaders = [],
  isAllSelected = false,
  isSelectTable = false,
  isRowExpand,
  onSelect,
  onSort
} = {}) => {
  const updatedColumnHeaders = [];
  const updatedHeaderSelectProps = {};

  if (isSelectTable && typeof onSelect === 'function') {
    updatedHeaderSelectProps.onSelect = (_event, isSelected) => onSelect({ isSelected, rowIndex: -1, type: 'all' });
    updatedHeaderSelectProps.isSelected = isAllSelected;
  }

  columnHeaders.forEach((columnHeader, index) => {
    const key = `${window.btoa(columnHeader)}-${index}`;

    if (columnHeader?.content !== undefined) {
      const { isSort, isSortActive, sortDirection = SortByDirection.asc, content, ...props } = columnHeader;
      const tempColumnHeader = {
        key,
        content: parseContent(content),
        props
      };

      if (typeof onSort === 'function' && (isSort === true || isSortActive === true)) {
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
      }

      updatedColumnHeaders.push(tempColumnHeader);
    } else {
      updatedColumnHeaders.push({
        key,
        content: parseContent(columnHeader)
      });
    }
  });

  return {
    headerRow: updatedColumnHeaders,
    headerSelectProps: updatedHeaderSelectProps
  };
};

const tableRows = ({ isSelectTable = false, onExpand, onSelect, rows = [] } = {}) => {
  const updatedRows = [];
  let isExpandableRow = false;
  let isExpandableCell = false;
  let selectedRows = 0;

  rows.forEach(({ cells, isDisabled = false, isExpanded = false, isSelected = false, expandedContent, ...rowData }) => {
    const rowObj = {
      key: undefined,
      cells: [],
      select: undefined,
      expand: undefined,
      expandedContent,
      data: rowData
    };
    updatedRows.push(rowObj);
    rowObj.rowIndex = updatedRows.length - 1;
    rowObj.key = `${window.btoa(rowObj)}-${rowObj.rowIndex}`;

    if (isSelectTable && typeof onSelect === 'function') {
      const updatedIsSelected = isSelected ?? false;

      if (updatedIsSelected === true) {
        selectedRows += 1;
      }

      rowObj.select = {
        cells,
        rowIndex: rowObj.rowIndex,
        onSelect: (_event, isRowSelected) =>
          onSelect({ isSelected: isRowSelected, rowIndex: rowObj.rowIndex, type: 'row' }),
        isSelected: updatedIsSelected,
        disable: isDisabled || false
      };
    }

    if (expandedContent && typeof onExpand === 'function') {
      isExpandableRow = true;

      rowObj.expand = {
        rowIndex: rowObj.rowIndex,
        isExpanded,
        onToggle: () =>
          onExpand({
            rowIndex: rowObj.rowIndex,
            type: 'row'
          })
      };
    }

    cells?.forEach((cell, cellIndex) => {
      const cellKey = `${window.btoa(cell)}-${rowObj.rowIndex}-${cellIndex}`;
      if (cell?.content !== undefined) {
        const { className, content, dataLabel, isActionCell, noPadding, width, style, ...remainingProps } = cell;
        const cellProps = { className: className || '', dataLabel, isActionCell, noPadding, style: style || {} };
        let updatedWidthClassName;

        // FixMe: PF doesn't appear to apply cell width classNames when less than 10
        if (width < 10) {
          updatedWidthClassName = `pf-m-width-${width}`;
        }

        if (typeof width === 'string' || style) {
          cellProps.style = { ...cellProps.style, width };
        } else if (updatedWidthClassName) {
          cellProps.className = `${cellProps.className || ''} ${updatedWidthClassName}`;
        }

        if (!isExpandableRow && cell?.expandedContent && typeof onExpand === 'function') {
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

        rowObj.cells.push({ ...remainingProps, content: parseContent(content), key: cellKey, props: cellProps });
      } else {
        rowObj.cells.push({
          key: cellKey,
          content: parseContent(cell)
        });
      }
    });
  });

  return {
    isAllSelected: selectedRows === rows.length,
    isExpandableRow,
    isExpandableCell,
    rows: updatedRows
  };
};

const tableHelpers = {
  parseContent,
  tableHeader,
  tableRows
};

export { tableHelpers as default, tableHelpers, parseContent, tableHeader, tableRows };