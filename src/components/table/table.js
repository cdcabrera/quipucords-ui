import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useShallowCompareEffect } from 'react-use';
import _cloneDeep from 'lodash/cloneDeep';
import { Grid, GridItem } from '@patternfly/react-core';
import {
  ExpandableRowContent,
  SortByDirection,
  TableComposable,
  TableVariant,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@patternfly/react-table';
import { TableEmpty } from './tableEmpty';
import { tableHelpers } from './tableHelpers';

const Table = ({
  ariaLabel,
  children,
  className,
  columnHeaders,
  componentClassNames,
  isBorders,
  isHeader,
  rows,
  summary,
  variant,
  onSelect,
  onSort,
  onExpand
}) => {
  const [updatedHeaders, setUpdatedHeaders] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const [updatedHeaderSelectProps, setUpdatedHeaderSelectProps] = useState({});
  const [updatedIsExpandableRow, setUpdatedIsExpandableRow] = useState(false);
  const [updatedIsExpandableCell, setUpdatedIsExpandableCell] = useState(false);
  // const [updatedIsSortTable, setUpdatedIsSortTable] = useState(false);
  // const [updatedIsCollapsibleTable, setUpdatedIsCollapsibleTable] = useState(false);
  const [updatedIsSelectTable, setUpdatedIsSelectTable] = useState(false);

  // const [selectedRows, setSelectedRows] = useState({});
  // const [expandedRows, setExpandedRows] = useState([]);
  // const [expandedCells, setExpandedCells] = useState([]);
  // let isSelectTable = false;
  // let isExpandableCell = false;

  /**
   * Apply an onExpand handler.
   *
   * @param {object} params
   * @param {string} params.type
   * @param {number} params.rowIndex
   * @param {number} params.cellIndex
   */
  const onExpandTable = ({ type, rowIndex, cellIndex }) => {
    setUpdatedRows(value => {
      const updatedValue = [...value];

      if (type === 'row') {
        const isRowExpanded = !updatedValue[rowIndex].expand.isExpanded;

        updatedValue[rowIndex].expand.isExpanded = isRowExpanded;

        onExpand({
          type,
          rowIndex,
          cellIndex: -1,
          isExpanded: isRowExpanded,
          cells: _cloneDeep(updatedValue[rowIndex].cells)
        });

        console.log('>>>> ROW EXPAND', updatedValue[rowIndex], updatedValue);
      }

      if (type === 'compound') {
        const isCompoundExpanded = !updatedValue[rowIndex].cells[cellIndex].props.compoundExpand.isExpanded;

        updatedValue[rowIndex].cells = updatedValue[rowIndex].cells.map(({ props: cellProps, ...cell }) => {
          const updatedCompoundExpand = cellProps?.compoundExpand;

          if (updatedCompoundExpand) {
            updatedCompoundExpand.isExpanded = false;
          }

          return { ...cell, props: { ...cellProps, compoundExpand: updatedCompoundExpand } };
        });

        updatedValue[rowIndex].cells[cellIndex].props.compoundExpand.isExpanded = isCompoundExpanded;

        onExpand({
          type,
          rowIndex,
          cellIndex,
          isExpanded: isCompoundExpanded,
          cells: _cloneDeep(updatedValue[rowIndex].cells)
        });
      }

      return updatedValue;
    });
  };

  /**
   * Apply an onSelect handler.
   *
   * @param {object} params
   * @param {string} params.type
   * @param {number} params.rowIndex
   */
  const onSelectTable = ({ type, rowIndex }) => {
    if (type === 'all') {
      setUpdatedHeaderSelectProps(prevState => {
        const nextState = { ...prevState };
        const isSelected = !prevState.select.isSelected;

        nextState.select.isSelected = isSelected;

        setUpdatedRows(prevRowsState => {
          const nextRowsState = [...prevRowsState];
          nextRowsState.forEach(row => {
            const updatedRow = row;
            updatedRow.select.isSelected = isSelected;
          });

          onSelect({
            type,
            rowIndex,
            isSelected,
            rows: _cloneDeep(nextRowsState),
            cells: _cloneDeep(updatedHeaders)
          });

          return nextRowsState;
        });

        return nextState;
      });
    }

    if (type === 'row') {
      setUpdatedRows(prevState => {
        const nextState = [...prevState];
        const isSelected = !nextState[rowIndex].select.isSelected;

        nextState[rowIndex].select.isSelected = isSelected;
        const clonedRows = _cloneDeep(nextState);

        onSelect({
          type,
          rowIndex,
          isSelected,
          rows: clonedRows,
          cells: clonedRows[rowIndex].cells
        });

        return nextState;
      });
    }
  };

  /**
   * Apply an onSort handler.
   *
   * @param {object} params
   * @param {number} params.cellIndex
   * @param {string} params.direction
   * @param {number} params.originalIndex
   */
  const onSortTable = ({ cellIndex, direction, originalIndex }) => {
    setUpdatedHeaders(prevState => {
      console.log('sort table', prevState, direction, originalIndex);
      const nextState = [...prevState];

      // if (nextState[originalIndex].props.sort) {
      // nextState[originalIndex].props.sort.sortBy = {
      //  index: cellIndex,
      //  direction
      // };
      // }

      nextState.forEach((headerCell, index) => {
        const updatedHeaderCell = headerCell;
        if (updatedHeaderCell?.props?.sort) {
          const isCell = index === originalIndex;
          // updatedRow.select.isSelected = index === cellIndex;
          delete updatedHeaderCell.props.sort.sortBy.index;

          if (isCell) {
            updatedHeaderCell.props.sort.sortBy.index = cellIndex;
            updatedHeaderCell.props.sort.sortBy.direction = direction;
          }
        }
      });

      onSort({ cellIndex: originalIndex });

      return nextState;
    });
  };

  useShallowCompareEffect(() => {
    console.log('>>>> update stuff');
    const {
      allRowsSelected,
      isSelectTable: parsedIsSelectTable,
      isExpandableCell: parsedIsExpandableCell,
      isExpandableRow: parsedIsExpandableRow,
      rows: parsedRows
    } = tableHelpers.tableRows({
      onExpand: typeof onExpand === 'function' && onExpandTable,
      onSelect: typeof onSelect === 'function' && onSelectTable,
      rows
    });

    const { columnHeaders: parsedColumnHeaders, headerSelectProps } = tableHelpers.tableHeader({
      columnHeaders,
      allRowsSelected,
      onSelect: typeof onSelect === 'function' && onSelectTable,
      onSort: typeof onSort === 'function' && onSortTable
      // isSelectTable: parsedIsSelectTable
    });

    console.log('header props >>>', headerSelectProps);
    // setUpdatedIsSortableTable
    setUpdatedIsExpandableRow(parsedIsExpandableRow);
    setUpdatedIsSelectTable(parsedIsSelectTable);
    setUpdatedIsExpandableCell(parsedIsExpandableCell);
    setUpdatedRows(parsedRows);
    setUpdatedHeaders(parsedColumnHeaders);
    setUpdatedHeaderSelectProps(headerSelectProps);
  }, [columnHeaders, onExpand, onExpandTable, onSelect, onSelectTable, rows]);

  /**
   * Apply settings, return thead.
   *
   * @returns {React.ReactNode}
   */
  const renderHeader = () => {
    let selectProps = {};

    if (updatedHeaderSelectProps.select) {
      selectProps = updatedHeaderSelectProps;
    }

    console.log('updated props header >>>>>>', updatedHeaders);

    return (
      <Thead>
        <Tr>
          {updatedIsExpandableRow && <Td key="expand-th-cell" />}
          {updatedIsSelectTable && <Td key="select-th-cell" {...selectProps} />}
          {updatedHeaders.map(({ content, props, sort }) => (
            <Th key={tableHelpers.generateTableKey(content, 'th-cell')} sort={sort} {...props}>
              {content}
            </Th>
          ))}
        </Tr>
      </Thead>
    );
  };

  /**
   * Apply settings, return tbody.
   *
   * @returns {React.ReactNode}
   */
  const renderBody = () => {
    // const bodyWrapperProps =
    // (updatedIsExpandableRow && { isExpanded: updatedRows.find(row => row?.expand?.isExpanded === true) }) ||
    //  undefined;
    const BodyWrapper = ((updatedIsExpandableCell || updatedIsExpandableRow) && React.Fragment) || Tbody;

    return (
      <BodyWrapper>
        {updatedRows.map(({ cells, expand, select, expandedContent }) => {
          const expandedCell =
            (updatedIsExpandableCell && cells.find(cell => cell?.props?.compoundExpand?.isExpanded === true)) ||
            undefined;
          const expandedRow = (updatedIsExpandableRow && expand.isExpanded === true) || undefined;

          const CellWrapper = ((updatedIsExpandableCell || updatedIsExpandableRow) && Tbody) || React.Fragment;
          const cellWrapperProps =
            (updatedIsExpandableCell && { isExpanded: expandedCell?.props?.compoundExpand?.isExpanded === true }) ||
            (updatedIsExpandableRow && { isExpanded: expand?.isExpanded === true }) ||
            undefined;
          // const rowProps = (updatedIsExpandableRow && { expand }) || undefined;

          console.log('>>>>>>>>>>>>>> ROW PROPS', expand);

          return (
            <CellWrapper key={tableHelpers.generateTableKey(cells, 'parent-row')} {...cellWrapperProps}>
              <Tr key={tableHelpers.generateTableKey(cells, 'row')}>
                {expand && <Td key={tableHelpers.generateTableKey(cells, 'expand-col')} expand={expand} />}
                {select && <Td key={tableHelpers.generateTableKey(cells, 'select-col')} select={select} />}
                {cells.map(({ content, isTHeader, props: cellProps }) => {
                  const WrapperCell = (isTHeader && Th) || Td;

                  return (
                    <WrapperCell key={tableHelpers.generateTableKey(content, 'cell')} {...cellProps}>
                      {content}
                    </WrapperCell>
                  );
                })}
              </Tr>
              {updatedIsExpandableRow && expandedRow && (
                <Tr isExpanded>
                  <Td className="" colSpan={cells.length}>
                    <ExpandableRowContent>{expandedContent}</ExpandableRowContent>
                  </Td>
                </Tr>
              )}
              {updatedIsExpandableCell && expandedCell && (
                <Tr isExpanded>
                  <Td colSpan={cells.length}>
                    <ExpandableRowContent>{expandedCell.expandedContent}</ExpandableRowContent>
                  </Td>
                </Tr>
              )}
            </CellWrapper>
          );
        })}
      </BodyWrapper>
    );
  };

  /**
   * Return empty results display.
   *
   * @returns {React.ReactNode}
   */
  const renderEmpty = () => children || <TableEmpty />;

  return (
    <Grid>
      <GridItem span={12}>
        {(updatedRows?.length && (
          <TableComposable
            aria-label={ariaLabel}
            borders={isBorders}
            className={`${componentClassNames.table} ${className}`}
            summary={summary}
            variant={variant}
          >
            {isHeader && renderHeader()}
            {renderBody()}
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
        isSortActive: PropTypes.bool, // used to initialize a column... as the first sorted column
        // onSort: PropTypes.func,
        sortDirection: PropTypes.oneOf([...Object.values(SortByDirection)])
      })
    ])
  ),
  componentClassNames: PropTypes.shape({
    table: PropTypes.string,
    tr: PropTypes.string,
    td: PropTypes.string,
    trExpand: PropTypes.string,
    trExpanded: PropTypes.string,
    trExpandedContent: PropTypes.string,
    tdExpand: PropTypes.string,
    tdExpanded: PropTypes.string,
    tdExpandedContent: PropTypes.string
  }),
  isBorders: PropTypes.bool,
  isHeader: PropTypes.bool,
  // isSelected: PropTypes.bool, originally this was for selecting all rows... instead we make it a passive response in the "onSelect" user can... user should be setting every row they need
  // determine how to handle it... it'll be under type: "all"
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  onSort: PropTypes.func,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      cells: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.node,
          PropTypes.instanceOf(Date),
          PropTypes.shape({
            content: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.instanceOf(Date)]).isRequired,
            isTHeader: PropTypes.bool,
            isExpanded: PropTypes.bool,
            expandedContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
          })
        ])
      ),
      isDisabled: PropTypes.bool,
      isExpanded: PropTypes.bool,
      isSelected: PropTypes.bool,
      expandedContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    })
  ),
  summary: PropTypes.string,
  variant: PropTypes.oneOf([...Object.values(TableVariant)])
};

Table.defaultProps = {
  ariaLabel: null,
  children: null,
  className: '',
  columnHeaders: [],
  componentClassNames: {
    table: 'quipucords-table',
    tr: 'quipucords-table__tr',
    td: 'quipucords-table__td',
    trExpand: 'quipucords-table__tr-expand',
    trExpanded: 'quipucords-table__tr-expand-expanded',
    trExpandedContent: 'quipucords-table__tr-expand-content',
    tdExpand: 'quipucords-table__td-expand',
    tdExpanded: 'quipucords-table__td-expand-expanded',
    tdExpandedContent: 'quipucords-table__td-expand-content'
  },
  isBorders: true,
  isHeader: false,
  onExpand: null,
  onSelect: null,
  onSort: null,
  rows: [],
  summary: null,
  variant: TableVariant.compact
};

export { Table as default, Table };
