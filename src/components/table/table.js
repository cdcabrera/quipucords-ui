import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useShallowCompareEffect } from 'react-use';
// import _cloneDeep from 'lodash/cloneDeep';
import { Grid, GridItem } from '@patternfly/react-core';
// import { TableComposable, TableVariant, Thead, Tbody, Tr, Th, Td, ExpandableRowContent } from '@patternfly/react-table';
import { SortByDirection, TableComposable, TableVariant, Tbody, Thead, Tr, Th, Td } from '@patternfly/react-table';
// import _cloneDeep from 'lodash/cloneDeep';
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

  // const [selectedRows, setSelectedRows] = useState({});
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

  /*
  const selectTable = useCallback(
    ({ rowIndex, isSelected, cells } = {}) => {
      if (updatedRows.length && updatedRows[rowIndex]) {
        console.log('selected >>>>>', updatedRows[rowIndex]);
        updatedRows[rowIndex].select.isSelected = isSelected;
        setUpdatedRows(updatedRows);
        onSelect({ rowIndex, isSelected, cells });
      }
    },
    [onSelect, updatedRows]
  );
   */

  // const onSelectTable = selectTable();
  // const onSelectTable = typeof onSelect === 'function' ? (...args) => selectTable(...args) : undefined;
  /*
  const onSelectTable =
    typeof onSelect === 'function'
      ? ({ rowIndex, isSelected }) => {
          window.setTimeout(() => {
            updatedRows[rowIndex].select.isSelected = isSelected;
            setUpdatedRows([...updatedRows]);

            console.log('selected >>>>>', updatedRows[rowIndex]);
          });
        }
      : undefined;
  */
  /*
  const onSelectTable = ({ rowIndex, isSelected, cells, parsedRows }) => {
    const update = parsedRows;
    update[rowIndex].select.isSelected = isSelected;
    setUpdatedRows(update);

    console.log('selected >>>>>', update);

    onSelect({ rowIndex, isSelected, cells });
  };
  */
  const onSelectTable = ({ rowIndex, isSelected, cells }) => {
    setUpdatedRows(arr => {
      const updatedArr = [...arr];
      updatedArr[rowIndex].select.isSelected = isSelected;
      return updatedArr;
    });

    onSelect({ rowIndex, isSelected, cells });
  };
  /*
  const onSelectTable =
    typeof onSelect === 'function'
      ? ({ rowIndex, isSelected, cells }) => {
          // console.log('selected', rowIndex, isSelected, cells);
          console.log('selected >>>>>', updatedRows[rowIndex]);
          // setSelectedRows(selectedRows.add(rowIndex));
          // selectedRows[rowIndex] = !isSelected;
          // setSelectedRows(selectedRows);
          // if (updatedRows[rowIndex]?.select) {
          const tempRows = _cloneDeep(updatedRows);
          tempRows[rowIndex].select.isSelected = isSelected;
          setUpdatedRows(tempRows);
          onSelect({ rowIndex, isSelected, cells });
          // }
        }
      : undefined;
  */

  useShallowCompareEffect(() => {
    console.log('>>>> update stuff');
    const { isSelectTable: parsedIsSelectTable, rows: parsedRows } = tableRows({
      onExpand: onExpandTable,
      onSelect: typeof onSelect === 'function' && onSelectTable,
      rows
      // selectedRows: {}
    });

    isSelectTable = parsedIsSelectTable; // eslint-disable-line
    setUpdatedRows(parsedRows);
    // setUpdatedIsSelectTable(isSelectTable);
  }, [columnHeaders, rows, onExpandTable, onSelect, onSelectTable]);

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

  console.log('RENDER >>>>>>>>>>>>>>>>>>>>>>>', updatedRows);

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
