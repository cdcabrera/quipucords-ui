import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useShallowCompareEffect } from 'react-use';
// import _cloneDeep from 'lodash/cloneDeep';
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
// import _isEqual from 'lodash/isEqual';
import { TableEmpty } from './tableEmpty';
import { tableHelpers } from './tableHelpers-temp';

/**
 * FixMe: PF bug for select column. PF requires a Th used for select field in the primary Thead...
 * but only a partially working Td. Any attempt to update the Td isSelected prop is met with a
 * non-functioning field, hair pulling, and the question "is my state working?"... it is, PF is
 * the problem, and this is a bug. PF should allow both Td and Th equally for the Thead select
 * options. HTML markup allows the use of both td and th within thead and tbody, not every cell
 * in a thead requires the use of th.
 *
 * @param root0
 * @param root0.ariaLabel
 * @param root0.children
 * @param root0.className
 * @param root0.columnHeaders
 * @param root0.componentClassNames
 * @param root0.isBorders
 * @param root0.isHeader
 * @param root0.onSelect
 * @param root0.onSort
 * @param root0.onExpand
 * @param root0.rows
 * @param root0.summary
 * @param root0.variant
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
  const [updatedHeaderAndRows, setUpdatedHeaderAndRows] = useState({});
  // const [updatedHeaderSelectProps, setUpdatedHeaderSelectProps] = useState({});
  // const [updatedIsAllSelected, setUpdatedIsAllSelected] = useState(false);
  const [updatedIsExpandableRow, setUpdatedIsExpandableRow] = useState(false);
  const [updatedIsExpandableCell, setUpdatedIsExpandableCell] = useState(false);
  const [updatedIsSelectTable, setUpdatedIsSelectTable] = useState(false);

  const onExpandTable = ({ type, rowIndex, cellIndex } = {}) => {
    const isCallback = typeof onExpand === 'function';
    console.log('on expand table', isCallback, type, rowIndex, cellIndex);
  };

  const onSelectTable = ({ type, isSelected, rowIndex } = {}) => {
    if (type === 'all') {
      setUpdatedHeaderAndRows(prevState => {
        const nextBodyRows = prevState.bodyRows?.map(row => ({
          ...row,
          select: { ...row.select, isSelected }
        }));

        const nextHeaderSelectProps = prevState.headerSelectProps;
        nextHeaderSelectProps.isSelected = isSelected;

        return {
          ...prevState,
          bodyRows: nextBodyRows,
          headerSelectProps: nextHeaderSelectProps
        };
      });
    } else {
      setUpdatedHeaderAndRows(prevState => {
        const nextBodyRows = prevState.bodyRows?.map(row => row);
        nextBodyRows[rowIndex].select.isSelected = isSelected;

        const nextHeaderSelectProps = prevState.headerSelectProps;
        nextHeaderSelectProps.isSelected =
          nextBodyRows.filter(row => row.select.isSelected === true).length === nextBodyRows.length;

        return {
          ...prevState,
          bodyRows: nextBodyRows,
          headerSelectProps: nextHeaderSelectProps
        };
      });
    }

    if (typeof onSelect === 'function') {
      // onSelect({ type, isSelected, rowIndex });
    }
  };

  const onSortTable = ({ cellIndex, direction, originalIndex } = {}) => {
    const isCallback = typeof onSort === 'function';
    console.log('sort table', isCallback, cellIndex, direction, originalIndex);
  };

  useShallowCompareEffect(() => {
    const isSelectTable = typeof onSelect === 'function';

    const {
      isAllSelected: parsedIsAllSelected,
      isExpandableCell: parsedIsExpandableCell,
      isExpandableRow: parsedIsExpandableRow,
      rows: parsedRows
    } = tableHelpers.tableRows({
      isSelectTable,
      onExpand: onExpandTable,
      onSelect: onSelectTable,
      rows
    });

    const { headerRow: parsedHeaderRow, headerSelectProps: parsedHeaderSelectProps } = tableHelpers.tableHeader({
      columnHeaders,
      isAllSelected: parsedIsAllSelected,
      isSelectTable,
      onSelect: onSelectTable,
      onSort: onSortTable
    });

    setUpdatedIsExpandableRow(parsedIsExpandableRow);
    setUpdatedIsSelectTable(isSelectTable);
    setUpdatedIsExpandableCell(parsedIsExpandableCell);

    setUpdatedHeaderAndRows({
      headerRow: parsedHeaderRow,
      bodyRows: parsedRows,
      headerSelectProps: parsedHeaderSelectProps
    });
  }, [columnHeaders, onExpand, onExpandTable, onSelect, onSelectTable, rows]);

  const renderHeader = () => (
    <Thead>
      <Tr className={componentClassNames.tr}>
        {updatedIsExpandableRow && <Td className={componentClassNames.th} key="expand-th-cell" />}
        {updatedIsSelectTable && (
          <Th
            key="select-cell"
            className={`${componentClassNames.th} ${componentClassNames.tdSelect}`}
            select={updatedHeaderAndRows.headerSelectProps}
          />
        )}
        {updatedHeaderAndRows?.headerRow.map(({ key: cellKey, content, props, sort }) => (
          <Th className={componentClassNames.th} key={cellKey} sort={sort} {...props}>
            {content}
          </Th>
        ))}
      </Tr>
    </Thead>
  );

  const renderBody = () => {
    const BodyWrapper = ((updatedIsExpandableCell || updatedIsExpandableRow) && React.Fragment) || Tbody;

    return (
      <BodyWrapper>
        {updatedHeaderAndRows?.bodyRows?.map(({ key: rowKey, cells, expand, select, expandedContent }) => {
          const expandedCell =
            (updatedIsExpandableCell && cells.find(cell => cell?.props?.compoundExpand?.isExpanded === true)) ||
            undefined;
          const expandedRow = (updatedIsExpandableRow && expand?.isExpanded === true) || undefined;

          const CellWrapper = ((updatedIsExpandableCell || updatedIsExpandableRow) && Tbody) || React.Fragment;
          const cellWrapperProps =
            (updatedIsExpandableCell && { isExpanded: expandedCell?.props?.compoundExpand?.isExpanded === true }) ||
            (updatedIsExpandableRow && { isExpanded: expand?.isExpanded === true }) ||
            undefined;

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
                {cells.map(({ key: cellKey, content, isTHeader, props: cellProps = {} }) => {
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

  const renderEmpty = () => children || <TableEmpty />;

  return (
    <Grid>
      <GridItem span={12}>
        {(updatedHeaderAndRows?.bodyRows?.length && (
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
