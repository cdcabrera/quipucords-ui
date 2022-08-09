import React from 'react';
import { SortByDirection } from '@patternfly/react-table';

// Th sort={{ sortBy: { index, direction }, onSort: (_event, index, direction) => {}, columnIndex }}

// tooltips
// Th info={{ tooltip: string, className, tooltipProps: { isContentLeftAligned: boolean } }}

// popovers
// Th info={{ popover: Node, ariaLabel: string, popoverProps: { headerContent: Node, footerContent: Node } }}

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

/**
 * when you do a cell tab/expand you wrap a table body around everything
 * <tbody isExpanded={boolean}>
 *   <tr>
 *     <td dataLabel width compoundExpand={{ isExpanded: boolean, onToggle:  }}
 *   <tr isExpanded={boolean only}>
 *     <td colSpan>
 *       <ExpandableRowContent>
 */

/**
 * when you do a whole row expand it's just two back to back tr tags, with colspan on the td in the "expanded row" because pf is full of jackasses
 * <table isExpandable={boolean only}
 * <tbody isExpanded={boolean only}
 * <tr>
 *   <td expand={{
 *     rowIndex,
 *     isExpanded,
 *     onToggle
 *   }}
 * <tr isExpanded={boolean only}>
 *   <td colSpan>
 *     <ExpandableRowContent>
 */

/**
 * when you do a select table you have to include a select prop... you do all the work
 * <Thead>
 *         <Tr>
 *           <Th
 *             select={{
 *               onSelect: (_event, isSelecting) => selectAllRepos(isSelecting),
 *               isSelected: areAllReposSelected
 *             }}
 *           />
 *           <Th>{columnNames.name}</Th>
 *           <Th>{columnNames.branches}</Th>
 *           <Th>{columnNames.prs}</Th>
 *           <Th>{columnNames.workspaces}</Th>
 *           <Th>{columnNames.lastCommit}</Th>
 *         </Tr>
 *       </Thead>
 *       <Tbody>
 *         <Tr key={repo.name}>
 *             <Td
 *               select={{
                    rowIndex, - this is rando needed to help with "isSelected"
 *                 onSelect: (_event, isSelecting) => onSelectRepo(repo, rowIndex, isSelecting),
 *                 isSelected: isRepoSelected(repo),
 *                 disable: !isRepoSelectable(repo)
 *               }}
 *             />
 *             <Td dataLabel={columnNames.name}>{repo.name}</Td>
 *             <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
 *             <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
 *             <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
 *             <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
 *           </Tr>
 */

const tableRows = (rows = []) => {
  const updatedRows = [];
  let isCollapsibleTable = false;
  let isCollapsibleCell = false;
  let isSelectTable = false;

  rows.forEach(({ cells, isDisabled = false, isExpanded, isSelected = false, onSelect, onExpand, expandedContent }) => {
    const rowObj = {
      cells: [],
      select: undefined,
      expand: undefined
    };
    updatedRows.push(rowObj);

    const rowIndex = updatedRows.length - 1;

    if (typeof onSelect === 'function') {
      isSelectTable = true;
      rowObj.select = {
        rowIndex,
        // onSelect: (_event, selected, _index) => onSelect({ rowIndex, isSelected: selected, cells }),
        onSelect: (_event, selected) => onSelect({ rowIndex, isSelected: selected, cells }),
        isSelected,
        disable: isDisabled
      };
    }

    cells.forEach(cell => {
      if (cell?.content !== undefined) {
        // const updatedCellProps = {};

        if (cell?.expandedContent) {
          isCollapsibleCell = true;
          // updatedCellProps.compoundExpand = {
          //  isExpanded: cell?.isExpanded,
          //  onToggle:
          // };
        }

        rowObj.cells.push({ ...cell });
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

    if (!isCollapsibleCell && expandedContent) {
      isCollapsibleTable = true;
      rowObj.expand = {
        rowIndex,
        isExpanded: isExpanded || false,
        onToggle: (_event, _index, expanded) => onExpand({ rowIndex, isExpanded: expanded }),
        // };
        // rowObj.expandData = {
        expandedContent,
        colSpan: cells.length
      };
    }
  });

  return {
    rows: updatedRows,
    isCollapsibleCell,
    isCollapsibleTable,
    isSelectTable
  };
  /*
  const updatedRows = [];
  let isCollapsibleTable = false;
  let isSelectTable = false;

  rows.forEach(({ cells, isExpanded, isSelected, onSelected, onExpanded, expandedContent }) => {
    const rowObj = {
      cells: []
    };
    updatedRows.push(rowObj);

    if (typeof onSelected === 'function') {
      isSelectTable = true;
      rowObj.isSelected = isSelected || false;
      rowObj.onSelected = onSelected;
    }

    if (expandedContent) {
      isCollapsibleTable = true;
      rowObj.isExpanded = isExpanded || false;

      updatedRows.push({
        parent: updatedRows.length - 1,
        cells: [{ content: expandedContent, colSpan: cells.length }],
        onExpanded
      });
    }

    cells.forEach(cell => {
      if (cell?.content !== undefined) {
        const { content, ...misc } = cell;
        rowObj.cells.push({ content, ...misc });
      } else {
        rowObj.cells.push({
          content: (React.isValidElement(cell) && cell) || (typeof cell === 'object' && `${cell}`) || cell
        });
      }
    });
  });

  return {
    rows: updatedRows,
    isCollapsibleTable,
    isSelectTable
  };
  */
};

const tableData = ({ columnHeaders = [], rows = [] } = {}) => {
  // const updatedHeaderCells = [];
  // const updatedRows = [];
  // let isSortableTable = false;
  const updatedTableRows = tableRows(rows);

  return {
    // headerCells: updatedHeaderCells,
    ...tableHeader(columnHeaders, updatedTableRows.isCollapsibleTable, updatedTableRows.isSelectTable),
    ...updatedTableRows
    // rows: updatedRows,
    // isCollapsibleTable,
    // isSelectTable,
    // isSortableTable
  };
};

export { tableData as default, tableData, tableHeader, tableRows };
