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
      const isExpanded = !updatedValue[rowIndex].cells[cellIndex].compoundExpand.isExpanded;

      updatedValue[rowIndex].cells[cellIndex].compoundExpand.isExpanded = isExpanded;
      onExpand({ type, rowIndex, cellIndex, isExpanded, cells: _cloneDeep(updatedValue[rowIndex].cells) });

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
    setUpdatedRows(value => {
      const updatedValue = [...value];
      const isSelected = !updatedValue[rowIndex].select.isSelected;

      updatedValue[rowIndex].select.isSelected = isSelected;
      onSelect({ type, rowIndex, isSelected, cells: _cloneDeep(updatedValue[rowIndex].cells) });

      return updatedValue;
    });
  };

  useShallowCompareEffect(() => {
    console.log('>>>> update stuff');
    const {
      isSelectTable: parsedIsSelectTable,
      isExpandableCell: parsedIsExpandableCell,
      rows: parsedRows
    } = tableRows({
      onExpand: typeof onExpand === 'function' && onExpandTable,
      onSelect: typeof onSelect === 'function' && onSelectTable,
      rows
    });

    // setUpdatedIsSortableTable
    // setUpdatedIsExpandableRow
    setUpdatedIsSelectTable(parsedIsSelectTable);
    setUpdatedIsExpandableCell(parsedIsExpandableCell);
    setUpdatedRows(parsedRows);
  }, [columnHeaders, onExpand, onExpandTable, onSelect, onSelectTable, rows]);

  // {isExpandTable && <Td key="expand-th-cell" />}
  /**
   * Apply settings, return thead.
   *
   * @returns {React.ReactNode}
   */
  const renderHeader = () => (
    <Thead>
      <Tr>
        {updatedIsSelectTable && <Td key="select-th-cell" />}
        {updatedHeaders.map(({ content, props, sort }) => (
          <Th key={`th-cell-${window.btoa(content)}`} sort={sort} {...props}>
            {content}
          </Th>
        ))}
      </Tr>
    </Thead>
  );

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
          const expandedCell = cells.find(cell => cell?.compoundExpand?.isExpanded === true);

          const CellWrapper = (updatedIsExpandableCell && Tbody) || React.Fragment;
          const cellWrapperProps =
            (updatedIsExpandableCell && { isExpanded: expandedCell?.compoundExpand?.isExpanded === true }) || undefined;

          return (
            <CellWrapper key={`parent-row-${window.btoa(JSON.stringify(cells))}`} {...cellWrapperProps}>
              <Tr key={`row-${window.btoa(JSON.stringify(cells))}`}>
                {select && <Td key={`row-${window.btoa(JSON.stringify(cells))}`} select={select} />}
                {cells.map(({ content, compoundExpand, isTHeader }) => {
                  const WrapperCell = (isTHeader && Th) || Td;
                  const wrapperCellProps = {};

                  if (compoundExpand) {
                    wrapperCellProps.compoundExpand = compoundExpand;
                    console.log('>>>>>>>>> CELL', compoundExpand);
                  }

                  return (
                    <WrapperCell key={window.btoa(content)} {...wrapperCellProps}>
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
  // isSelected: PropTypes.bool, originally this was for selecting all rows... instead we make it a passive response in the "onSelect" user can
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
