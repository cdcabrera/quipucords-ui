import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useShallowCompareEffect, useDeepCompareEffect } from 'react-use';
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
import _isEqual from 'lodash/isEqual';
import { TableEmpty } from './tableEmpty';
import { tableHelpers } from './tableHelpers';

// const tableFuncCache = {
// selected: {},
// expanded: {}
// };

/**
 * A PF Composable table wrapper
 *
 * @param {object} props
 * @param {string} props.ariaLabel
 * @param {React.ReactNode} props.children
 * @param {string} props.className
 * @param {Array} props.columnHeaders
 * @param {object} props.componentClassNames
 * @param {boolean} props.isBorders
 * @param {boolean} props.isHeader
 * @param {Function} props.onSelect
 * @param {Function} props.onSort
 * @param {Function} props.onExpand
 * @param {Array} props.rows
 * @param {string} props.summary
 * @param {string} props.variant
 * @returns {React.ReactNode}
 */
const Table = ({
  ariaLabel,
  children,
  className,
  columnHeaders,
  componentClassNames,
  isBorders,
  isHeader,
  onSelect,
  onSort,
  onExpand,
  rows,
  summary,
  variant
}) => {
  const [updatedHeaders, setUpdatedHeaders] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const [updatedHeaderSelectProps, setUpdatedHeaderSelectProps] = useState({});
  const [updatedIsExpandableRow, setUpdatedIsExpandableRow] = useState(false);
  const [updatedIsExpandableCell, setUpdatedIsExpandableCell] = useState(false);
  const [updatedIsSelectTable, setUpdatedIsSelectTable] = useState(false);

  /**
   * Apply an onExpand handler.
   *
   * @param {object} params
   * @param {string} params.type
   * @param {number} params.rowIndex
   * @param {number} params.cellIndex
   */
  const onExpandTable = ({ type, rowIndex, cellIndex } = {}) => {
    const isCallback = typeof onExpand === 'function';
    setUpdatedRows(value => {
      const updatedValue = [...value];

      if (type === 'row') {
        const isRowExpanded = !updatedValue[rowIndex].expand.isExpanded;

        updatedValue[rowIndex].expand.isExpanded = isRowExpanded;
        const clonedRow = _cloneDeep(updatedValue[rowIndex]);

        if (isCallback) {
          // FixMe: quick fix work-around for allowing internal set state WITH external props updates
          window.setTimeout(() =>
            onExpand({
              type,
              rowIndex,
              cellIndex: -1,
              isExpanded: isRowExpanded,
              data: clonedRow.data,
              cells: clonedRow.cells
            })
          );
        }
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
        const clonedRow = _cloneDeep(updatedValue[rowIndex]);

        if (isCallback) {
          // FixMe: quick fix work-around for allowing internal set state WITH external props updates
          window.setTimeout(() =>
            onExpand({
              type,
              rowIndex,
              cellIndex,
              isExpanded: isCompoundExpanded,
              data: clonedRow.data,
              cells: clonedRow.cells
            })
          );
        }
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
  const onSelectTable = ({ type, rowIndex } = {}) => {
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

          const clonedRows = _cloneDeep(nextRowsState);

          // FixMe: quick fix work-around for allowing internal set state WITH external props updates
          window.setTimeout(() =>
            onSelect({
              type,
              rowIndex,
              isSelected,
              rows: clonedRows,
              selectedRows: clonedRows,
              data: clonedRows.map(({ data }) => data || {}),
              cells: _cloneDeep(updatedHeaders)
            })
          );

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

        // FixMe: quick fix work-around for allowing internal set state WITH external props updates
        window.setTimeout(() =>
          onSelect({
            type,
            rowIndex,
            isSelected,
            rows: clonedRows,
            selectedRows: clonedRows.filter(row => row.select.isSelected === true),
            data: clonedRows[rowIndex].data,
            cells: clonedRows[rowIndex].cells
          })
        );

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
  const onSortTable = ({ cellIndex, direction, originalIndex } = {}) => {
    setUpdatedHeaders(prevState => {
      const nextState = [...prevState];

      nextState.forEach((headerCell, index) => {
        const updatedHeaderCell = headerCell;
        if (updatedHeaderCell?.props?.sort) {
          const isCell = index === originalIndex;
          delete updatedHeaderCell.props.sort.sortBy.index;

          if (isCell) {
            updatedHeaderCell.props.sort.sortBy.index = cellIndex;
            updatedHeaderCell.props.sort.sortBy.direction = direction;
          }
        }
      });

      const clonedRow = _cloneDeep(nextState);

      // FixMe: quick fix work-around for allowing internal set state WITH external props updates
      window.setTimeout(() =>
        onSort({
          cellIndex: originalIndex,
          direction,
          cell: clonedRow[originalIndex],
          cells: clonedRow
        })
      );

      return nextState;
    });
  };

  useShallowCompareEffect(() => {
    const {
      allRowsSelected,
      isSelectTable: parsedIsSelectTable,
      isExpandableCell: parsedIsExpandableCell,
      isExpandableRow: parsedIsExpandableRow,
      rows: parsedRows
    } = tableHelpers.tableRows({
      onExpand: onExpandTable,
      onSelect: typeof onSelect === 'function' && onSelectTable,
      rows
    });

    const { columnHeaders: parsedColumnHeaders, headerSelectProps } = tableHelpers.tableHeader({
      columnHeaders,
      allRowsSelected,
      onSelect: typeof onSelect === 'function' && onSelectTable,
      onSort: typeof onSort === 'function' && onSortTable
    });

    setUpdatedIsExpandableRow(parsedIsExpandableRow);
    setUpdatedIsSelectTable(parsedIsSelectTable);
    setUpdatedIsExpandableCell(parsedIsExpandableCell);

    if (!_isEqual(parsedRows, updatedRows)) {
      setUpdatedRows(parsedRows);
    }

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

    return (
      <Thead>
        <Tr className={componentClassNames.tr}>
          {updatedIsExpandableRow && <Td className={componentClassNames.th} key="expand-th-cell" />}
          {updatedIsSelectTable && (
            <Td
              className={`${componentClassNames.th} ${componentClassNames.tdSelect}`}
              key="select-th-cell"
              {...selectProps}
            />
          )}
          {updatedHeaders.map(({ key: cellKey, content, props, sort }) => (
            <Th className={componentClassNames.th} key={cellKey} sort={sort} {...props}>
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
    const BodyWrapper = ((updatedIsExpandableCell || updatedIsExpandableRow) && React.Fragment) || Tbody;

    return (
      <BodyWrapper>
        {updatedRows.map(({ key: rowKey, cells, expand, select, expandedContent }) => {
          const expandedCell =
            (updatedIsExpandableCell && cells.find(cell => cell?.props?.compoundExpand?.isExpanded === true)) ||
            undefined;
          // const expandedCellIndex = (updatedIsExpandableCell && cells.indexOf(expandedCell)) || undefined;
          const expandedRow = (updatedIsExpandableRow && expand?.isExpanded === true) || undefined;

          const CellWrapper = ((updatedIsExpandableCell || updatedIsExpandableRow) && Tbody) || React.Fragment;
          const cellWrapperProps =
            (updatedIsExpandableCell && { isExpanded: expandedCell?.props?.compoundExpand?.isExpanded === true }) ||
            (updatedIsExpandableRow && { isExpanded: expand?.isExpanded === true }) ||
            undefined;

          /*
          let tempExpandedCell;

          if (!tableFuncCache[expandedCellIndex]) {
            tableFuncCache[expandedCellIndex] = {};
          }

          if (expandedCell) {
            console.log('table func cache', tableFuncCache[expandedCellIndex]);
            tempExpandedCell =
              (typeof expandedCell.expandedContent === 'function' && expandedCell.expandedContent()) ||
              expandedCell.expandedContent;

            if (!tableFuncCache[expandedCellIndex][tempExpandedCell]) {
              tableFuncCache[expandedCellIndex][tempExpandedCell] = tempExpandedCell;
            }
          }
          */

          return (
            <CellWrapper key={`${rowKey}-parent-row`} {...cellWrapperProps}>
              <Tr className={componentClassNames.tr} key={`${rowKey}-row`}>
                {expand && (
                  <Td
                    className={`${componentClassNames.td} ${componentClassNames.tdExpand}`}
                    key={`${rowKey}-expand-col`}
                    expand={expand}
                  />
                )}
                {select && (
                  <Td
                    className={`${componentClassNames.td} ${componentClassNames.tdSelect}`}
                    key={`${rowKey}-select-col`}
                    select={select}
                  />
                )}
                {cells.map(({ key: cellKey, content, isTHeader, props: cellProps }) => {
                  const WrapperCell = (isTHeader && Th) || Td;

                  return (
                    <WrapperCell
                      key={cellKey}
                      {...cellProps}
                      className={`${cellProps.className} ${componentClassNames.td} ${
                        (cellProps.isActionCell && componentClassNames.tdAction) || ''
                      }`}
                    >
                      {content}
                    </WrapperCell>
                  );
                })}
              </Tr>
              {updatedIsExpandableRow && expandedRow && (
                <Tr className={componentClassNames.tr} isExpanded key={`${rowKey}-expandedrow`}>
                  <Td
                    className={`${componentClassNames.td} ${componentClassNames.tdExpanded} ${componentClassNames.tdExpandedWrapper}`}
                    colSpan={cells.length + ((expand && 1) || 0) + ((select && 1) || 0)}
                  >
                    <div className={componentClassNames.tdExpandedContent}>
                      <ExpandableRowContent>{expandedContent}</ExpandableRowContent>
                    </div>
                  </Td>
                </Tr>
              )}
              {updatedIsExpandableCell && expandedCell && (
                <Tr className={componentClassNames.tr} isExpanded key={`${rowKey}-expandedcol`}>
                  <Td
                    className={`${componentClassNames.td} ${componentClassNames.tdExpanded} ${componentClassNames.tdExpandedWrapper}`}
                    colSpan={cells.length + ((expand && 1) || 0) + ((select && 1) || 0)}
                  >
                    <div className={componentClassNames.tdExpandedContent}>
                      <ExpandableRowContent>
                        {(typeof expandedCell.expandedContent === 'function' && expandedCell.expandedContent()) ||
                          expandedCell.expandedContent}
                      </ExpandableRowContent>
                    </div>
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

/**
 * Prop types
 *
 * @type {{componentClassNames: object, summary: string, onSort: Function, onExpand: Function, className: string, rows: Array,
 *     isBorders: boolean, ariaLabel: string, onSelect: Function, columnHeaders: Array, children: React.ReactNode, isHeader: boolean,
 *     variant: string}}
 */
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
        isSortActive: PropTypes.bool,
        sortDirection: PropTypes.oneOf([...Object.values(SortByDirection)])
      })
    ])
  ),
  componentClassNames: PropTypes.shape({
    table: PropTypes.string,
    td: PropTypes.string,
    tdAction: PropTypes.string,
    tdSelect: PropTypes.string,
    th: PropTypes.string,
    tr: PropTypes.string,
    trExpand: PropTypes.string,
    trExpanded: PropTypes.string,
    trExpandedContent: PropTypes.string,
    tdExpand: PropTypes.string,
    tdExpanded: PropTypes.string,
    tdExpandedWrapper: PropTypes.string,
    tdExpandedContent: PropTypes.string
  }),
  isBorders: PropTypes.bool,
  isHeader: PropTypes.bool,
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

/**
 * Default props
 *
 * @type {{componentClassNames: {td: string, trExpanded: string, tdExpanded: string, th: string, trExpand: string,
 *     trExpandedContent: string, tdExpandedContent: string, table: string, tr: string, tdExpand: string}, summary: null,
 *     onSort: null, onExpand: null, className: string, rows: *[], isBorders: boolean, ariaLabel: null, onSelect: null,
 *     columnHeaders: *[], children: null, isHeader: boolean, variant: TableVariant.compact}}
 */
Table.defaultProps = {
  ariaLabel: null,
  children: null,
  className: '',
  columnHeaders: [],
  componentClassNames: {
    table: 'quipucords-table',
    td: 'quipucords-table__td',
    tdAction: 'quipucords-table__td-action',
    tdSelect: 'quipucords-table__td-select',
    th: 'quipucords-table__th',
    tr: 'quipucords-table__tr',
    trExpand: 'quipucords-table__tr-expand',
    trExpanded: 'quipucords-table__tr-expand-expanded',
    trExpandedContent: 'quipucords-table__tr-expand-content',
    tdExpand: 'quipucords-table__td-expand',
    tdExpanded: 'quipucords-table__td-expand-expanded',
    tdExpandedWrapper: 'quipucords-table__td-expand-wrapper',
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
