import { ActionIcon, Checkbox, Menu, ScrollArea, Table, rem } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import classNames from 'classnames';
import { useState } from 'react';
import classes from './TableWithSelection.module.css';

interface Column {
  key: string;
  label: string;
}

interface MenuItem {
  label: string;
  onClick: (item: any) => void;
}

interface TableWithSelectionProps {
  rows: any[];
  columns: Column[];
  menuItems: MenuItem[];
  updateItem: (item: any) => void;
}

function TableWithSelection({ rows, columns, menuItems, updateItem }: TableWithSelectionProps) {
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
      <Table.Tr key={index} className={classNames({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox checked={selection.includes(index.toString())} onChange={() => toggleRow(index.toString())} />
        </Table.Td>
        {columns.map((column) => (
          <Table.Td key={column.key}>{item[column.key]}</Table.Td>
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
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
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