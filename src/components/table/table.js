import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useShallowCompareEffect } from 'react-use';
// import _cloneDeep from 'lodash/cloneDeep';
import { Grid, GridItem } from '@patternfly/react-core';
// import { TableComposable, TableVariant, Thead, Tbody, Tr, Th, Td, ExpandableRowContent } from '@patternfly/react-table';
import {
  SortByDirection,
  TableComposable,
  TableVariant,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  ExpandableRowContent
} from '@patternfly/react-table';
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
  const [updatedIsExpandableCell, setUpdatedIsExpandableCell] = useState(false);
  // const [updatedIsSortTable, setUpdatedIsSortTable] = useState(false);
  // const [updatedIsCollapsibleTable, setUpdatedIsCollapsibleTable] = useState(false);
  const [updatedIsSelectTable, setUpdatedIsSelectTable] = useState(false);

  // const [selectedRows, setSelectedRows] = useState({});
  // const [expandedRows, setExpandedRows] = useState([]);
  // const [expandedCells, setExpandedCells] = useState([]);
  // let isSelectTable = false;
  // let isExpandableCell = false;

  const onExpandTable = ({ rowIndex, isSelected, cells }) => {
    console.log('expanded', rowIndex, isSelected, cells);
    onExpand();
  };

  const onSelectTable = ({ rowIndex, isSelected, cells }) => {
    setUpdatedRows(value => {
      const updatedValue = [...value];
      updatedValue[rowIndex].select.isSelected = isSelected;
      return updatedValue;
    });

    if (typeof onSelect === 'function') {
      onSelect({ rowIndex, isSelected, cells });
    }
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

    // isSelectTable = parsedIsSelectTable; // eslint-disable-line
    // isExpandableCell = parsedIsExpandableCell; // eslint-disable-line
    setUpdatedIsSelectTable(parsedIsSelectTable);
    setUpdatedIsExpandableCell(parsedIsExpandableCell);
    setUpdatedRows(parsedRows);
    // setUpdatedIsSelectTable(isSelectTable);
  }, [columnHeaders, onExpand, onExpandTable, onSelect, onSelectTable, rows]);

  // {isExpandTable && <Td key="expand-th-cell" />}
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

  const renderRows = () => {
    const BodyWrapper = (updatedIsExpandableCell && React.Fragment) || Tbody;

    return (
      <BodyWrapper>
        {updatedRows.map(({ cells, select }) => {
          // const isCellExpanded = cells.compoundExpand.isExpanded;
          const expandedCell = cells.find(cell => cell?.compoundExpand?.isExpanded === true);
          const CellWrapper = (updatedIsExpandableCell && Tbody) || React.Fragment;
          const cellWrapperProps =
            (updatedIsExpandableCell && { isExpanded: expandedCell?.isExpanded === true }) || undefined;

          return (
            <CellWrapper key={`parent-row-${window.btoa(JSON.stringify(cells))}`} {...cellWrapperProps}>
              <Tr key={`row-${window.btoa(JSON.stringify(cells))}`}>
                {select && <Td key={`row-${window.btoa(JSON.stringify(cells))}`} select={select} />}
                {cells.map(({ content, compoundExpand, isTHeader }) => {
                  const WrapperCell = (isTHeader && Th) || Td;
                  const wrapperCellProps = {};

                  if (compoundExpand) {
                    wrapperCellProps.compoundExpand = compoundExpand;
                  }

                  console.log('>>>>>>>>> CELL', compoundExpand);

                  return (
                    <WrapperCell key={window.btoa(content)} {...wrapperCellProps}>
                      {content}
                    </WrapperCell>
                  );
                })}
              </Tr>
              {updatedIsExpandableCell && expandedCell && (
                <Tr isExpanded>
                  <Td>
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
