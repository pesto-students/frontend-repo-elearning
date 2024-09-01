import { ActionIcon, Checkbox, Menu, ScrollArea, Table, rem } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import classNames from 'classnames';
import { useState } from 'react';
import classes from './TableWithSelection.module.css';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface MenuItem {
  label: string;
  onClick: (item: any) => void;
}

interface TableWithSelectionProps<T> {
  rows: T[];
  columns: Column<T>[];
  menuItems: MenuItem[];
  updateItem: (item: T) => void;
  autoWidth?: boolean;
  rowClick?: (item: T) => void;
}

function TableWithSelection<T extends { [key: string]: any }>({
  rows,
  columns,
  menuItems,
  updateItem,
  autoWidth,
  rowClick
}: TableWithSelectionProps<T>) {
  const [selection, setSelection] = useState<string[]>([]);

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) => (current.length === rows.length ? [] : rows.map((_, index) => index.toString())));

  const tableRows = rows.map((item, index) => {
    const selected = selection.includes(index.toString());
    return (
      <Table.Tr
        key={index}
        className={classNames({ [classes.rowSelected]: selected })}
        onClick={() => rowClick && rowClick(item)}
        style={{ cursor: rowClick ? 'pointer' : 'default' }}
      >
        <Table.Td>
          <Checkbox checked={selection.includes(index.toString())} onChange={() => toggleRow(index.toString())} />
        </Table.Td>
        {columns.map((column, columnIndex) => (
          <Table.Td key={column.key + "-" + columnIndex} width={autoWidth ? 'auto' : '100%'}>
            {column.render ? column.render(item) : item[column.key]}
          </Table.Td>
        ))}
        <Table.Td>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {menuItems.map((menuItem, index) => (
                <Menu.Item key={index} onClick={() => menuItem.onClick(item)}>
                  {menuItem.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr >
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm" striped highlightOnHover withTableBorder withRowBorders={false}>
        <Table.Thead>
          <Table.Tr >
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === rows.length}
                indeterminate={selection.length > 0 && selection.length !== rows.length}
              />
            </Table.Th>
            {columns.map((column) => (
              <Table.Th key={column.key}>{column.label}</Table.Th>
            ))}
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{tableRows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export default TableWithSelection;