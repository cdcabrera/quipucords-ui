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
  isBorders,
  isHeader,
  rows,
  summary,
  variant,
  onSelect,
  onExpand
}) => {
  const [updatedHeaders, setUpdatedHeaders] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const [updatedHeaderSelectProps, setUpdatedHeaderSelectProps] = useState({});
  // const [updatedIsExpandableRow] = useState(false);
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
        const isSelected = !prevState.isSelected;

        nextState.isSelected = isSelected;

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
            cells: []
          });

          return nextRowsState;
        });

        return nextState;
      });

      // setUpdatedHeaderSelectProps(prevState => ({
      //         ...prevState,
      //         isSelected: !prevState.isSelected
      //       }));
      // if (type === 'all') {
      //           onSelect({
      //             type,
      //             rowIndex,
      //             // isSelected,
      //             rows: _cloneDeep(nextState[rowIndex])
      //           });
      //         }
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

  useShallowCompareEffect(() => {
    console.log('>>>> update stuff');
    const {
      allRowsSelected,
      isSelectTable: parsedIsSelectTable,
      isExpandableCell: parsedIsExpandableCell,
      rows: parsedRows
    } = tableHelpers.tableRows({
      onExpand: typeof onExpand === 'function' && onExpandTable,
      onSelect: typeof onSelect === 'function' && onSelectTable,
      rows
    });

    const { columnHeaders: parsedColumnHeaders, headerSelectProps } = tableHelpers.tableHeader({
      columnHeaders,
      allRowsSelected,
      onSelect: typeof onSelect === 'function' && onSelectTable
      // isSelectTable: parsedIsSelectTable
    });

    console.log('header props >>>', headerSelectProps);
    // setUpdatedIsSortableTable
    // setUpdatedIsExpandableRow
    setUpdatedIsSelectTable(parsedIsSelectTable);
    setUpdatedIsExpandableCell(parsedIsExpandableCell);
    setUpdatedRows(parsedRows);
    setUpdatedHeaders(parsedColumnHeaders);
    setUpdatedHeaderSelectProps(headerSelectProps);
  }, [columnHeaders, onExpand, onExpandTable, onSelect, onSelectTable, rows]);

  // {updatedIsExpandableRow && <Td key="expand-th-cell" />}
  /**
   * Apply settings, return thead.
   *
   * @returns {React.ReactNode}
   */
  const renderHeader = () => {
    let selectProps = {};

    if (updatedHeaderSelectProps.select) {
      console.log('updated select props header >>>>>>', updatedHeaderSelectProps);
      selectProps = updatedHeaderSelectProps;
    }

    return (
      <Thead>
        <Tr>
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
    const BodyWrapper = (updatedIsExpandableCell && React.Fragment) || Tbody;

    return (
      <BodyWrapper>
        {updatedRows.map(({ cells, select }) => {
          const expandedCell = cells.find(cell => cell?.props?.compoundExpand?.isExpanded === true);
          const CellWrapper = (updatedIsExpandableCell && Tbody) || React.Fragment;
          const cellWrapperProps =
            (updatedIsExpandableCell && { isExpanded: expandedCell?.props?.compoundExpand?.isExpanded === true }) ||
            undefined;

          return (
            <CellWrapper key={tableHelpers.generateTableKey(cells, 'parent-row')} {...cellWrapperProps}>
              <Tr key={tableHelpers.generateTableKey(cells, 'row')}>
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
            className={className}
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
        onSort: PropTypes.func,
        sortDirection: PropTypes.oneOf([...Object.values(SortByDirection)])
      })
    ])
  ),
  isBorders: PropTypes.bool,
  isHeader: PropTypes.bool,
  // isSelected: PropTypes.bool, originally this was for selecting all rows... instead we make it a passive response in the "onSelect" user can... user should be setting every row they need
  // determine how to handle it... it'll be under type: "all"
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
  className: 'quipucords-table',
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
